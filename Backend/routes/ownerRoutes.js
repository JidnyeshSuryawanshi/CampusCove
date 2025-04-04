const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getOwnerProfile,
  createOwnerProfile,
  updateOwnerProfile,
  getProfileStatus,
  getProfileCompletionSteps,
  updatePersonalInfo,
  updateBusinessInfo,
  updatePaymentInfo,
  updatePreferences,
  uploadProfilePicture,
  uploadDocuments,
  getDocuments,
  deleteDocument,
  updateServices,
  updatePropertyDetails,
  migrateOwnerProfiles,
  migrateSingleOwnerProfile
} = require('../Controllers/ownerProfileController');

// Base route: /api/owner

// Profile routes
router.route('/profile')
  .get(protect, authorize('hostelOwner', 'messOwner', 'gymOwner'), getOwnerProfile)
  .post(protect, authorize('hostelOwner', 'messOwner', 'gymOwner'), createOwnerProfile)
  .put(protect, authorize('hostelOwner', 'messOwner', 'gymOwner'), updateOwnerProfile);

// Profile status routes
router.get('/profile/status', protect, authorize('hostelOwner', 'messOwner', 'gymOwner'), getProfileStatus);
router.get('/profile/completion-steps', protect, authorize('hostelOwner', 'messOwner', 'gymOwner'), getProfileCompletionSteps);

// Section-specific update routes
router.put('/profile/personal', protect, authorize('hostelOwner', 'messOwner', 'gymOwner'), updatePersonalInfo);
router.put('/profile/business', protect, authorize('hostelOwner', 'messOwner', 'gymOwner'), updateBusinessInfo);
router.put('/profile/payment', protect, authorize('hostelOwner', 'messOwner', 'gymOwner'), updatePaymentInfo);
router.put('/profile/preferences', protect, authorize('hostelOwner', 'messOwner', 'gymOwner'), updatePreferences);
router.put('/profile/services', protect, authorize('hostelOwner', 'messOwner', 'gymOwner'), updateServices);
router.put('/profile/property', protect, authorize('hostelOwner', 'messOwner', 'gymOwner'), updatePropertyDetails);

// Profile picture upload
router.put('/profile/picture', protect, authorize('hostelOwner', 'messOwner', 'gymOwner'), upload.single('profilePicture'), uploadProfilePicture);

// Document routes
router.route('/profile/documents')
  .get(protect, authorize('hostelOwner', 'messOwner', 'gymOwner'), getDocuments)
  .post(protect, authorize('hostelOwner', 'messOwner', 'gymOwner'), upload.single('document'), uploadDocuments);

router.delete('/profile/documents/:id', protect, authorize('hostelOwner', 'messOwner', 'gymOwner'), deleteDocument);

// Migration routes
router.post('/profile/migrate', protect, authorize('admin'), migrateOwnerProfiles);
router.post('/profile/migrate-mine', protect, authorize('hostelOwner', 'messOwner', 'gymOwner'), migrateSingleOwnerProfile);

module.exports = router;
