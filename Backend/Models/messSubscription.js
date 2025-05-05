const mongoose = require('mongoose');

const messSubscriptionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mess: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mess',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  subscriptionDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    default: function() {
      const date = new Date(this.subscriptionDate);
      date.setDate(date.getDate() + 30);
      return date;
    }
  }
});

// Add pre-save middleware to update expiry date when subscription date changes
messSubscriptionSchema.pre('save', function(next) {
  if (this.isModified('subscriptionDate')) {
    const date = new Date(this.subscriptionDate);
    date.setDate(date.getDate() + 30);
    this.expiryDate = date;
  }
  next();
});

// Add static method to cleanup expired subscriptions
messSubscriptionSchema.statics.cleanupExpiredSubscriptions = async function() {
  const now = new Date();
  try {
    const result = await this.deleteMany({
      expiryDate: { $lt: now },
      status: 'accepted'
    });
    console.log(`Cleaned up ${result.deletedCount} expired subscriptions`);
    return result;
  } catch (error) {
    console.error('Error cleaning up subscriptions:', error);
    throw error;
  }
};

module.exports = mongoose.model('MessSubscription', messSubscriptionSchema);