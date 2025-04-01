# CampusCove Backend

CampusCove is a comprehensive platform designed to connect students with essential services around campus, including hostels, mess facilities, and gyms. This repository contains the backend API for the CampusCove application.

## Project Structure

```
Backend/
├── config/                 # Configuration files
│   └── database.js         # Database connection
├── Controllers/            # API controllers
│   ├── authController.js   # Authentication controller
│   └── hostelRoomController.js # Hostel room management
├── middleware/             # Middleware functions
│   ├── auth.js             # Authentication middleware
│   └── upload.js           # File upload middleware (Multer)
├── Models/                 # Database models
│   ├── user.js             # User model
│   └── hostelRoom.js       # Hostel room model
├── routes/                 # API routes
│   ├── authRoutes.js       # Authentication routes
│   └── hostelRoomRoutes.js # Hostel room routes
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
