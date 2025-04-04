import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import api from '../utils/api';

// Create context
const OwnerProfileContext = createContext();

// Profile reducer
const profileReducer = (state, action) => {
  switch (action.type) {
    case 'PROFILE_REQUEST':
      return { ...state, loading: true };
    case 'PROFILE_SUCCESS':
      return { 
        ...state, 
        profile: action.payload, 
        loading: false, 
        error: null,
        isProfileComplete: action.payload !== null
      };
    case 'PROFILE_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'COMPLETION_STEPS_SUCCESS':
      return { 
        ...state, 
        completionSteps: action.payload.completionSteps,
        completionPercentage: action.payload.completionPercentage,
        loading: false
      };
    case 'CLEAR_PROFILE':
      return { 
        profile: null, 
        loading: false, 
        error: null, 
        isProfileComplete: false,
        completionSteps: null,
        completionPercentage: 0
      };
    default:
      return state;
  }
};

// Provider component
export const OwnerProfileProvider = ({ children }) => {
  const initialState = {
    profile: null,
    loading: true,
    error: null,
    isProfileComplete: false,
    completionSteps: null,
    completionPercentage: 0
  };

  const [state, dispatch] = useReducer(profileReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // If user is authenticated and is an owner, fetch their profile
    if (isAuthenticated && user && user.userType && user.userType.includes('Owner')) {
      getProfile();
      getCompletionSteps();
    } else {
      dispatch({ type: 'CLEAR_PROFILE' });
    }
  }, [isAuthenticated, user]);

  // Get owner profile
  const getProfile = async () => {
    try {
      dispatch({ type: 'PROFILE_REQUEST' });
      
      const response = await api.get('/owner/profile');
      
      if (response.data.success && response.data.profile) {
        dispatch({
          type: 'PROFILE_SUCCESS',
          payload: response.data.profile
        });
      } else {
        dispatch({
          type: 'PROFILE_ERROR',
          payload: 'Invalid profile data received from server'
        });
      }
    } catch (error) {
      console.error('Error fetching owner profile:', error);
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response?.data?.message || 'Failed to fetch profile'
      });
      toast.error(error.response?.data?.message || 'Failed to fetch profile');
    }
  };

  // Get profile completion steps
  const getCompletionSteps = async () => {
    try {
      dispatch({ type: 'PROFILE_REQUEST' });
      
      const response = await api.get('/owner/profile/completion-steps');
      
      if (response.data.success) {
        dispatch({
          type: 'COMPLETION_STEPS_SUCCESS',
          payload: {
            completionSteps: response.data.completionSteps,
            completionPercentage: response.data.completionPercentage
          }
        });
      }
    } catch (error) {
      console.error('Error fetching completion steps:', error);
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response?.data?.message || 'Failed to fetch completion steps'
      });
    }
  };

  // Update personal information
  const updatePersonalInfo = async (data) => {
    try {
      dispatch({ type: 'PROFILE_REQUEST' });
      
      const response = await api.put('/owner/profile/personal', data);
      
      if (response.data.success) {
        // Update the profile data with the new values
        const updatedProfile = {
          ...state.profile,
          personalInfo: {
            ...state.profile?.personalInfo,
            ...data
          }
        };
        
        dispatch({
          type: 'PROFILE_SUCCESS',
          payload: updatedProfile
        });
        
        // Refresh completion steps
        getCompletionSteps();
        
        return updatedProfile;
      }
    } catch (error) {
      console.error('Error updating personal info:', error);
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response?.data?.message || 'Failed to update personal information'
      });
      throw error;
    }
  };

  // Update business information
  const updateBusinessInfo = async (data) => {
    try {
      dispatch({ type: 'PROFILE_REQUEST' });
      
      const response = await api.put('/owner/profile/business', data);
      
      if (response.data.success) {
        // Update the profile data with the new values
        const updatedProfile = {
          ...state.profile,
          businessInfo: {
            ...state.profile?.businessInfo,
            ...data
          }
        };
        
        dispatch({
          type: 'PROFILE_SUCCESS',
          payload: updatedProfile
        });
        
        // Refresh completion steps
        getCompletionSteps();
        
        return updatedProfile;
      }
    } catch (error) {
      console.error('Error updating business info:', error);
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response?.data?.message || 'Failed to update business information'
      });
      throw error;
    }
  };

  // Update payment settings
  const updatePaymentSettings = async (data) => {
    try {
      dispatch({ type: 'PROFILE_REQUEST' });
      
      const response = await api.put('/owner/profile/payment', data);
      
      if (response.data.success) {
        // Update the profile data with the new values
        const updatedProfile = {
          ...state.profile,
          paymentSettings: {
            ...state.profile?.paymentSettings,
            ...data
          }
        };
        
        dispatch({
          type: 'PROFILE_SUCCESS',
          payload: updatedProfile
        });
        
        // Refresh completion steps
        getCompletionSteps();
        
        return updatedProfile;
      }
    } catch (error) {
      console.error('Error updating payment settings:', error);
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response?.data?.message || 'Failed to update payment settings'
      });
      throw error;
    }
  };

  // Update preferences
  const updatePreferences = async (data) => {
    try {
      dispatch({ type: 'PROFILE_REQUEST' });
      
      const response = await api.put('/owner/profile/preferences', data);
      
      if (response.data.success) {
        // Update the profile data with the new values
        const updatedProfile = {
          ...state.profile,
          preferences: {
            ...state.profile?.preferences,
            ...data
          }
        };
        
        dispatch({
          type: 'PROFILE_SUCCESS',
          payload: updatedProfile
        });
        
        // Refresh completion steps
        getCompletionSteps();
        
        return updatedProfile;
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response?.data?.message || 'Failed to update preferences'
      });
      throw error;
    }
  };

  // Upload document
  const uploadDocument = async (formData) => {
    try {
      dispatch({ type: 'PROFILE_REQUEST' });
      
      const response = await api.post('/owner/profile/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        // Update the profile with the new data from the response
        if (response.data.profile) {
          dispatch({
            type: 'PROFILE_SUCCESS',
            payload: response.data.profile
          });
        } else {
          // If no profile in response, refresh the profile
          getProfile();
        }
        
        // Update completion steps if available in response
        if (response.data.completionStatus) {
          dispatch({
            type: 'COMPLETION_STEPS_SUCCESS',
            payload: {
              completionSteps: response.data.completionStatus.completionSteps,
              completionPercentage: response.data.completionStatus.completionPercentage
            }
          });
        } else {
          // Otherwise refresh completion steps
          getCompletionSteps();
        }
        
        return response.data;
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response?.data?.message || 'Failed to upload document'
      });
      throw error;
    }
  };

  // Delete document
  const deleteDocument = async (documentId) => {
    try {
      dispatch({ type: 'PROFILE_REQUEST' });
      
      const response = await api.delete(`/owner/profile/documents/${documentId}`);
      
      if (response.data.success) {
        // Update the profile with the new data from the response
        if (response.data.profile) {
          dispatch({
            type: 'PROFILE_SUCCESS',
            payload: response.data.profile
          });
        } else {
          // If no profile in response, refresh the profile
          getProfile();
        }
        
        // Update completion steps if available in response
        if (response.data.completionStatus) {
          dispatch({
            type: 'COMPLETION_STEPS_SUCCESS',
            payload: {
              completionSteps: response.data.completionStatus.completionSteps,
              completionPercentage: response.data.completionStatus.completionPercentage
            }
          });
        } else {
          // Otherwise refresh completion steps
          getCompletionSteps();
        }
        
        return response.data;
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response?.data?.message || 'Failed to delete document'
      });
      throw error;
    }
  };

  // Update profile picture
  const updateProfilePicture = async (formData) => {
    try {
      dispatch({ type: 'PROFILE_REQUEST' });
      
      const response = await api.put('/owner/profile/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        // Update the profile with the new picture URL
        const updatedProfile = {
          ...state.profile,
          profileImage: response.data.profileImage
        };
        
        dispatch({
          type: 'PROFILE_SUCCESS',
          payload: updatedProfile
        });
        
        return updatedProfile;
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response?.data?.message || 'Failed to update profile picture'
      });
      throw error;
    }
  };

  return (
    <OwnerProfileContext.Provider
      value={{
        ...state,
        getProfile,
        updatePersonalInfo,
        updateBusinessInfo,
        updatePaymentSettings,
        updatePreferences,
        uploadDocument,
        deleteDocument,
        updateProfilePicture,
        getCompletionSteps
      }}
    >
      {children}
    </OwnerProfileContext.Provider>
  );
};

// Export hook for easy context use
export const useOwnerProfile = () => useContext(OwnerProfileContext);

export default OwnerProfileContext;
