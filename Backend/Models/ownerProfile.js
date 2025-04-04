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
        },
        country: {
          type: String,
          default: 'India'
        }
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
    preferredPaymentMethod: {
      type: String,
      enum: ['bank', 'upi', 'cash', 'card'],
      default: 'bank'
    },
    acceptedPaymentMethods: {
      bankTransfer: {
        type: Boolean,
        default: true
      },
      upi: {
        type: Boolean,
        default: false
      },
      cash: {
        type: Boolean,
        default: false
      },
      cheque: {
        type: Boolean,
        default: false
      },
      creditCard: {
        type: Boolean,
        default: false
      }
    }
  },
  propertyDetails: {
    propertyTypes: [{
      type: String,
      enum: ['hostel', 'mess', 'gym']
    }],
    totalProperties: {
      type: Number,
      default: 0
    },
    amenities: {
      wifi: {
        type: Boolean,
        default: false
      },
      parking: {
        type: Boolean,
        default: false
      },
      hotWater: {
        type: Boolean,
        default: false
      },
      ac: {
        type: Boolean,
        default: false
      },
      tv: {
        type: Boolean,
        default: false
      },
      refrigerator: {
        type: Boolean,
        default: false
      },
      laundry: {
        type: Boolean,
        default: false
      },
      kitchen: {
        type: Boolean,
        default: false
      },
      securityCamera: {
        type: Boolean,
        default: false
      }
    },
    nearbyFacilities: [String],
    distanceFromCampus: String,
    totalCapacity: {
      type: Number,
      default: 0
    }
  },
  documents: [{
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['identity', 'business_license', 'property_document', 'tax_document', 'other'],
      required: true
    },
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  isProfileComplete: {
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
