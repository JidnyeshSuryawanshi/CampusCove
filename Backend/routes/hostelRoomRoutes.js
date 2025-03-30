const express = require('express');
const router = express.Router();
const { 
  createHostelRoom, 
  getHostelRooms, 
  getHostelRoom, 
  updateHostelRoom, 
  deleteHostelRoom, 
  getOwnerHostelRooms,
  deleteHostelRoomImage
} = require('../Controllers/hostelRoomController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Routes
router.route('/')
  .get(getHostelRooms)
  .post(
    protect, 
    authorize('hostelOwner'), 
    upload.array('images', 5), 
    createHostelRoom
  );

router.route('/owner')
  .get(protect, authorize('hostelOwner'), getOwnerHostelRooms);

router.route('/:id')
  .get(getHostelRoom)
  .put(
    protect, 
    authorize('hostelOwner'), 
    upload.array('images', 5), 
    updateHostelRoom
  )
  .delete(protect, authorize('hostelOwner'), deleteHostelRoom);

router.route('/:id/images/:imageId')
  .delete(protect, authorize('hostelOwner'), deleteHostelRoomImage);

module.exports = router;
