const OwnerProfile = require('../Models/ownerProfile');
const User = require('../Models/user');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// @desc    Get owner profile
// @route   GET /api/owner/profile
// @access  Private (Owner)
exports.getOwnerProfile = asyncHandler(async (req, res, next) => {
  try {
    // Find profile using the user id with full population
    const profile = await OwnerProfile.findOne({ user: req.user.id })
      .populate('user', 'name email userType')
      .lean();

    if (!profile) {
      return res.status(200).json({
        success: true,
        profile: null,
        message: 'Profile not created yet'
      });
    }

    // Ensure all sections exist in the response even if they're empty
    const completeProfile = {
      ...profile,
      personalInfo: profile.personalInfo || {},
      businessInfo: profile.businessInfo || {},
      paymentSettings: profile.paymentSettings || {},
      preferences: profile.preferences || {
        bookingPreferences: {},
        notificationSettings: {}
      },
      documents: profile.documents || []
    };

    res.status(200).json({
      success: true,
      profile: completeProfile
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Create owner profile
// @route   POST /api/owner/profile
// @access  Private (Owner)
exports.createOwnerProfile = asyncHandler(async (req, res, next) => {
  // Check if user is an owner
  if (!req.user.userType.includes('Owner')) {
    return next(new ErrorResponse('Only service owners can create an owner profile', 403));
  }

  // Check if profile already exists
  const existingProfile = await OwnerProfile.findOne({ user: req.user.id });
  
  if (existingProfile) {
    return next(new ErrorResponse('Profile already exists, use PUT to update', 400));
  }

  // Create profile
  const profileData = {
    ...req.body,
    user: req.user.id,
    isProfileComplete: true
  };

  const profile = await OwnerProfile.create(profileData);

  res.status(201).json({
    success: true,
    profile
  });
});

// @desc    Update owner profile
// @route   PUT /api/owner/profile
// @access  Private (Owner)
exports.updateOwnerProfile = asyncHandler(async (req, res, next) => {
  // Find profile
  let profile = await OwnerProfile.findOne({ user: req.user.id });

  if (!profile) {
    return next(new ErrorResponse('Profile not found, create one first', 404));
  }

  // Update profile
  profile = await OwnerProfile.findOneAndUpdate(
    { user: req.user.id },
    { ...req.body, updatedAt: Date.now() },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    profile
  });
});

// @desc    Get user details (account + profile)
// @route   GET /api/owner/details
// @access  Private (Owner)
exports.getUserDetails = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const profile = await OwnerProfile.findOne({ user: req.user.id }).lean();

    // Ensure all sections exist in the response even if they're empty
    const completeProfile = profile ? {
      ...profile,
      personalInfo: profile.personalInfo || {},
      businessInfo: profile.businessInfo || {},
      paymentSettings: profile.paymentSettings || {},
      preferences: profile.preferences || {
        bookingPreferences: {},
        notificationSettings: {}
      },
      documents: profile.documents || []
    } : null;

    res.status(200).json({
      success: true,
      data: {
        user,
        profile: completeProfile
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get profile completion steps
// @route   GET /api/owner/profile/completion-steps
// @access  Private (Owner)
exports.getProfileCompletionSteps = asyncHandler(async (req, res, next) => {
  try {
    // Find profile
    const profile = await OwnerProfile.findOne({ user: req.user.id }).lean();
    
    if (!profile) {
      return res.status(200).json({
        success: true,
        completionSteps: {
          personal: false,
          business: false,
          payment: false,
          preferences: false,
          documents: false
        },
        completionPercentage: 0
      });
    }

    // Calculate completion steps
    const completionSteps = {
      personal: Boolean(
        profile.personalInfo && 
        profile.personalInfo.fullName && 
        profile.personalInfo.phoneNumber
      ),
      business: Boolean(
        profile.businessInfo && 
        profile.businessInfo.businessName && 
        profile.businessInfo.businessType &&
        profile.businessInfo.businessAddress
      ),
      payment: Boolean(
        profile.paymentSettings && 
        profile.paymentSettings.accountHolderName &&
        profile.paymentSettings.accountNumber &&
        profile.paymentSettings.ifscCode &&
        profile.paymentSettings.bankName
      ),
      preferences: Boolean(
        profile.preferences && 
        (profile.preferences.bookingPreferences || 
         profile.preferences.notificationSettings)
      ),
      documents: Boolean(
        profile.documents && 
        profile.documents.length > 0
      )
    };

    // Calculate completion percentage
    const completedSteps = Object.values(completionSteps).filter(Boolean).length;
    const totalSteps = Object.keys(completionSteps).length;
    const completionPercentage = Math.round((completedSteps / totalSteps) * 100);

    // Update profile completion status in database
    await OwnerProfile.findOneAndUpdate(
      { user: req.user.id },
      { 
        isProfileComplete: completionPercentage === 100,
        updatedAt: Date.now() 
      }
    );

    res.status(200).json({
      success: true,
      completionSteps,
      completionPercentage
    });
  } catch (error) {
    next(error);
  }
});

// Helper function to check and update profile completion status
const updateProfileCompletion = async (userId) => {
  try {
    const profile = await OwnerProfile.findOne({ user: userId }).lean();
    
    if (!profile) return;

    // Check if all required sections are complete
    const isPersonalComplete = Boolean(
      profile.personalInfo && 
      profile.personalInfo.fullName && 
      profile.personalInfo.phoneNumber
    );

    const isBusinessComplete = Boolean(
      profile.businessInfo && 
      profile.businessInfo.businessName && 
      profile.businessInfo.businessType && 
      profile.businessInfo.businessAddress
    );

    const isPaymentComplete = Boolean(
      profile.paymentSettings && 
      profile.paymentSettings.accountHolderName && 
      profile.paymentSettings.accountNumber && 
      profile.paymentSettings.ifscCode && 
      profile.paymentSettings.bankName
    );

    const isPreferencesComplete = Boolean(
      profile.preferences && 
      (profile.preferences.bookingPreferences || 
       profile.preferences.notificationSettings)
    );

    const isDocumentsComplete = Boolean(
      profile.documents && 
      profile.documents.length > 0
    );

    // Calculate completion percentage
    const completionSteps = {
      personal: isPersonalComplete,
      business: isBusinessComplete,
      payment: isPaymentComplete,
      preferences: isPreferencesComplete,
      documents: isDocumentsComplete
    };
    
    const completedSteps = Object.values(completionSteps).filter(Boolean).length;
    const totalSteps = Object.keys(completionSteps).length;
    const completionPercentage = Math.round((completedSteps / totalSteps) * 100);

    // Consider profile complete if essential sections are filled
    const isProfileComplete = completionPercentage === 100;

    // Update profile completion status
    await OwnerProfile.findOneAndUpdate(
      { user: userId },
      { 
        isProfileComplete,
        completionPercentage,
        updatedAt: Date.now() 
      }
    );

    return {
      isProfileComplete,
      completionPercentage,
      completionSteps
    };
  } catch (error) {
    console.error('Error updating profile completion status:', error);
    return {
      isProfileComplete: false,
      completionPercentage: 0,
      completionSteps: {
        personal: false,
        business: false,
        payment: false,
        preferences: false,
        documents: false
      }
    };
  }
};

// @desc    Update personal information
// @route   PUT /api/owner/profile/personal
// @access  Private (Owner)
exports.updatePersonalInfo = asyncHandler(async (req, res, next) => {
  try {
    // Find profile
    let profile = await OwnerProfile.findOne({ user: req.user.id });

    if (!profile) {
      // Create new profile if it doesn't exist
      profile = new OwnerProfile({
        user: req.user.id,
        personalInfo: req.body,
        isProfileComplete: false
      });
      
      // Save with validation disabled for other fields
      await profile.save({ validateModifiedOnly: true });
    } else {
      // Update only the personal info section without triggering validation on other fields
      profile.personalInfo = req.body;
      profile.updatedAt = Date.now();
      
      // Save with validation only for modified fields
      await profile.save({ validateModifiedOnly: true });
    }

    // Update profile completion status
    const completionStatus = await updateProfileCompletion(req.user.id);

    // Get the updated profile
    profile = await OwnerProfile.findOne({ user: req.user.id }).lean();

    // Ensure all sections exist in the response even if they're empty
    const completeProfile = {
      ...profile,
      personalInfo: profile.personalInfo || {},
      businessInfo: profile.businessInfo || {},
      paymentSettings: profile.paymentSettings || {},
      preferences: profile.preferences || {
        bookingPreferences: {},
        notificationSettings: {}
      },
      documents: profile.documents || []
    };

    res.status(200).json({
      success: true,
      profile: completeProfile,
      completionStatus
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update business information
// @route   PUT /api/owner/profile/business
// @access  Private (Owner)
exports.updateBusinessInfo = asyncHandler(async (req, res, next) => {
  try {
    // Find profile
    let profile = await OwnerProfile.findOne({ user: req.user.id });

    if (!profile) {
      // Create new profile if it doesn't exist
      profile = new OwnerProfile({
        user: req.user.id,
        businessInfo: req.body,
        isProfileComplete: false
      });
      
      // Save with validation disabled for other fields
      await profile.save({ validateModifiedOnly: true });
    } else {
      // Update only the business info section without triggering validation on other fields
      profile.businessInfo = req.body;
      profile.updatedAt = Date.now();
      
      // Save with validation only for modified fields
      await profile.save({ validateModifiedOnly: true });
    }

    // Update profile completion status
    const completionStatus = await updateProfileCompletion(req.user.id);

    // Get the updated profile
    profile = await OwnerProfile.findOne({ user: req.user.id }).lean();

    // Ensure all sections exist in the response even if they're empty
    const completeProfile = {
      ...profile,
      personalInfo: profile.personalInfo || {},
      businessInfo: profile.businessInfo || {},
      paymentSettings: profile.paymentSettings || {},
      preferences: profile.preferences || {
        bookingPreferences: {},
        notificationSettings: {}
      },
      documents: profile.documents || []
    };

    res.status(200).json({
      success: true,
      profile: completeProfile,
      completionStatus
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update payment settings
// @route   PUT /api/owner/profile/payment
// @access  Private (Owner)
exports.updatePaymentSettings = asyncHandler(async (req, res, next) => {
  try {
    // Find profile
    let profile = await OwnerProfile.findOne({ user: req.user.id });

    if (!profile) {
      // Create new profile if it doesn't exist
      profile = new OwnerProfile({
        user: req.user.id,
        paymentSettings: req.body,
        isProfileComplete: false
      });
      
      // Save with validation disabled for other fields
      await profile.save({ validateModifiedOnly: true });
    } else {
      // Update only the payment settings section without triggering validation on other fields
      profile.paymentSettings = req.body;
      profile.updatedAt = Date.now();
      
      // Save with validation only for modified fields
      await profile.save({ validateModifiedOnly: true });
    }

    // Update profile completion status
    const completionStatus = await updateProfileCompletion(req.user.id);

    // Get the updated profile
    profile = await OwnerProfile.findOne({ user: req.user.id }).lean();

    // Ensure all sections exist in the response even if they're empty
    const completeProfile = {
      ...profile,
      personalInfo: profile.personalInfo || {},
      businessInfo: profile.businessInfo || {},
      paymentSettings: profile.paymentSettings || {},
      preferences: profile.preferences || {
        bookingPreferences: {},
        notificationSettings: {}
      },
      documents: profile.documents || []
    };

    res.status(200).json({
      success: true,
      profile: completeProfile,
      completionStatus
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update preferences
// @route   PUT /api/owner/profile/preferences
// @access  Private (Owner)
exports.updatePreferences = asyncHandler(async (req, res, next) => {
  try {
    // Find profile
    let profile = await OwnerProfile.findOne({ user: req.user.id });

    if (!profile) {
      // Create new profile if it doesn't exist
      profile = new OwnerProfile({
        user: req.user.id,
        preferences: req.body,
        isProfileComplete: false
      });
      
      // Save with validation disabled for other fields
      await profile.save({ validateModifiedOnly: true });
    } else {
      // Update only the preferences section without triggering validation on other fields
      profile.preferences = req.body;
      profile.updatedAt = Date.now();
      
      // Save with validation only for modified fields
      await profile.save({ validateModifiedOnly: true });
    }

    // Update profile completion status
    const completionStatus = await updateProfileCompletion(req.user.id);

    // Get the updated profile
    profile = await OwnerProfile.findOne({ user: req.user.id }).lean();

    // Ensure all sections exist in the response even if they're empty
    const completeProfile = {
      ...profile,
      personalInfo: profile.personalInfo || {},
      businessInfo: profile.businessInfo || {},
      paymentSettings: profile.paymentSettings || {},
      preferences: profile.preferences || {
        bookingPreferences: {},
        notificationSettings: {}
      },
      documents: profile.documents || []
    };

    res.status(200).json({
      success: true,
      profile: completeProfile,
      completionStatus
    });
  } catch (error) {
    next(error);
  }
});

// Configure multer for document uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadsDir = path.join(__dirname, '../uploads');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: function(req, file, cb) {
    // Create a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'document-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images and PDFs only
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format. Please upload an image or PDF.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
}).single('document');

// @desc    Upload document
// @route   POST /api/owner/profile/documents
// @access  Private (Owner)
exports.uploadDocument = asyncHandler(async (req, res, next) => {
  try {
    // Process file upload using the already configured multer instance
    upload(req, res, async function(err) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please upload a file'
        });
      }

      try {
        // Upload to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'owner_documents',
          resource_type: 'auto'
        });

        // Remove file from server
        fs.unlinkSync(req.file.path);

        // Get document details from request
        const { documentType, documentName } = req.body;

        // Find profile
        let profile = await OwnerProfile.findOne({ user: req.user.id });

        if (!profile) {
          // Create new profile if it doesn't exist
          profile = new OwnerProfile({
            user: req.user.id,
            documents: [{
              documentType,
              documentName,
              documentUrl: result.secure_url,
              public_id: result.public_id,
              uploadDate: Date.now()
            }],
            isProfileComplete: false
          });
          
          await profile.save();
        } else {
          // Add document to existing profile
          profile.documents = profile.documents || [];
          profile.documents.push({
            documentType,
            documentName,
            documentUrl: result.secure_url,
            public_id: result.public_id,
            uploadDate: Date.now()
          });
          
          profile.updatedAt = Date.now();
          await profile.save();
        }

        // Update profile completion status
        const completionStatus = await updateProfileCompletion(req.user.id);

        // Get the updated profile
        profile = await OwnerProfile.findOne({ user: req.user.id }).lean();

        // Ensure all sections exist in the response even if they're empty
        const completeProfile = {
          ...profile,
          personalInfo: profile.personalInfo || {},
          businessInfo: profile.businessInfo || {},
          paymentSettings: profile.paymentSettings || {},
          preferences: profile.preferences || {
            bookingPreferences: {},
            notificationSettings: {}
          },
          documents: profile.documents || []
        };

        res.status(200).json({
          success: true,
          document: {
            documentType,
            documentName,
            documentUrl: result.secure_url,
            public_id: result.public_id,
            uploadDate: Date.now()
          },
          profile: completeProfile,
          completionStatus
        });
      } catch (error) {
        // If there's an error, remove the uploaded file
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        
        console.error('Error uploading document:', error);
        return res.status(500).json({
          success: false,
          message: 'Error uploading document'
        });
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete document
// @route   DELETE /api/owner/profile/documents/:id
// @access  Private (Owner)
exports.deleteDocument = asyncHandler(async (req, res, next) => {
  try {
    // Find profile
    let profile = await OwnerProfile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    // Find document by ID
    const document = profile.documents.id(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    // Delete from Cloudinary if public_id exists
    if (document.public_id) {
      await cloudinary.uploader.destroy(document.public_id);
    }

    // Remove document from profile
    profile.documents.pull(req.params.id);
    profile.updatedAt = Date.now();
    await profile.save();

    // Update profile completion status
    const completionStatus = await updateProfileCompletion(req.user.id);

    // Get the updated profile
    profile = await OwnerProfile.findOne({ user: req.user.id }).lean();

    // Ensure all sections exist in the response even if they're empty
    const completeProfile = {
      ...profile,
      personalInfo: profile.personalInfo || {},
      businessInfo: profile.businessInfo || {},
      paymentSettings: profile.paymentSettings || {},
      preferences: profile.preferences || {
        bookingPreferences: {},
        notificationSettings: {}
      },
      documents: profile.documents || []
    };

    res.status(200).json({
      success: true,
      profile: completeProfile,
      completionStatus
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Upload profile picture
// @route   PUT /api/owner/profile/picture
// @access  Private (Owner)
exports.uploadProfilePicture = asyncHandler(async (req, res, next) => {
  try {
    // Configure multer for profile picture upload
    const profilePictureUpload = multer({
      storage: multer.diskStorage({
        destination: function(req, file, cb) {
          const uploadsDir = path.join(__dirname, '../uploads');
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
          }
          cb(null, uploadsDir);
        },
        filename: function(req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = path.extname(file.originalname);
          cb(null, 'profile-' + uniqueSuffix + ext);
        }
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
      fileFilter: (req, file, cb) => {
        // Accept images only
        if (file.mimetype.startsWith('image/')) {
          cb(null, true);
        } else {
          cb(new Error('Please upload an image file'), false);
        }
      }
    }).single('profileImage');

    profilePictureUpload(req, res, async function(err) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      // If no file was uploaded
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please upload an image'
        });
      }

      try {
        // Find profile
        let profile = await OwnerProfile.findOne({ user: req.user.id });

        // If profile exists and has a profile image, delete the old one from Cloudinary
        if (profile && profile.personalInfo.profileImage && profile.personalInfo.profileImage.public_id) {
          await cloudinary.uploader.destroy(profile.personalInfo.profileImage.public_id);
        }

        // Upload new image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'owner_profiles',
          width: 500,
          height: 500,
          crop: 'fill',
          gravity: 'face'
        });

        // Remove file from local storage
        fs.unlinkSync(req.file.path);

        // Update or create profile with new image
        if (!profile) {
          profile = await OwnerProfile.create({
            user: req.user.id,
            personalInfo: {
              profileImage: {
                public_id: result.public_id,
                url: result.secure_url
              }
            },
            isProfileComplete: false
          });
        } else {
          profile = await OwnerProfile.findOneAndUpdate(
            { user: req.user.id },
            { 
              'personalInfo.profileImage': {
                public_id: result.public_id,
                url: result.secure_url
              },
              updatedAt: Date.now()
            },
            { new: true }
          );
        }

        res.status(200).json({
          success: true,
          profileImage: result.secure_url
        });
      } catch (error) {
        // Remove file from local storage if Cloudinary upload fails
        if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        throw error;
      }
    });
  } catch (error) {
    next(error);
  }
});
