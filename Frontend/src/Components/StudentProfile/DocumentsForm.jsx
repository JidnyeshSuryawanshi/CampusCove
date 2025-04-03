import React, { useState, useEffect, useRef } from 'react';
import { FaFileAlt, FaUpload, FaTrash, FaCheckCircle, FaTimesCircle, FaFileImage, FaFilePdf, FaEye, FaExternalLinkAlt, FaTimes, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const DeleteConfirmationModal = ({ document, onClose, onConfirm, isDeleting }) => {
  if (!document) return null;
  
  const isPDF = document.url?.toLowerCase().endsWith('.pdf');
  const isImage = document.url ? /\.(jpg|jpeg|png|gif|webp)$/i.test(document.url) : false;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full overflow-hidden shadow-xl transform transition-all">
        <div className="bg-red-50 p-4 sm:p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <FaExclamationTriangle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Delete Document</h3>
          <div className="mt-3 mb-4">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this document? This action cannot be undone.
            </p>
          </div>
          
          {/* Document preview */}
          <div className="border rounded-lg p-3 bg-white mb-4 flex items-center">
            <div className="mr-3 text-xl">
              {isPDF ? (
                <FaFilePdf className="text-red-500" />
              ) : isImage ? (
                <FaFileImage className="text-green-500" />
              ) : (
                <FaFileAlt className="text-blue-500" />
              )}
            </div>
            <div className="text-left overflow-hidden">
              <h4 className="font-medium text-gray-800 truncate">{document.name}</h4>
              <p className="text-xs text-gray-500 capitalize">{document.type?.replace('_', ' ')}</p>
            </div>
          </div>
          
          <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DocumentPreviewModal = ({ document, onClose }) => {
  if (!document) return null;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const isPDF = document.url.toLowerCase().endsWith('.pdf');
  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(document.url);
  
  const handleLoad = () => {
    setLoading(false);
  };
  
  const handleError = () => {
    setLoading(false);
    setError(true);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium flex items-center">
            {isPDF ? <FaFilePdf className="text-red-500 mr-2" /> : <FaFileImage className="text-green-500 mr-2" />}
            {document.name}
          </h3>
          <div className="flex items-center space-x-2">
            <a 
              href={document.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              title="Open in new tab"
            >
              <FaExternalLinkAlt />
            </a>
            <button 
              onClick={onClose}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded"
              title="Close preview"
            >
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="p-4 flex-1 overflow-auto flex items-center justify-center bg-gray-100">
          {loading && (
            <div className="flex flex-col items-center justify-center p-10">
              <FaSpinner className="animate-spin text-3xl text-green-600 mb-2" />
              <p className="text-gray-600">Loading document...</p>
            </div>
          )}
          
          {error && (
            <div className="flex flex-col items-center justify-center p-10 text-center">
              <FaTimesCircle className="text-3xl text-red-500 mb-2" />
              <p className="text-gray-800 font-medium">Unable to preview this document</p>
              <p className="text-gray-600 mt-1">Please use the "Open in new tab" button to view it</p>
            </div>
          )}
          
          {isPDF ? (
            <iframe 
              src={`${document.url}#toolbar=0`} 
              title={document.name}
              className={`w-full h-full min-h-[500px] border-0 ${loading ? 'hidden' : 'block'}`}
              onLoad={handleLoad}
              onError={handleError}
            />
          ) : isImage ? (
            <img 
              src={document.url} 
              alt={document.name} 
              className={`max-w-full max-h-[70vh] object-contain ${loading ? 'hidden' : 'block'}`}
              onLoad={handleLoad}
              onError={handleError}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-10 text-center">
              <FaFileAlt className="text-4xl text-green-600 mb-3" />
              <p className="text-gray-800 font-medium">This document can't be previewed</p>
              <p className="text-gray-600 mt-1">Please use the "Open in new tab" button to view it</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function DocumentsForm({ initialData, onRefresh }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [documentType, setDocumentType] = useState('identity');
  const [documentName, setDocumentName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewDocument, setPreviewDocument] = useState(null);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch documents from the backend
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/student/profile/documents');
      if (response.data.success && response.data.data) {
        setDocuments(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialData && initialData.documents) {
      setDocuments(initialData.documents);
    } else {
      // If no initial data is provided, fetch documents from the backend
      fetchDocuments();
    }
  }, [initialData]);

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (file.size > maxSize) {
      toast.error('File size should not exceed 5MB');
      resetFileInput();
      return;
    }
    
    // Allowed file types: images and PDF
    const fileType = file.type;
    if (!fileType.startsWith('image/') && fileType !== 'application/pdf') {
      toast.error('Only images and PDFs are allowed');
      resetFileInput();
      return;
    }
    
    // Create preview
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // Clean up previous preview
    }
    
    const filePreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(filePreviewUrl);
    setSelectedFile(file);
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const uploadDocument = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }
    
    try {
      setUploading(true);
      setUploadProgress(0);
      
      const formData = new FormData();
      formData.append('document', selectedFile);
      formData.append('type', documentType);
      
      if (documentName.trim()) {
        formData.append('name', documentName.trim());
      } else {
        formData.append('name', selectedFile.name);
      }
      
      // Upload to server
      const response = await api.post('/student/profile/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      
      if (response.data.success) {
        // Show success toast notification
        toast.success('Document uploaded successfully');
        
        // Reset form state
        setDocumentName('');
        resetFileInput();
        
        // If there's a refresh callback, call it to update the parent component
        if (onRefresh) {
          onRefresh();
        } else {
          // Fetch the updated list of documents directly from the server
          // This ensures we have the most up-to-date list without requiring a manual refresh
          await fetchDocuments();
        }
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.error(error.response?.data?.message || 'Failed to upload document. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const deleteDocument = async (id) => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }
    
    try {
      setLoading(true);
      const response = await api.delete(`/student/profile/documents/${id}`);
      
      if (response.data.success) {
        toast.success('Document deleted successfully');
        
        // Update local state or call refresh function
        if (onRefresh) {
          onRefresh();
        } else {
          // Either update local state or fetch fresh data from server
          // For consistency with upload behavior, we'll fetch from server
          await fetchDocuments();
        }
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error(error.response?.data?.message || 'Failed to delete document');
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (url) => {
    if (url) {
      if (url.endsWith('.pdf')) {
        return <FaFilePdf className="text-red-500" />;
      } else {
        return <FaFileImage className="text-green-500" />;
      }
    }
    return <FaFileAlt className="text-gray-500" />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewDocument = (document) => {
    setPreviewDocument(document);
  };

  const initiateDeleteDocument = (document) => {
    setDocumentToDelete(document);
  };

  const confirmDeleteDocument = async () => {
    if (!documentToDelete) return;
    
    try {
      setIsDeleting(true);
      const response = await api.delete(`/student/profile/documents/${documentToDelete._id}`);
      
      if (response.data.success) {
        toast.success('Document deleted successfully');
        
        // Update local state or call refresh function
        if (onRefresh) {
          onRefresh();
        } else {
          // Either update local state or fetch fresh data from server
          // For consistency with upload behavior, we'll fetch from server
          await fetchDocuments();
        }
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error(error.response?.data?.message || 'Failed to delete document');
    } finally {
      setIsDeleting(false);
      setDocumentToDelete(null);
    }
  };
  
  const cancelDeleteDocument = () => {
    setDocumentToDelete(null);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md mb-6">
      {previewDocument && (
        <DocumentPreviewModal 
          document={previewDocument} 
          onClose={() => setPreviewDocument(null)} 
        />
      )}
      
      {documentToDelete && (
        <DeleteConfirmationModal
          document={documentToDelete}
          onClose={cancelDeleteDocument}
          onConfirm={confirmDeleteDocument}
          isDeleting={isDeleting}
        />
      )}
      
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <FaFileAlt className="text-green-600 mr-2" />
        Documents & Verification
      </h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Upload New Document</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Document Type*
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={uploading}
            >
              <option value="identity">Identity Proof</option>
              <option value="address_proof">Address Proof</option>
              <option value="student_id">Student ID</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Document Name (Optional)
            </label>
            <input
              type="text"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="E.g., Aadhar Card, Driving License"
              disabled={uploading}
            />
          </div>
        </div>
        
        {/* File Preview Area */}
        {previewUrl && (
          <div className="mt-4 border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3 text-xl">
                {getFileIcon(selectedFile?.name)}
              </div>
              <div>
                <h4 className="font-medium text-gray-800">{selectedFile?.name}</h4>
                <p className="text-sm text-gray-500">
                  {selectedFile?.type} - {(selectedFile?.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              {selectedFile?.type.startsWith('image/') && (
                <a 
                  href={previewUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-green-600 hover:bg-green-50 rounded"
                >
                  <FaEye />
                </a>
              )}
              <button 
                className="p-2 text-red-600 hover:bg-red-50 rounded"
                onClick={resetFileInput}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-4 flex gap-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,application/pdf"
            className="hidden"
            disabled={uploading}
          />
          
          {!selectedFile ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`px-4 py-2 border-2 border-dashed rounded-lg w-full flex items-center justify-center ${
                uploading 
                  ? 'border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed' 
                  : 'border-green-300 hover:border-green-500 hover:bg-green-50 text-green-600'
              }`}
              disabled={uploading}
            >
              <FaUpload className="mr-2" />
              <span>Click to select a file or drag and drop (max 5MB)</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={uploadDocument}
              disabled={uploading}
              className={`px-4 py-2 rounded-lg w-full flex items-center justify-center ${
                uploading 
                  ? 'bg-gray-300 text-gray-700 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {uploading ? (
                <div className="flex flex-col items-center w-full">
                  <div className="flex items-center">
                    <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Uploading...</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-white h-2.5 rounded-full" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <>
                  <FaUpload className="mr-2" />
                  <span>Upload Document</span>
                </>
              )}
            </button>
          )}
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          Supported file types: Images (JPG, PNG) and PDF
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Your Documents</h3>
        
        {documents.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            You haven't uploaded any documents yet.
          </p>
        ) : (
          <div className="border rounded-lg divide-y">
            {documents.map((doc) => (
              <div key={doc._id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="mr-3 text-xl">
                    {getFileIcon(doc.url)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{doc.name}</h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-3">Uploaded: {formatDate(doc.uploadedAt)}</span>
                      <span className="capitalize">{doc.type.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="mr-4">
                    {doc.verified ? (
                      <span className="inline-flex items-center text-green-700 text-sm">
                        <FaCheckCircle className="mr-1" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-yellow-600 text-sm">
                        <FaTimesCircle className="mr-1" />
                        Pending
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleViewDocument(doc)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      title="View document"
                    >
                      <span className="sr-only">View</span>
                      <FaEye />
                    </button>
                    
                    <button
                      onClick={() => initiateDeleteDocument(doc)}
                      disabled={loading}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                      title="Delete document"
                    >
                      <span className="sr-only">Delete</span>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 