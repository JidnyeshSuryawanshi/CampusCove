// const OwnerProfile = require('../Models/ownerProfile');
const OwnerProfile = require('../Models/ownerProfile');
const User = require('../Models/user');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');
const fs = require('fs');
const path = require('path');

// @desc    Get owner profile
// @route   GET /api/owner/profile
// @access  Private (owner only)
exports.getOwnerProfile = async (req, res) => {
  try {
    let profile = await OwnerProfile.findOne({ user: req.user.id });
    // @desc    Update business info
    // @route   PUT /api/owner/profile/business
    // @access  Private (owner only)
    exports.updateBusinessInfo = async (req, res) => {
      try {
        console.log('Received business info update request:', JSON.stringify(req.body, null, 2));
        
        // Extract data from request body
        const { businessInfo, contactInfo } = req.body;
        
        // Check if we're receiving nested structure or flat structure
        const businessName = businessInfo?.businessName || req.body.businessName;
        const businessType = businessInfo?.businessType || req.body.businessType;
        const registrationNumber = businessInfo?.registrationNumber || req.body.registrationNumber;
        const gstNumber = businessInfo?.gstNumber || req.body.gstNumber;
        const yearEstablished = businessInfo?.yearEstablished || req.body.yearEstablished;
        const description = businessInfo?.description || req.body.description;
        
        // Extract contact info
        const businessContactInfo = contactInfo || req.body.contactInfo;
        
        // Validate required fields
        if (!businessName || !businessType) {
          return res.status(400).json({
            success: false,
            error: 'Please provide business name and type'
          });
        }
        
        if (!businessContactInfo || !businessContactInfo.businessAddress || !businessContactInfo.businessAddress.city || 
            !businessContactInfo.businessAddress.state || !businessContactInfo.businessAddress.pincode) {
          return res.status(400).json({
            success: false,
            error: 'Please provide complete business address'
          });
        }
        
        // Validate pincode
        const pincodeRegex = /^\d{6}$/;
        if (!pincodeRegex.test(businessContactInfo.businessAddress.pincode)) {
          return res.status(400).json({
            success: false,
            error: 'Please provide a valid 6-digit pincode'
          });
        }
        
        // Find profile
        let profile = await OwnerProfile.findOne({ user: req.user.id });
        
        if (!profile) {
          return res.status(404).json({
            success: false,
            error: 'Profile not found'
          });
        }
        
        // Create update object
        const updateObj = {
          $set: {
            'businessInfo.businessName': businessName,
            'businessInfo.businessType': businessType,
            'businessInfo.registrationNumber': registrationNumber,
            'businessInfo.gstNumber': gstNumber,
            'businessInfo.yearEstablished': yearEstablished,
            'businessInfo.description': description,
            'businessInfo.contactInfo.businessAddress.street': businessContactInfo.businessAddress.street,
            'businessInfo.contactInfo.businessAddress.city': businessContactInfo.businessAddress.city,
            'businessInfo.contactInfo.businessAddress.state': businessContactInfo.businessAddress.state,
            'businessInfo.contactInfo.businessAddress.pincode': businessContactInfo.businessAddress.pincode,
            'businessInfo.contactInfo.businessAddress.country': businessContactInfo.businessAddress.country || 'India'
          }
        };
        
        // Add optional contact fields if provided
        if (businessContactInfo.businessEmail) {
          updateObj.$set['businessInfo.contactInfo.businessEmail'] = businessContactInfo.businessEmail;
        }
        
        if (businessContactInfo.businessPhone) {
          updateObj.$set['businessInfo.contactInfo.businessPhone'] = businessContactInfo.businessPhone;
        }
        
        if (businessContactInfo.website) {
          updateObj.$set['businessInfo.contactInfo.website'] = businessContactInfo.website;
        }
        
        if (businessContactInfo.socialMedia) {
          if (businessContactInfo.socialMedia.facebook) {
            updateObj.$set['businessInfo.contactInfo.socialMedia.facebook'] = businessContactInfo.socialMedia.facebook;
          }
          if (businessContactInfo.socialMedia.instagram) {
            updateObj.$set['businessInfo.contactInfo.socialMedia.instagram'] = businessContactInfo.socialMedia.instagram;
          }
          if (businessContactInfo.socialMedia.twitter) {
            updateObj.$set['businessInfo.contactInfo.socialMedia.twitter'] = businessContactInfo.socialMedia.twitter;
          }
          if (businessContactInfo.socialMedia.linkedin) {
            updateObj.$set['businessInfo.contactInfo.socialMedia.linkedin'] = businessContactInfo.socialMedia.linkedin;
          }
        }
        
        console.log('Updating owner profile with:', JSON.stringify(updateObj, null, 2));
        
        // Update business info
        profile = await OwnerProfile.findOneAndUpdate(
          { user: req.user.id },
          updateObj,
          { new: true, runValidators: true }
        );
        
        res.status(200).json({
          success: true,
          data: {
            businessInfo: profile.businessInfo
          }
        });
        
      } catch (error) {
        console.error('Error updating business info:', error);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
          const messages = Object.values(error.errors).map(err => err.message);
          return res.status(400).json({
            success: false,
            error: messages[0]
          });
        }
        
        res.status(500).json({
          success: false,
          error: 'Server error. Could not update business info.'
        });
      }
    }
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: profile
    });
    
  } catch (error) {
    console.error('Error fetching owner profile:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Could not fetch profile.'
    });
  }
};

// @desc    Create owner profile
// @route   POST /api/owner/profile
// @access  Private (owner only)
exports.createOwnerProfile = async (req, res) => {
  try {
    // Check if profile already exists
    let profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (profile) {
      return res.status(400).json({
        success: false,
        error: 'Profile already exists'
      });
    }
    
    // Get user details to pre-fill some fields
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Create a minimal profile with default values
    const defaultProfile = {
      user: req.user.id,
      personalInfo: {
        fullName: user.username || 'Owner',
        phoneNumber: '0000000000' // Default placeholder
      },
      businessInfo: {
        businessName: 'My Business',
        businessType: req.user.userType === 'hostelOwner' ? 'hostel' : 
                     req.user.userType === 'messOwner' ? 'mess' : 
                     req.user.userType === 'gymOwner' ? 'gym' : 'multiple',
        contactInfo: {
          businessAddress: {
            city: 'Your City',
            state: 'Your State',
            pincode: '000000'
          }
        }
      }
    };
    
    // Create profile with default values
    profile = await OwnerProfile.create(defaultProfile);
    
    res.status(201).json({
      success: true,
      data: profile
    });
    
  } catch (error) {
    console.error('Error creating owner profile:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error. Could not create profile.'
    });
  }
};

// @desc    Update owner profile
// @route   PUT /api/owner/profile
// @access  Private (owner only)
exports.updateOwnerProfile = async (req, res) => {
  try {
    let profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    // Update profile
    profile = await OwnerProfile.findOneAndUpdate(
      { user: req.user.id },
      { 
        ...req.body,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: profile
    });
    
  } catch (error) {
    console.error('Error updating owner profile:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages[0]
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error. Could not update profile.'
    });
  }
};

// @desc    Get profile completion status
// @route   GET /api/owner/profile/status
// @access  Private (owner only)
exports.getProfileStatus = async (req, res) => {
  try {
    const profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(200).json({
        success: true,
        data: {
          exists: false,
          isComplete: false
        }
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        exists: true,
        isComplete: profile.isProfileComplete
      }
    });
    
  } catch (error) {
    console.error('Error fetching profile status:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Could not fetch profile status.'
    });
  }
};

// @desc    Get profile completion steps
// @route   GET /api/owner/profile/completion-steps
// @access  Private (owner only)
exports.getProfileCompletionSteps = async (req, res) => {
  try {
    const profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(200).json({
        success: true,
        data: {
          personal: false,
          business: false,
          payment: false,
          property: false,
          documents: false
        }
      });
    }
    
    // Check completion of each section
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
        profile.businessInfo.contactInfo &&
        profile.businessInfo.contactInfo.businessAddress &&
        profile.businessInfo.contactInfo.businessAddress.city &&
        profile.businessInfo.contactInfo.businessAddress.state &&
        profile.businessInfo.contactInfo.businessAddress.pincode
      ),
      payment: Boolean(
        profile.paymentInfo &&
        ((profile.paymentInfo.preferredPaymentMethod === 'bank' &&
          profile.paymentInfo.bankDetails &&
          profile.paymentInfo.bankDetails.accountHolderName &&
          profile.paymentInfo.bankDetails.accountNumber &&
          profile.paymentInfo.bankDetails.ifscCode) ||
         (profile.paymentInfo.preferredPaymentMethod === 'upi' &&
          profile.paymentInfo.upiId))
      ),
      property: Boolean(
        profile.propertyDetails &&
        profile.propertyDetails.propertyTypes &&
        profile.propertyDetails.propertyTypes.length > 0
      ),
      documents: Boolean(
        profile.documents && profile.documents.length > 0
      )
    };
    
    // Update profile completion status if all steps are complete
    const isComplete = Object.values(completionSteps).every(step => step === true);
    
    if (isComplete !== profile.isProfileComplete) {
      await OwnerProfile.findOneAndUpdate(
        { user: req.user.id },
        { isProfileComplete: isComplete }
      );
    }
    
    res.status(200).json({
      success: true,
      data: completionSteps
    });
    
  } catch (error) {
    console.error('Error fetching profile completion steps:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Could not fetch profile completion steps.'
    });
  }
};

// @desc    Update personal info
// @route   PUT /api/owner/profile/personal
// @access  Private (owner only)
exports.updatePersonalInfo = async (req, res) => {
  try {
    const { fullName, phoneNumber, dateOfBirth, gender } = req.body;
    
    // Validate required fields
    if (!fullName || !phoneNumber) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name and phone number'
      });
    }
    
    // Validate phone number format
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid phone number'
      });
    }
    
    // Find profile
    let profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    // Update personal info
    profile = await OwnerProfile.findOneAndUpdate(
      { user: req.user.id },
      {
        'personalInfo.fullName': fullName,
        'personalInfo.phoneNumber': phoneNumber,
        'personalInfo.dateOfBirth': dateOfBirth || profile.personalInfo.dateOfBirth,
        'personalInfo.gender': gender || profile.personalInfo.gender,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: profile.personalInfo
    });
    
  } catch (error) {
    console.error('Error updating personal info:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages[0]
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error. Could not update personal info.'
    });
  }
};

// @desc    Update business info
// @route   PUT /api/owner/profile/business
// @access  Private (owner only)
exports.updateBusinessInfo = async (req, res) => {
  try {
    const {
      businessName,
      businessType,
      registrationNumber,
      gstNumber,
      yearEstablished,
      description,
      contactInfo
    } = req.body;
    
    // Validate required fields
    if (!businessName || !businessType) {
      return res.status(400).json({
        success: false,
        error: 'Please provide business name and type'
      });
    }
    
    if (!contactInfo || !contactInfo.businessAddress || !contactInfo.businessAddress.city || 
        !contactInfo.businessAddress.state || !contactInfo.businessAddress.pincode) {
      return res.status(400).json({
        success: false,
        error: 'Please provide complete business address'
      });
    }
    
    // Validate pincode
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(contactInfo.businessAddress.pincode)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid 6-digit pincode'
      });
    }
    
    // Find profile
    let profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    // Prepare update object
    const updateObj = {
      'businessInfo.businessName': businessName,
      'businessInfo.businessType': businessType,
      'businessInfo.registrationNumber': registrationNumber,
      'businessInfo.gstNumber': gstNumber,
      'businessInfo.yearEstablished': yearEstablished,
      'businessInfo.description': description,
      'businessInfo.contactInfo.businessAddress.street': contactInfo.businessAddress.street,
      'businessInfo.contactInfo.businessAddress.city': contactInfo.businessAddress.city,
      'businessInfo.contactInfo.businessAddress.state': contactInfo.businessAddress.state,
      'businessInfo.contactInfo.businessAddress.pincode': contactInfo.businessAddress.pincode,
      'businessInfo.contactInfo.businessAddress.country': contactInfo.businessAddress.country || 'India',
      updatedAt: Date.now()
    };
    
    // Add optional contact fields if provided
    if (contactInfo.businessEmail) {
      updateObj['businessInfo.contactInfo.businessEmail'] = contactInfo.businessEmail;
    }
    
    if (contactInfo.businessPhone) {
      updateObj['businessInfo.contactInfo.businessPhone'] = contactInfo.businessPhone;
    }
    
    if (contactInfo.website) {
      updateObj['businessInfo.contactInfo.website'] = contactInfo.website;
    }
    
    if (contactInfo.socialMedia) {
      if (contactInfo.socialMedia.facebook) {
        updateObj['businessInfo.contactInfo.socialMedia.facebook'] = contactInfo.socialMedia.facebook;
      }
      if (contactInfo.socialMedia.instagram) {
        updateObj['businessInfo.contactInfo.socialMedia.instagram'] = contactInfo.socialMedia.instagram;
      }
      if (contactInfo.socialMedia.twitter) {
        updateObj['businessInfo.contactInfo.socialMedia.twitter'] = contactInfo.socialMedia.twitter;
      }
      if (contactInfo.socialMedia.linkedin) {
        updateObj['businessInfo.contactInfo.socialMedia.linkedin'] = contactInfo.socialMedia.linkedin;
      }
    }
    
    // Update business info
    profile = await OwnerProfile.findOneAndUpdate(
      { user: req.user.id },
      updateObj,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: {
        businessInfo: profile.businessInfo
      }
    });
    
  } catch (error) {
    console.error('Error updating business info:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages[0]
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error. Could not update business info.'
    });
  }
};

// @desc    Update payment info
// @route   PUT /api/owner/profile/payment
// @access  Private (owner only)
exports.updatePaymentInfo = async (req, res) => {
  try {
    const { bankDetails, upiId, preferredPaymentMethod, acceptedPaymentMethods } = req.body;
    
    // Validate based on preferred payment method
    if (preferredPaymentMethod === 'bank') {
      if (!bankDetails || !bankDetails.accountHolderName || !bankDetails.accountNumber || 
          !bankDetails.ifscCode || !bankDetails.bankName) {
        return res.status(400).json({
          success: false,
          error: 'Please provide complete bank details'
        });
      }
    } else if (preferredPaymentMethod === 'upi' && !upiId) {
      return res.status(400).json({
        success: false,
        error: 'Please provide UPI ID'
      });
    }
    
    // Find profile
    let profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    // Prepare update object
    const updateObj = {
      updatedAt: Date.now()
    };
    
    if (preferredPaymentMethod) {
      updateObj['paymentInfo.preferredPaymentMethod'] = preferredPaymentMethod;
    }
    
    if (bankDetails) {
      if (bankDetails.accountHolderName) {
        updateObj['paymentInfo.bankDetails.accountHolderName'] = bankDetails.accountHolderName;
      }
      if (bankDetails.accountNumber) {
        updateObj['paymentInfo.bankDetails.accountNumber'] = bankDetails.accountNumber;
      }
      if (bankDetails.ifscCode) {
        updateObj['paymentInfo.bankDetails.ifscCode'] = bankDetails.ifscCode;
      }
      if (bankDetails.bankName) {
        updateObj['paymentInfo.bankDetails.bankName'] = bankDetails.bankName;
      }
      if (bankDetails.branchName) {
        updateObj['paymentInfo.bankDetails.branchName'] = bankDetails.branchName;
      }
    }
    
    if (upiId) {
      updateObj['paymentInfo.upiId'] = upiId;
    }
    
    if (acceptedPaymentMethods) {
      if (acceptedPaymentMethods.bankTransfer !== undefined) {
        updateObj['paymentInfo.acceptedPaymentMethods.bankTransfer'] = acceptedPaymentMethods.bankTransfer;
      }
      if (acceptedPaymentMethods.upi !== undefined) {
        updateObj['paymentInfo.acceptedPaymentMethods.upi'] = acceptedPaymentMethods.upi;
      }
      if (acceptedPaymentMethods.cash !== undefined) {
        updateObj['paymentInfo.acceptedPaymentMethods.cash'] = acceptedPaymentMethods.cash;
      }
      if (acceptedPaymentMethods.cheque !== undefined) {
        updateObj['paymentInfo.acceptedPaymentMethods.cheque'] = acceptedPaymentMethods.cheque;
      }
      if (acceptedPaymentMethods.creditCard !== undefined) {
        updateObj['paymentInfo.acceptedPaymentMethods.creditCard'] = acceptedPaymentMethods.creditCard;
      }
    }
    
    // Update payment info
    profile = await OwnerProfile.findOneAndUpdate(
      { user: req.user.id },
      updateObj,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: profile.paymentInfo
    });
    
  } catch (error) {
    console.error('Error updating payment info:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages[0]
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error. Could not update payment info.'
    });
  }
};

// @desc    Update preferences
// @route   PUT /api/owner/profile/preferences
// @access  Private (owner only)
exports.updatePreferences = async (req, res) => {
  try {
    let profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      // Create new profile if it doesn't exist
      profile = await OwnerProfile.create({
        user: req.user.id,
        preferences: req.body
      });
    } else {
      // Update existing profile
      profile = await OwnerProfile.findOneAndUpdate(
        { user: req.user.id },
        { 
          preferences: req.body,
          updatedAt: Date.now()
        },
        { new: true, runValidators: true }
      );
    }
    
    res.status(200).json({
      success: true,
      data: profile
    });
    
  } catch (error) {
    console.error('Error updating preferences:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages[0]
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error. Could not update preferences.'
    });
  }
};

// @desc    Upload profile picture
// @route   PUT /api/owner/profile/picture
// @access  Private (owner only)
exports.uploadProfilePicture = async (req, res) => {
  try {
    if (!req.files || !req.files.profilePicture) {
      return res.status(400).json({
        success: false,
        error: 'Please upload a profile picture'
      });
    }
    
    const file = req.files.profilePicture;
    
    // Check file type
    if (!file.mimetype.startsWith('image')) {
      return res.status(400).json({
        success: false,
        error: 'Please upload an image file'
      });
    }
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        error: 'Image size should be less than 2MB'
      });
    }
    
    // Upload to Cloudinary
    const result = await uploadToCloudinary(file.tempFilePath, 'owner_profiles');
    
    // Get profile
    let profile = await OwnerProfile.findOne({ user: req.user.id });
    
    // Delete old profile picture from Cloudinary if exists
    if (profile && profile.personalInfo.profilePicture && profile.personalInfo.profilePicture.public_id) {
      await deleteFromCloudinary(profile.personalInfo.profilePicture.public_id);
    }
    
    // Update or create profile
    if (!profile) {
      profile = await OwnerProfile.create({
        user: req.user.id,
        personalInfo: {
          profilePicture: {
            public_id: result.public_id,
            url: result.secure_url
          }
        }
      });
    } else {
      profile = await OwnerProfile.findOneAndUpdate(
        { user: req.user.id },
        {
          'personalInfo.profilePicture': {
            public_id: result.public_id,
            url: result.secure_url
          },
          updatedAt: Date.now()
        },
        { new: true }
      );
    }
    
    // Clean up temp file
    fs.unlinkSync(file.tempFilePath);
    
    res.status(200).json({
      success: true,
      data: profile
    });
    
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Could not upload profile picture.'
    });
  }
};

// @desc    Upload documents
// @route   POST /api/owner/profile/documents
// @access  Private (owner only)
exports.uploadDocuments = async (req, res) => {
  try {
    // Check if file exists in request
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Please upload a file'
      });
    }
    
    // Validate document type
    const { name, type } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a document name'
      });
    }
    
    if (!type || !['identity', 'business_license', 'property_document', 'tax_document', 'other'].includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid document type'
      });
    }
    
    // Find profile
    let profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    // Upload file to Cloudinary
    const result = await uploadToCloudinary(req.file.path, 'owner_documents');
    
    // Remove temporary file
    fs.unlinkSync(req.file.path);
    
    if (!result.secure_url) {
      return res.status(500).json({
        success: false,
        error: 'Error uploading file to cloud storage'
      });
    }
    
    // Create document object
    const document = {
      name,
      type,
      public_id: result.public_id,
      url: result.secure_url,
      uploadDate: new Date()
    };
    
    // Add document to profile
    profile = await OwnerProfile.findOneAndUpdate(
      { user: req.user.id },
      { 
        $push: { documents: document },
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    res.status(201).json({
      success: true,
      data: document
    });
    
  } catch (error) {
    console.error('Error uploading document:', error);
    
    // Remove temporary file if exists
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error. Could not upload document.'
    });
  }
};

// @desc    Get all documents
// @route   GET /api/owner/profile/documents
// @access  Private (owner only)
exports.getDocuments = async (req, res) => {
  try {
    const profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: profile.documents || []
    });
    
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Could not fetch documents.'
    });
  }
};

// @desc    Delete document
// @route   DELETE /api/owner/profile/documents/:id
// @access  Private (owner only)
exports.deleteDocument = async (req, res) => {
  try {
    const documentId = req.params.id;
    
    // Find profile
    const profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    // Find document in profile
    const document = profile.documents.id(documentId);
    
    if (!document) {
      return res.status(404).json({
        success: false,
        error: 'Document not found'
      });
    }
    
    // Delete from Cloudinary
    if (document.public_id) {
      await deleteFromCloudinary(document.public_id);
    }
    
    // Remove document from profile
    await OwnerProfile.findOneAndUpdate(
      { user: req.user.id },
      { 
        $pull: { documents: { _id: documentId } },
        updatedAt: Date.now()
      }
    );
    
    res.status(200).json({
      success: true,
      data: {}
    });
    
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Could not delete document.'
    });
  }
};

// @desc    Update service details
// @route   PUT /api/owner/profile/services
// @access  Private (owner only)
exports.updateServices = async (req, res) => {
  try {
    let profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    const { serviceType, serviceData } = req.body;
    
    if (!serviceType || !serviceData) {
      return res.status(400).json({
        success: false,
        error: 'Please provide serviceType and serviceData'
      });
    }
    
    // Validate service type
    if (!['hostel', 'mess', 'gym'].includes(serviceType)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid service type. Must be one of: hostel, mess, gym'
      });
    }
    
    // Create update object with safer approach
    const updateData = {};
    
    // Handle each service type specifically to ensure proper schema validation
    if (serviceType === 'hostel') {
      updateData['services.hostel.isActive'] = serviceData.isActive !== undefined ? serviceData.isActive : profile.services?.hostel?.isActive || false;
      updateData['services.hostel.totalRooms'] = serviceData.totalRooms !== undefined ? serviceData.totalRooms : profile.services?.hostel?.totalRooms || 0;
      
      // Handle array fields safely
      if (Array.isArray(serviceData.amenities)) {
        updateData['services.hostel.amenities'] = serviceData.amenities;
      }
    } 
    else if (serviceType === 'mess') {
      updateData['services.mess.isActive'] = serviceData.isActive !== undefined ? serviceData.isActive : profile.services?.mess?.isActive || false;
      
      // Handle array fields safely
      if (Array.isArray(serviceData.cuisineTypes)) {
        updateData['services.mess.cuisineTypes'] = serviceData.cuisineTypes;
      }
      
      if (Array.isArray(serviceData.specialDiets)) {
        updateData['services.mess.specialDiets'] = serviceData.specialDiets;
      }
    } 
    else if (serviceType === 'gym') {
      updateData['services.gym.isActive'] = serviceData.isActive !== undefined ? serviceData.isActive : profile.services?.gym?.isActive || false;
      
      // Handle array fields safely
      if (Array.isArray(serviceData.equipmentTypes)) {
        updateData['services.gym.equipmentTypes'] = serviceData.equipmentTypes;
      }
      
      if (Array.isArray(serviceData.specialFacilities)) {
        updateData['services.gym.specialFacilities'] = serviceData.specialFacilities;
      }
    }
    
    // Add updated timestamp
    updateData.updatedAt = Date.now();
    
    // Update only the specified service type with validated data
    profile = await OwnerProfile.findOneAndUpdate(
      { user: req.user.id },
      { $set: updateData },
      { new: true, runValidators: false }
    );
    
    res.status(200).json({
      success: true,
      data: profile
    });
    
  } catch (error) {
    console.error('Error updating services:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Could not update services: ' + error.message
    });
  }
};

// @desc    Update property details
// @route   PUT /api/owner/profile/property
// @access  Private (owner only)
exports.updatePropertyDetails = async (req, res) => {
  try {
    const { 
      propertyTypes, 
      totalProperties, 
      amenities, 
      nearbyFacilities, 
      distanceFromCampus, 
      totalCapacity 
    } = req.body;
    
    // Validate required fields
    if (!propertyTypes || !Array.isArray(propertyTypes) || propertyTypes.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please select at least one property type'
      });
    }
    
    // Find profile
    let profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    // Prepare update object
    const updateObj = {
      'propertyDetails.propertyTypes': propertyTypes,
      updatedAt: Date.now()
    };
    
    if (totalProperties !== undefined) {
      updateObj['propertyDetails.totalProperties'] = totalProperties;
    }
    
    if (totalCapacity !== undefined) {
      updateObj['propertyDetails.totalCapacity'] = totalCapacity;
    }
    
    if (distanceFromCampus) {
      updateObj['propertyDetails.distanceFromCampus'] = distanceFromCampus;
    }
    
    if (nearbyFacilities && Array.isArray(nearbyFacilities)) {
      updateObj['propertyDetails.nearbyFacilities'] = nearbyFacilities;
    }
    
    // Add amenities if provided
    if (amenities) {
      if (amenities.wifi !== undefined) {
        updateObj['propertyDetails.amenities.wifi'] = amenities.wifi;
      }
      if (amenities.parking !== undefined) {
        updateObj['propertyDetails.amenities.parking'] = amenities.parking;
      }
      if (amenities.hotWater !== undefined) {
        updateObj['propertyDetails.amenities.hotWater'] = amenities.hotWater;
      }
      if (amenities.ac !== undefined) {
        updateObj['propertyDetails.amenities.ac'] = amenities.ac;
      }
      if (amenities.tv !== undefined) {
        updateObj['propertyDetails.amenities.tv'] = amenities.tv;
      }
      if (amenities.refrigerator !== undefined) {
        updateObj['propertyDetails.amenities.refrigerator'] = amenities.refrigerator;
      }
      if (amenities.laundry !== undefined) {
        updateObj['propertyDetails.amenities.laundry'] = amenities.laundry;
      }
      if (amenities.kitchen !== undefined) {
        updateObj['propertyDetails.amenities.kitchen'] = amenities.kitchen;
      }
      if (amenities.securityCamera !== undefined) {
        updateObj['propertyDetails.amenities.securityCamera'] = amenities.securityCamera;
      }
    }
    
    // Update profile
    profile = await OwnerProfile.findOneAndUpdate(
      { user: req.user.id },
      updateObj,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: profile.propertyDetails
    });
    
  } catch (error) {
    console.error('Error updating property details:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages[0]
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error. Could not update property details.'
    });
  }
};

// @desc    Migrate existing owner profiles to new schema
// @route   POST /api/owner/profile/migrate
// @access  Private (admin only)
exports.migrateOwnerProfiles = async (req, res) => {
  try {
    // Find all owner profiles
    const profiles = await OwnerProfile.find({});
    
    let migratedCount = 0;
    let errorCount = 0;
    
    // Process each profile
    for (const profile of profiles) {
      try {
        // Create update object with new structure
        const updateObj = {
          // Ensure personalInfo exists
          personalInfo: profile.personalInfo || {},
          
          // Merge businessInfo and contactInfo
          businessInfo: {
            ...(profile.businessInfo || {}),
            contactInfo: profile.contactInfo || {}
          },
          
          // Keep paymentInfo
          paymentInfo: profile.paymentInfo || {},
          
          // Initialize propertyDetails if it doesn't exist
          propertyDetails: profile.propertyDetails || {
            propertyTypes: profile.services?.types || [],
            totalProperties: 0,
            amenities: {
              wifi: false,
              parking: false,
              hotWater: false,
              ac: false,
              tv: false,
              refrigerator: false,
              laundry: false,
              kitchen: false,
              securityCamera: false
            },
            nearbyFacilities: [],
            distanceFromCampus: '',
            totalCapacity: 0
          },
          
          // Keep documents array
          documents: profile.documents || [],
          
          // Keep profile completion status
          isProfileComplete: profile.isProfileComplete || false,
          
          // Update timestamps
          updatedAt: Date.now()
        };
        
        // Remove old fields
        const unsetObj = {
          contactInfo: "",
          preferences: "",
          services: "",
          statistics: ""
        };
        
        // Update the profile
        await OwnerProfile.updateOne(
          { _id: profile._id },
          { 
            $set: updateObj,
            $unset: unsetObj
          }
        );
        
        migratedCount++;
      } catch (error) {
        console.error(`Error migrating profile ${profile._id}:`, error);
        errorCount++;
      }
    }
    
    res.status(200).json({
      success: true,
      message: `Migration completed. ${migratedCount} profiles migrated successfully. ${errorCount} profiles failed.`
    });
    
  } catch (error) {
    console.error('Error migrating owner profiles:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Could not migrate owner profiles.'
    });
  }
};

// @desc    Migrate a single owner profile to new schema
// @route   POST /api/owner/profile/migrate-mine
// @access  Private (owner only)
exports.migrateSingleOwnerProfile = async (req, res) => {
  try {
    // Find the owner profile
    const profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    // Create update object with new structure
    const updateObj = {
      // Ensure personalInfo exists
      personalInfo: profile.personalInfo || {},
      
      // Merge businessInfo and contactInfo
      businessInfo: {
        ...(profile.businessInfo || {}),
        contactInfo: profile.contactInfo || {}
      },
      
      // Keep paymentInfo
      paymentInfo: profile.paymentInfo || {},
      
      // Initialize propertyDetails if it doesn't exist
      propertyDetails: profile.propertyDetails || {
        propertyTypes: profile.services?.types || [],
        totalProperties: 0,
        amenities: {
          wifi: false,
          parking: false,
          hotWater: false,
          ac: false,
          tv: false,
          refrigerator: false,
          laundry: false,
          kitchen: false,
          securityCamera: false
        },
        nearbyFacilities: [],
        distanceFromCampus: '',
        totalCapacity: 0
      },
      
      // Keep documents array
      documents: profile.documents || [],
      
      // Keep profile completion status
      isProfileComplete: profile.isProfileComplete || false,
      
      // Update timestamps
      updatedAt: Date.now()
    };
    
    // Remove old fields
    const unsetObj = {
      contactInfo: "",
      preferences: "",
      services: "",
      statistics: ""
    };
    
    // Update the profile
    await OwnerProfile.updateOne(
      { _id: profile._id },
      { 
        $set: updateObj,
        $unset: unsetObj
      }
    );
    
    // Get the updated profile
    const updatedProfile = await OwnerProfile.findOne({ user: req.user.id });
    
    res.status(200).json({
      success: true,
      message: 'Profile migrated successfully',
      data: updatedProfile
    });
    
  } catch (error) {
    console.error('Error migrating owner profile:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Could not migrate owner profile.'
    });
  }
};
