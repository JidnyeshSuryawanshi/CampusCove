const HostelRoom = require('../Models/hostelRoom');
const fs = require('fs');
const path = require('path');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

// @desc    Create a new hostel room
// @route   POST /api/hostel-rooms
// @access  Private (hostelOwner only)
exports.createHostelRoom = async (req, res) => {
  try {
    // Add owner to req.body
    req.body.owner = req.user.id;
    
    // Process uploaded images
    const imageUploadPromises = [];
    
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadPromise = uploadToCloudinary(file.path, 'hostel_rooms');
        imageUploadPromises.push(uploadPromise);
      }
    }
    
    // Wait for all images to upload
    const uploadedImages = await Promise.all(imageUploadPromises);
    
    // Add images to req.body
    req.body.images = uploadedImages;
    
    // Create hostel room
    const hostelRoom = await HostelRoom.create(req.body);
    
    // Clean up temporary files
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        fs.unlinkSync(file.path);
      }
    }
    
    res.status(201).json({
      success: true,
      data: hostelRoom
    });
    
  } catch (error) {
    console.error('Create hostel room error:', error);
    
    // Clean up temporary files if they exist
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }
    
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
      error: 'Server error. Could not create hostel room.'
    });
  }
};

// @desc    Get all hostel rooms
// @route   GET /api/hostel-rooms
// @access  Public
exports.getHostelRooms = async (req, res) => {
  try {
    // Build query
    let query = {};
    
    // Filter by availability if specified
    if (req.query.available === 'true') {
      query.availability = true;
    }
    
    // Filter by gender if specified
    if (req.query.gender && ['male', 'female'].includes(req.query.gender)) {
      query.gender = { $in: [req.query.gender, 'any'] };
    }
    
    // Filter by price range if specified
    if (req.query.minPrice && req.query.maxPrice) {
      query.price = { 
        $gte: parseInt(req.query.minPrice), 
        $lte: parseInt(req.query.maxPrice) 
      };
    } else if (req.query.minPrice) {
      query.price = { $gte: parseInt(req.query.minPrice) };
    } else if (req.query.maxPrice) {
      query.price = { $lte: parseInt(req.query.maxPrice) };
    }
    
    // Filter by room type if specified
    if (req.query.roomType && ['single', 'double', 'triple', 'dormitory', 'flat'].includes(req.query.roomType)) {
      query.roomType = req.query.roomType;
    }
    
    // Execute query
    const hostelRooms = await HostelRoom.find(query)
      .populate({
        path: 'owner',
        select: 'username email'
      })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: hostelRooms.length,
      data: hostelRooms
    });
    
  } catch (error) {
    console.error('Get hostel rooms error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Could not fetch hostel rooms.'
    });
  }
};

// @desc    Get hostel rooms for a specific owner
// @route   GET /api/hostel-rooms/owner
// @access  Private (owner only)
exports.getOwnerHostelRooms = async (req, res) => {
  try {
    const hostelRooms = await HostelRoom.find({ owner: req.user.id })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: hostelRooms.length,
      data: hostelRooms
    });
    
  } catch (error) {
    console.error('Get owner hostel rooms error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Could not fetch your hostel rooms.'
    });
  }
};

// @desc    Get single hostel room
// @route   GET /api/hostel-rooms/:id
// @access  Public
exports.getHostelRoom = async (req, res) => {
  try {
    const hostelRoom = await HostelRoom.findById(req.params.id)
      .populate({
        path: 'owner',
        select: 'username email'
      });
    
    if (!hostelRoom) {
      return res.status(404).json({
        success: false,
        error: 'Hostel room not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: hostelRoom
    });
    
  } catch (error) {
    console.error('Get hostel room error:', error);
    
    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Hostel room not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error. Could not fetch hostel room.'
    });
  }
};

// @desc    Update hostel room
// @route   PUT /api/hostel-rooms/:id
// @access  Private (owner only)
exports.updateHostelRoom = async (req, res) => {
  try {
    let hostelRoom = await HostelRoom.findById(req.params.id);
    
    if (!hostelRoom) {
      return res.status(404).json({
        success: false,
        error: 'Hostel room not found'
      });
    }
    
    // Make sure user is the owner
    if (hostelRoom.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this hostel room'
      });
    }
    
    // Process uploaded images if any
    if (req.files && req.files.length > 0) {
      const imageUploadPromises = [];
      
      for (const file of req.files) {
        const uploadPromise = uploadToCloudinary(file.path, 'hostel_rooms');
        imageUploadPromises.push(uploadPromise);
      }
      
      // Wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);
      
      // Add new images to existing ones
      if (!req.body.images) {
        req.body.images = [...hostelRoom.images, ...uploadedImages];
      } else {
        req.body.images = [...req.body.images, ...uploadedImages];
      }
      
      // Clean up temporary files
      for (const file of req.files) {
        fs.unlinkSync(file.path);
      }
    }
    
    // Update hostel room
    hostelRoom = await HostelRoom.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      data: hostelRoom
    });
    
  } catch (error) {
    console.error('Update hostel room error:', error);
    
    // Clean up temporary files if they exist
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }
    
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
      error: 'Server error. Could not update hostel room.'
    });
  }
};

// @desc    Delete hostel room
// @route   DELETE /api/hostel-rooms/:id
// @access  Private (owner only)
exports.deleteHostelRoom = async (req, res) => {
  try {
    const hostelRoom = await HostelRoom.findById(req.params.id);
    
    if (!hostelRoom) {
      return res.status(404).json({
        success: false,
        error: 'Hostel room not found'
      });
    }
    
    // Make sure user is the owner
    if (hostelRoom.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this hostel room'
      });
    }
    
    // Delete images from Cloudinary
    const deletePromises = hostelRoom.images.map(image => 
      deleteFromCloudinary(image.public_id)
    );
    
    await Promise.all(deletePromises);
    
    // Delete hostel room
    await hostelRoom.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
    
  } catch (error) {
    console.error('Delete hostel room error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Could not delete hostel room.'
    });
  }
};

// @desc    Delete image from hostel room
// @route   DELETE /api/hostel-rooms/:id/images/:imageId
// @access  Private (owner only)
exports.deleteHostelRoomImage = async (req, res) => {
  try {
    const hostelRoom = await HostelRoom.findById(req.params.id);
    
    if (!hostelRoom) {
      return res.status(404).json({
        success: false,
        error: 'Hostel room not found'
      });
    }
    
    // Make sure user is the owner
    if (hostelRoom.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to modify this hostel room'
      });
    }
    
    // Find the image
    const image = hostelRoom.images.find(img => img._id.toString() === req.params.imageId);
    
    if (!image) {
      return res.status(404).json({
        success: false,
        error: 'Image not found'
      });
    }
    
    // Delete image from Cloudinary
    await deleteFromCloudinary(image.public_id);
    
    // Remove image from hostel room
    hostelRoom.images = hostelRoom.images.filter(img => img._id.toString() !== req.params.imageId);
    
    await hostelRoom.save();
    
    res.status(200).json({
      success: true,
      data: hostelRoom
    });
    
  } catch (error) {
    console.error('Delete hostel room image error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Could not delete image.'
    });
  }
};
