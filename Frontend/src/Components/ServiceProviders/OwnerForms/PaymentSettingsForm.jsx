import React, { useState, useEffect } from 'react';
import { FaRupeeSign, FaUniversity, FaMobileAlt, FaRegCreditCard } from 'react-icons/fa';

const PaymentSettingsForm = ({ initialData, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    upiId: '',
    preferredPaymentMethod: 'bank'
  });
  
  const [errors, setErrors] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (initialData && initialData.paymentInfo) {
      // Handle the case where initialData contains the full owner profile structure
      setFormData({
        accountHolderName: initialData.paymentInfo.bankDetails?.accountHolderName || '',
        accountNumber: initialData.paymentInfo.bankDetails?.accountNumber || '',
        ifscCode: initialData.paymentInfo.bankDetails?.ifscCode || '',
        bankName: initialData.paymentInfo.bankDetails?.bankName || '',
        branchName: initialData.paymentInfo.bankDetails?.branchName || '',
        upiId: initialData.paymentInfo.upiId || '',
        preferredPaymentMethod: initialData.paymentInfo.preferredPaymentMethod || 'bank'
      });
      setDataLoaded(true);
    } else if (initialData) {
      // Handle the case where initialData is just the paymentInfo object
      setFormData({
        accountHolderName: initialData.bankDetails?.accountHolderName || '',
        accountNumber: initialData.bankDetails?.accountNumber || '',
        ifscCode: initialData.bankDetails?.ifscCode || '',
        bankName: initialData.bankDetails?.bankName || '',
        branchName: initialData.bankDetails?.branchName || '',
        upiId: initialData.upiId || '',
        preferredPaymentMethod: initialData.preferredPaymentMethod || 'bank'
      });
      setDataLoaded(true);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.preferredPaymentMethod === 'bank') {
      if (!formData.accountHolderName.trim()) {
        newErrors.accountHolderName = 'Account holder name is required';
      }
      
      if (!formData.accountNumber.trim()) {
        newErrors.accountNumber = 'Account number is required';
      }
      
      if (!formData.ifscCode.trim()) {
        newErrors.ifscCode = 'IFSC code is required';
      }
      
      if (!formData.bankName.trim()) {
        newErrors.bankName = 'Bank name is required';
      }
    } else if (formData.preferredPaymentMethod === 'upi' && !formData.upiId.trim()) {
      newErrors.upiId = 'UPI ID is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Format the data for the backend
      const paymentData = {
        bankDetails: {
          accountHolderName: formData.accountHolderName,
          accountNumber: formData.accountNumber,
          ifscCode: formData.ifscCode,
          bankName: formData.bankName,
          branchName: formData.branchName
        },
        upiId: formData.upiId,
        preferredPaymentMethod: formData.preferredPaymentMethod
      };
      
      onSubmit(paymentData);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <FaRegCreditCard className="text-primary mr-2" />
        Payment Settings
      </h2>
      
      {!dataLoaded && !initialData ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading your payment information...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Preferred Payment Method */}
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="preferredPaymentMethod">
                Preferred Payment Method
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaRegCreditCard className="text-gray-400" />
                </div>
                <select
                  id="preferredPaymentMethod"
                  name="preferredPaymentMethod"
                  value={formData.preferredPaymentMethod}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="upi">UPI</option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                </select>
              </div>
            </div>
            
            {/* Bank Details Section */}
            {(formData.preferredPaymentMethod === 'bank' || formData.preferredPaymentMethod === 'card') && (
              <>
                <div className="col-span-2 mt-2">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <FaUniversity className="text-primary mr-2" />
                    Bank Details
                  </h3>
                </div>
                
                {/* Account Holder Name */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="accountHolderName">
                    Account Holder Name*
                  </label>
                  <input
                    type="text"
                    id="accountHolderName"
                    name="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.accountHolderName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="Enter account holder name"
                    required={formData.preferredPaymentMethod === 'bank'}
                  />
                  {errors.accountHolderName && (
                    <p className="text-red-500 text-xs mt-1">{errors.accountHolderName}</p>
                  )}
                </div>
                
                {/* Account Number */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="accountNumber">
                    Account Number*
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.accountNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="Enter account number"
                    required={formData.preferredPaymentMethod === 'bank'}
                  />
                  {errors.accountNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>
                  )}
                </div>
                
                {/* IFSC Code */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="ifscCode">
                    IFSC Code*
                  </label>
                  <input
                    type="text"
                    id="ifscCode"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.ifscCode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="Enter IFSC code"
                    required={formData.preferredPaymentMethod === 'bank'}
                  />
                  {errors.ifscCode && (
                    <p className="text-red-500 text-xs mt-1">{errors.ifscCode}</p>
                  )}
                </div>
                
                {/* Bank Name */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="bankName">
                    Bank Name*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaUniversity className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="bankName"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      className={`w-full pl-10 px-4 py-2 border ${errors.bankName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder="Enter bank name"
                      required={formData.preferredPaymentMethod === 'bank'}
                    />
                  </div>
                  {errors.bankName && (
                    <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>
                  )}
                </div>
                
                {/* Branch Name */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="branchName">
                    Branch Name
                  </label>
                  <input
                    type="text"
                    id="branchName"
                    name="branchName"
                    value={formData.branchName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter branch name (optional)"
                  />
                </div>
              </>
            )}
            
            {/* UPI Details */}
            {formData.preferredPaymentMethod === 'upi' && (
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="upiId">
                  UPI ID*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaMobileAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="upiId"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    className={`w-full pl-10 px-4 py-2 border ${errors.upiId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="Enter UPI ID"
                    required={formData.preferredPaymentMethod === 'upi'}
                  />
                </div>
                {errors.upiId && (
                  <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex items-center font-medium shadow-md"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : 'Save Information'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PaymentSettingsForm;
