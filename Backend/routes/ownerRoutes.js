const express = require('express');
const {
  getOwnerProfile,
  createOwnerProfile,
  updateOwnerProfile,
  getUserDetails,
  getProfileCompletionSteps,
  updatePersonalInfo,
  updateBusinessInfo,
  updatePaymentSettings,
  updatePreferences,
  uploadDocument,
  deleteDocument,
  uploadProfilePicture
} = require('../controllers/ownerProfileController');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// All routes are protected and require owner role
router.use(protect);
router.use(authorize('hostelOwner', 'messOwner', 'gymOwner'));

// Get all user details (account + profile)
router.get('/details', getUserDetails);

// Profile routes
router.route('/profile')
  .get(getOwnerProfile)
  .post(createOwnerProfile)
  .put(updateOwnerProfile);

// Profile completion steps
router.get('/profile/completion-steps', getProfileCompletionSteps);

// Section-specific update routes
router.put('/profile/personal', updatePersonalInfo);
router.put('/profile/business', updateBusinessInfo);
router.put('/profile/payment', updatePaymentSettings);
router.put('/profile/preferences', updatePreferences);

// Document routes
router.post('/profile/documents', uploadDocument);
router.delete('/profile/documents/:id', deleteDocument);

// Profile picture route
router.put('/profile/picture', uploadProfilePicture);

module.exports = router;
