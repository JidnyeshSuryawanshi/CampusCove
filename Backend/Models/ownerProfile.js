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
    dateOfBirth: {
      type: Date
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer not to say']
    },
    profilePicture: {
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
      enum: ['hostel', 'mess', 'gym', 'multiple'],
      required: [true, 'Please specify your business type']
    },
    registrationNumber: {
      type: String
    },
    gstNumber: {
      type: String
    },
    yearEstablished: {
      type: Number
    },
    description: {
      type: String
    }
  },
  contactInfo: {
    businessAddress: {
      street: String,
      city: {
        type: String,
        required: [true, 'Please provide your city']
      },
      state: {
        type: String,
        required: [true, 'Please provide your state']
      },
      pincode: {
        type: String,
        required: [true, 'Please provide your pincode'],
        match: [/^\d{6}$/, 'Please provide a valid 6-digit pincode']
      }
    },
    alternateAddress: {
      street: String,
      city: String,
      state: String,
      pincode: String
    },
    businessEmail: {
      type: String,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    businessPhone: {
      type: String,
      match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Please provide a valid phone number']
    },
    website: String,
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String
    }
  },
  paymentInfo: {
    bankDetails: {
      accountHolderName: String,
      accountNumber: String,
      ifscCode: String,
      bankName: String,
      branchName: String
    },
    upiId: String,
    paymentGateway: {
      merchantId: String,
      apiKey: String,
      secretKey: String,
      isConfigured: {
        type: Boolean,
        default: false
      }
    },
    taxInformation: {
      panNumber: String,
      gstNumber: String,
      taxDeductionAccount: String
    }
  },
  preferences: {
    bookingNotifications: {
      type: Boolean,
      default: true
    },
    emailNotifications: {
      type: Boolean,
      default: true
    },
    smsNotifications: {
      type: Boolean,
      default: true
    },
    autoAcceptBookings: {
      type: Boolean,
      default: false
    },
    maintenanceMode: {
      type: Boolean,
      default: false
    }
  },
  documents: [{
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['business_registration', 'identity_proof', 'address_proof', 'tax_document', 'license', 'other'],
      default: 'other'
    },
    cloudinaryId: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    verified: {
      type: Boolean,
      default: false
    },
    expiryDate: {
      type: Date
    }
  }],
  services: {
    hostel: {
      isActive: {
        type: Boolean,
        default: false
      },
      totalRooms: {
        type: Number,
        default: 0
      },
      amenities: [String]
    },
    mess: {
      isActive: {
        type: Boolean,
        default: false
      },
      cuisineTypes: [String],
      specialDiets: [String]
    },
    gym: {
      isActive: {
        type: Boolean,
        default: false
      },
      equipmentTypes: [String],
      specialFacilities: [String]
    }
  },
  statistics: {
    totalBookings: {
      type: Number,
      default: 0
    },
    totalRevenue: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    }
  },
  isProfileComplete: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for faster queries
ownerProfileSchema.index({ user: 1 });
ownerProfileSchema.index({ 'businessInfo.businessType': 1 });

module.exports = mongoose.model('OwnerProfile', ownerProfileSchema);
