const mongoose = require('mongoose');

const ownerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  personalInfo: {
    fullName: {
      type: String,
      required: [true, 'Please provide your full name']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide a contact number'],
      match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Please provide a valid phone number']
    },
    email: {
      type: String,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    alternatePhone: {
      type: String,
      match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Please provide a valid phone number']
    },
    profileImage: {
      public_id: String,
      url: String
    }
  },
  businessInfo: {
    businessName: {
      type: String,
      required: [true, 'Please provide your business name']
    },
    businessType: {
      type: String,
      required: [true, 'Please provide your business type'],
      enum: {
        values: ['hostel', 'mess', 'gym', 'other'],
        message: 'Please select a valid business type'
      }
    },
    gstNumber: {
      type: String
    },
    businessAddress: {
      type: String,
      required: [true, 'Please provide your business address']
    },
    establishmentYear: {
      type: String
    }
  },
  paymentSettings: {
    accountHolderName: {
      type: String,
      required: [true, 'Please provide the account holder name']
    },
    accountNumber: {
      type: String,
      required: [true, 'Please provide the account number']
    },
    ifscCode: {
      type: String,
      required: [true, 'Please provide the IFSC code']
    },
    bankName: {
      type: String,
      required: [true, 'Please provide the bank name']
    },
    upiId: {
      type: String
    }
  },
  preferences: {
    bookingPreferences: {
      autoAcceptBookings: {
        type: Boolean,
        default: false
      },
      minimumStayDuration: {
        type: String,
        default: '1'
      },
      advanceBookingDays: {
        type: String,
        default: '7'
      },
      instantPaymentRequired: {
        type: Boolean,
        default: false
      }
    },
    notificationSettings: {
      emailNotifications: {
        type: Boolean,
        default: true
      },
      smsNotifications: {
        type: Boolean,
        default: false
      },
      bookingAlerts: {
        type: Boolean,
        default: true
      },
      paymentAlerts: {
        type: Boolean,
        default: true
      },
      marketingUpdates: {
        type: Boolean,
        default: false
      }
    },
    displaySettings: {
      showContactInfo: {
        type: Boolean,
        default: true
      },
      showPricing: {
        type: Boolean,
        default: true
      },
      featuredListing: {
        type: Boolean,
        default: false
      }
    }
  },
  documents: [{
    documentType: {
      type: String,
      enum: ['businessLicense', 'identityProof', 'addressProof', 'taxDocument', 'propertyDocument', 'other'],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    documentUrl: {
      type: String,
      required: true
    },
    cloudinaryId: {
      type: String,
      required: true
    },
    uploadDate: {
      type: Date,
      default: Date.now
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    },
    rejectionReason: {
      type: String
    }
  }],
  isProfileComplete: {
    type: Boolean,
    default: false
  },
  completionPercentage: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for faster queries
ownerProfileSchema.index({ user: 1 });

module.exports = mongoose.model('OwnerProfile', ownerProfileSchema);
