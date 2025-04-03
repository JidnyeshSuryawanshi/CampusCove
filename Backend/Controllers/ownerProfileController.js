const OwnerProfile = require('../models/ownerProfile');
const User = require('../models/user');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');
const fs = require('fs');
const path = require('path');

// @desc    Get owner profile
// @route   GET /api/owner/profile
// @access  Private (owner only)
exports.getOwnerProfile = async (req, res) => {
  try {
    let profile = await OwnerProfile.findOne({ user: req.user.id });
    
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
    
    // Create profile
    profile = await OwnerProfile.create({
      user: req.user.id,
      ...req.body
    });
    
    res.status(201).json({
      success: true,
      data: profile
    });
    
  } catch (error) {
    console.error('Error creating owner profile:', error);
    
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
      error: 'Server error. Could not create profile.'
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
          preferences: false,
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
        profile.businessInfo.businessType
      ),
      payment: Boolean(
        profile.paymentInfo && 
        ((profile.paymentInfo.bankDetails && profile.paymentInfo.bankDetails.accountNumber) || 
         profile.paymentInfo.upiId)
      ),
      preferences: Boolean(
        profile.preferences && 
        (profile.preferences.bookingNotifications !== undefined || 
         profile.preferences.emailNotifications !== undefined)
      ),
      documents: Boolean(
        profile.documents && 
        profile.documents.length > 0
      )
    };
    
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
    let profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      // Create new profile if it doesn't exist
      profile = await OwnerProfile.create({
        user: req.user.id,
        personalInfo: req.body
      });
    } else {
      // Update existing profile
      profile = await OwnerProfile.findOneAndUpdate(
        { user: req.user.id },
        { 
          personalInfo: req.body,
          updatedAt: Date.now()
        },
        { new: true, runValidators: true }
      );
    }
    
    // Update user's name in the User model if provided
    if (req.body.fullName) {
      await User.findByIdAndUpdate(
        req.user.id,
        { name: req.body.fullName },
        { new: true }
      );
    }
    
    res.status(200).json({
      success: true,
      data: profile
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
      error: 'Server error. Could not update personal information.'
    });
  }
};

// @desc    Update business info
// @route   PUT /api/owner/profile/business
// @access  Private (owner only)
exports.updateBusinessInfo = async (req, res) => {
  try {
    let profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      // Create new profile if it doesn't exist
      profile = await OwnerProfile.create({
        user: req.user.id,
        businessInfo: req.body
      });
    } else {
      // Update existing profile
      profile = await OwnerProfile.findOneAndUpdate(
        { user: req.user.id },
        { 
          businessInfo: req.body,
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
      error: 'Server error. Could not update business information.'
    });
  }
};

// @desc    Update payment info
// @route   PUT /api/owner/profile/payment
// @access  Private (owner only)
exports.updatePaymentInfo = async (req, res) => {
  try {
    let profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      // Create new profile if it doesn't exist
      profile = await OwnerProfile.create({
        user: req.user.id,
        paymentInfo: req.body
      });
    } else {
      // Update existing profile
      profile = await OwnerProfile.findOneAndUpdate(
        { user: req.user.id },
        { 
          paymentInfo: req.body,
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
      error: 'Server error. Could not update payment information.'
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
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Please upload a document'
      });
    }
    
    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.path, 'owner_documents');
    
    // Get profile
    let profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    // Add document to profile
    const newDocument = {
      name: req.body.name || req.file.originalname,
      type: req.body.type || 'other',
      cloudinaryId: result.public_id,
      url: result.secure_url,
      expiryDate: req.body.expiryDate || null
    };
    
    profile = await OwnerProfile.findOneAndUpdate(
      { user: req.user.id },
      {
        $push: { documents: newDocument },
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    // Clean up temp file
    fs.unlinkSync(req.file.path);
    
    res.status(200).json({
      success: true,
      data: profile
    });
    
  } catch (error) {
    console.error('Error uploading document:', error);
    
    // Clean up temp file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error. Could not upload document.'
    });
  }
};

// @desc    Delete document
// @route   DELETE /api/owner/profile/documents/:id
// @access  Private (owner only)
exports.deleteDocument = async (req, res) => {
  try {
    // Get profile
    const profile = await OwnerProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    // Find document
    const document = profile.documents.id(req.params.id);
    
    if (!document) {
      return res.status(404).json({
        success: false,
        error: 'Document not found'
      });
    }
    
    // Delete from Cloudinary
    await deleteFromCloudinary(document.cloudinaryId);
    
    // Remove document from profile
    await OwnerProfile.findOneAndUpdate(
      { user: req.user.id },
      {
        $pull: { documents: { _id: req.params.id } },
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
    
    // Update services
    profile = await OwnerProfile.findOneAndUpdate(
      { user: req.user.id },
      {
        services: req.body,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      data: profile
    });
    
  } catch (error) {
    console.error('Error updating services:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Could not update services.'
    });
  }
};
