import React, { useState, useEffect } from 'react';
import { FaUsers, FaRupeeSign, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
import api from '../../utils/api';

export default function Revenew() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeSubscribers: 0,
    monthlyRevenue: 0,
    averageMonthlyRevenue: 0,
    subscriptionHistory: [],
    monthlyStats: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRevenueStats();
  }, []);

  const fetchRevenueStats = async () => {
    try {
      // Fetch all subscriptions for the mess owner
      const response = await api.get('/mess/owner/subscriptions');
      const subscriptions = response.data.data;
      
      // Calculate statistics
      const acceptedSubs = subscriptions.filter(sub => sub.status === 'accepted');
      const currentDate = new Date();
      const activeSubscriptions = acceptedSubs.filter(sub => new Date(sub.expiryDate) > currentDate);
      
      // Calculate total and monthly revenue
      const totalRevenue = activeSubscriptions.reduce((sum, sub) => 
        sum + sub.mess.monthlyPrice, 0);
      
      // Group subscriptions by month
      const monthlyData = groupByMonth(acceptedSubs);
      
      // Calculate average monthly revenue
      const avgMonthlyRevenue = calculateAverageMonthlyRevenue(monthlyData);

      setStats({
        totalRevenue,
        activeSubscribers: activeSubscriptions.length,
        monthlyRevenue: monthlyData[currentMonth()]?.revenue || 0,
        averageMonthlyRevenue: avgMonthlyRevenue,
        subscriptionHistory: acceptedSubs,
        monthlyStats: formatMonthlyStats(monthlyData)
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching revenue stats:', error);
      setError('Failed to load revenue statistics');
      setLoading(false);
    }
  };

  const groupByMonth = (subscriptions) => {
    return subscriptions.reduce((acc, sub) => {
      const date = new Date(sub.subscriptionDate);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      
      if (!acc[key]) {
        acc[key] = {
          revenue: 0,
          count: 0,
          month: date.toLocaleString('default', { month: 'long' }),
          year: date.getFullYear()
        };
      }
      
      acc[key].revenue += sub.mess.monthlyPrice;
      acc[key].count += 1;
      return acc;
    }, {});
  };

  const calculateAverageMonthlyRevenue = (monthlyData) => {
    const months = Object.values(monthlyData);
    if (months.length === 0) return 0;
    const totalRevenue = months.reduce((sum, month) => sum + month.revenue, 0);
    return Math.round(totalRevenue / months.length);
  };

  const currentMonth = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}`;
  };

  const formatMonthlyStats = (monthlyData) => {
    return Object.entries(monthlyData)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([key, data]) => ({
        ...data,
        id: key
      }));
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500 p-4">{error}</div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaRupeeSign />}
          title="Total Revenue"
          value={`₹${stats.totalRevenue}`}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          icon={<FaUsers />}
          title="Active Subscribers"
          value={stats.activeSubscribers}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={<FaRupeeSign />}
          title="Current Month Revenue"
          value={`₹${stats.monthlyRevenue}`}
          color="bg-purple-100 text-purple-600"
        />
        <StatCard
          icon={<FaChartLine />}
          title="Avg Monthly Revenue"
          value={`₹${stats.averageMonthlyRevenue}`}
          color="bg-orange-100 text-orange-600"
        />
      </div>

      {/* Monthly Revenue History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Revenue History</h3>
        <div className="space-y-4">
          {stats.monthlyStats.map((month) => (
            <div 
              key={month.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded"
            >
              <div className="flex items-center space-x-4">
                <FaCalendarAlt className="text-gray-400" />
                <span>{month.month} {month.year}</span>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-gray-600">
                  <span className="font-medium">{month.count}</span> subscribers
                </div>
                <div className="text-green-600 font-medium">
                  ₹{month.revenue}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className={`${color} rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-2xl font-semibold mt-2">{value}</p>
  </div>
);