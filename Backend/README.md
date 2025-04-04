# CampusCove Backend

CampusCove is a comprehensive platform designed to connect students with essential services around campus, including hostels, mess facilities, and gyms. This repository contains the backend API for the CampusCove application.

## Project Structure

```
Backend/
├── config/                 # Configuration files
│   └── database.js         # Database connection
├── Controllers/            # API controllers
│   ├── authController.js   # Authentication controller
│   ├── hostelRoomController.js # Hostel room management
│   ├── messController.js   # Mess service management
│   ├── gymController.js    # Gym service management
│   ├── ownerProfileController.js # Owner profile management
│   └── studentProfileController.js # Student profile management
├── middleware/             # Middleware functions
│   ├── auth.js             # Authentication middleware
│   └── upload.js           # File upload middleware (Multer)
├── Models/                 # Database models
│   ├── user.js             # User model
│   ├── hostelRoom.js       # Hostel room model
│   ├── mess.js             # Mess service model
│   ├── gym.js              # Gym service model
│   ├── ownerProfile.js     # Owner profile model
│   └── studentProfile.js   # Student profile model
├── routes/                 # API routes
│   ├── authRoutes.js       # Authentication routes
│   ├── hostelRoomRoutes.js # Hostel room routes
│   ├── messRoutes.js       # Mess service routes
│   ├── gymRoutes.js        # Gym service routes
│   ├── ownerRoutes.js      # Owner profile routes
│   ├── studentRoutes.js    # Student profile routes
│   └── userRoutes.js       # User routes
├── uploads/                # Temporary storage for uploads
├── utils/                  # Utility functions
│   ├── cloudinary.js       # Cloudinary integration
│   └── errorHandler.js     # Error handling
├── .env                    # Environment variables (not in repo)
├── .env.example            # Example environment variables
├── index.js                # Main application entry point
└── package.json            # Project dependencies and scripts
```

## API Routes

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `GET /api/auth/me` - Get current user (protected)

### Hostel Room Routes
- `GET /api/hostel-rooms` - Get all hostel rooms (public)
- `POST /api/hostel-rooms` - Create a new hostel room (protected, hostelOwner only)
- `GET /api/hostel-rooms/owner` - Get all rooms for the current owner (protected, hostelOwner only)
- `GET /api/hostel-rooms/:id` - Get a specific hostel room (public)
- `PUT /api/hostel-rooms/:id` - Update a hostel room (protected, hostelOwner only)
- `DELETE /api/hostel-rooms/:id` - Delete a hostel room (protected, hostelOwner only)
- `DELETE /api/hostel-rooms/:id/images/:imageId` - Delete a specific image from a hostel room (protected, hostelOwner only)

### Mess Routes
- `GET /api/mess` - Get all mess listings (public)
- `POST /api/mess` - Create a new mess listing (protected, messOwner only)
- `GET /api/mess/owner` - Get all mess listings for the current owner (protected, messOwner only)
- `GET /api/mess/:id` - Get a specific mess listing (public)
- `PUT /api/mess/:id` - Update a mess listing (protected, messOwner only)
- `DELETE /api/mess/:id` - Delete a mess listing (protected, messOwner only)
- `DELETE /api/mess/:id/images/:imageId` - Delete a specific image from a mess listing (protected, messOwner only)

### Gym Routes
- `GET /api/gym` - Get all gym listings (public)
- `POST /api/gym` - Create a new gym listing (protected, gymOwner only)
- `GET /api/gym/owner` - Get all gym listings for the current owner (protected, gymOwner only)
- `GET /api/gym/:id` - Get a specific gym listing (public)
- `PUT /api/gym/:id` - Update a gym listing (protected, gymOwner only)
- `DELETE /api/gym/:id` - Delete a gym listing (protected, gymOwner only)
- `DELETE /api/gym/:id/images/:imageId` - Delete a specific image from a gym listing (protected, gymOwner only)

### Owner Profile Routes
- `GET /api/owner/profile` - Get owner profile (protected, owners only)
- `POST /api/owner/profile` - Create owner profile (protected, owners only)
- `PUT /api/owner/profile` - Update owner profile (protected, owners only)
- `GET /api/owner/profile/status` - Get profile completion status (protected, owners only)
- `GET /api/owner/profile/completion-steps` - Get profile completion steps (protected, owners only)
- `PUT /api/owner/profile/personal` - Update personal information (protected, owners only)
- `PUT /api/owner/profile/business` - Update business information (protected, owners only)
- `PUT /api/owner/profile/payment` - Update payment information (protected, owners only)
- `PUT /api/owner/profile/preferences` - Update preferences (protected, owners only)
- `PUT /api/owner/profile/services` - Update services (protected, owners only)
- `PUT /api/owner/profile/property` - Update property details (protected, owners only)
- `PUT /api/owner/profile/picture` - Upload profile picture (protected, owners only)
- `GET /api/owner/profile/documents` - Get documents (protected, owners only)
- `POST /api/owner/profile/documents` - Upload documents (protected, owners only)
- `DELETE /api/owner/profile/documents/:id` - Delete document (protected, owners only)

### Student Profile Routes
- `GET /api/student/details` - Get all user details (account + profile) (protected, students only)
- `GET /api/student/profile` - Get student profile (protected, students only)
- `POST /api/student/profile` - Create student profile (protected, students only)
- `PUT /api/student/profile` - Update student profile (protected, students only)
- `GET /api/student/profile/status` - Get profile completion status (protected, students only)
- `GET /api/student/profile/completion-steps` - Get profile completion steps (protected, students only)
- `PUT /api/student/profile/picture` - Upload profile picture (protected, students only)
- `PUT /api/student/profile/personal` - Update personal information (protected, students only)
- `PUT /api/student/profile/academic` - Update academic information (protected, students only)
- `PUT /api/student/profile/payment` - Update payment information (protected, students only)
- `PUT /api/student/profile/preferences` - Update preferences (protected, students only)
- `POST /api/student/profile/documents` - Upload documents (protected, students only)
- `DELETE /api/student/profile/documents/:id` - Delete document (protected, students only)

## Models

### User Model
- `username` - User's username
- `email` - User's email address
- `password` - User's password (hashed)
- `userType` - Type of user (student, hostelOwner, messOwner, gymOwner)
- `createdAt` - Account creation date

### Hostel Room Model
- `owner` - Reference to User model (hostelOwner)
- `roomName` - Name of the room
- `roomType` - Type of room (single, double, triple, dormitory, flat)
- `price` - Monthly rent
- `capacity` - Room capacity
- `gender` - Gender preference (any, male, female)
- `amenities` - Object containing available amenities
- `images` - Array of image objects (public_id and url from Cloudinary)
- `description` - Room description
- `address` - Room address
- `rules` - Room rules and policies
- `availability` - Room availability status
- `createdAt` - Listing creation date

### Mess Model
- `owner` - Reference to User model (messOwner)
- `messName` - Name of the mess
- `messType` - Type of mess (veg, nonVeg, both)
- `monthlyPrice` - Monthly subscription price
- `dailyPrice` - Daily meal price
- `capacity` - Mess capacity
- `openingHours` - Operating hours
- `amenities` - Object containing available amenities
- `weeklyMenu` - Object containing daily menu items
- `images` - Array of image objects (public_id and url from Cloudinary)
- `description` - Mess description
- `address` - Mess address
- `rules` - Mess rules and policies
- `availability` - Mess availability status
- `createdAt` - Listing creation date

### Gym Model
- `owner` - Reference to User model (gymOwner)
- `gymName` - Name of the gym
- `gymType` - Type of gym (fitness, crossfit, yoga, cardio, weightlifting, mixed)
- `capacity` - Gym capacity
- `openingHours` - Operating hours
- `equipment` - Object containing available equipment
- `facilities` - Object containing available facilities
- `membershipPlans` - Array of membership plan objects
- `images` - Array of image objects (public_id and url from Cloudinary)
- `description` - Gym description
- `address` - Gym address
- `rules` - Gym rules and policies
- `availability` - Gym availability status
- `createdAt` - Listing creation date

### Owner Profile Model
- `owner` - Reference to User model
- `personalInfo` - Object containing personal information (name, phone, etc.)
- `businessInfo` - Object containing business information (business name, type, etc.)
- `paymentSettings` - Object containing payment information (bank details, UPI, etc.)
- `propertyDetails` - Object containing property details (location, size, etc.)
- `services` - Object containing service information
- `preferences` - Object containing owner preferences
- `profilePicture` - Profile picture URL
- `documents` - Array of document objects (ID proof, business license, etc.)
- `profileStatus` - Profile completion status
- `createdAt` - Profile creation date

### Student Profile Model
- `student` - Reference to User model
- `personalInfo` - Object containing personal information (name, phone, etc.)
- `academicInfo` - Object containing academic information (college, course, etc.)
- `paymentInfo` - Object containing payment information
- `preferences` - Object containing student preferences
- `profilePicture` - Profile picture URL
- `documents` - Array of document objects (ID proof, college ID, etc.)
- `profileStatus` - Profile completion status
- `createdAt` - Profile creation date

## File Uploads

The backend uses Multer for handling file uploads and Cloudinary for storing images:

1. Multer temporarily stores uploaded files in the `/uploads` directory
2. Files are then uploaded to Cloudinary
3. Cloudinary URLs are stored in the database
4. Temporary files are deleted after processing

## Environment Variables

Create a `.env` file with the following variables (see `.env.example`):

```
# MongoDB Connection
MONGO_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URLs for CORS
ALLOWED_ORIGINS=https://campus-cove.vercel.app,https://campus-cove-ten.vercel.app

# Port
PORT=5000
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the required environment variables
4. Start the development server:
   ```
   npm start
   ```
5. The API will be available at `http://localhost:5000`

## Deployment

The backend is deployed on Render.com at `https://campus-cove.onrender.com`.
