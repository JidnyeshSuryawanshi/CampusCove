const MessSubscription = require('../Models/messSubscription');

const cleanupSubscriptions = async () => {
  try {
    await MessSubscription.cleanupExpiredSubscriptions();
  } catch (error) {
    console.error('Subscription cleanup failed:', error);
  }
};

// Run cleanup every day at midnight
const scheduleCleanup = () => {
  const now = new Date();
  const night = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // tomorrow
    0, 0, 0 // midnight
  );
  const timeToMidnight = night - now;

  setTimeout(() => {
    cleanupSubscriptions();
    // Setup interval to run every 24 hours
    setInterval(cleanupSubscriptions, 24 * 60 * 60 * 1000);
  }, timeToMidnight);
};

module.exports = { scheduleCleanup, cleanupSubscriptions };