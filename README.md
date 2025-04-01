# CampusCove

CampusCove is a comprehensive platform designed to simplify campus living for students by providing a centralized hub for hostel bookings, mess subscriptions, and other campus facilities.

## Features

- **User Authentication** - Secure login and registration system with role-based access
- **Dashboard Systems** - Separate dashboards for students and facility owners (hostel, mess, gym)
- **Booking Management** - Reserve hostel rooms and subscribe to mess services
- **Profile Management** - User profile customization and management
- **Responsive Design** - Mobile-friendly interface built with React and Tailwind CSS

## Tech Stack

### Frontend
- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- React Hot Toast for notifications
- FontAwesome and React Icons for UI elements

### Backend
- Node.js with Express
- MongoDB with Mongoose for data modeling
- JWT for authentication
- bcrypt for password hashing
- Cookie-based authentication

## Project Structure

### Frontend Structure
```
Frontend/
├── public/              # Static assets
├── scripts/             # Build scripts
├── src/
│   ├── Components/      # Reusable UI components
│   ├── context/         # React context for state management
│   ├── layouts/         # Layout components (PublicLayout, DashboardLayout)
│   ├── pages/           # Main page components
│   ├── WrapperContainers/ # Higher-order components
│   ├── App.jsx          # Main application component
│   ├── config.js        # App configuration
│   ├── index.css        # Global CSS
│   ├── main.jsx         # Application entry point
│   └── routes.jsx       # Application routes
├── index.html           # HTML entry point
├── package.json         # Frontend dependencies
└── tailwind.config.js   # Tailwind CSS configuration
```

### Backend Structure
```
Backend/
├── config/              # Configuration files
├── Controllers/         # Request handlers
│   └── authController.js # Authentication controller
├── middleware/          # Express middleware
│   └── auth.js          # Authentication middleware
├── Models/              # Database models
│   └── user.js          # User model
├── routes/              # API routes
│   └── authRoutes.js    # Authentication routes
├── utils/               # Utility functions
├── index.js             # Server entry point
└── package.json         # Backend dependencies
```

## Routes

### Frontend Routes

Each frontend route renders specific React components:

- `/` - Home page displaying information about various campus facilities
  - Rendered components: FacilitiesList, HostelBookingInfo, MovingSlogan, MessBookingInfo, OtherInfos
  - Purpose: Showcases available campus facilities and booking options

- `/about` - About CampusCove
  - Rendered component: AboutCampusCove
  - Purpose: Provides information about the platform's mission and services

- `/faq` - Frequently asked questions
  - Rendered component: FAQ
  - Purpose: Answers common queries about platform usage

- `/contact` - Contact information
  - Rendered component: Contact
  - Purpose: Provides contact details and potentially a contact form

- `/login` - User login
  - Rendered component: Login
  - Purpose: Authentication form for existing users
  - On successful login: Redirects to appropriate dashboard based on user role

- `/register` - User registration
  - Rendered component: Register
  - Purpose: Registration form for new users
  - Expected inputs: Username, email, password, user type (student/owner type)
  - On successful registration: Redirects to login

- `/student-dashboard` - Student dashboard (protected)
  - Access: Restricted to users with 'student' role
  - Rendered component: StudentDashboard
  - Purpose: Provides booking management and student-specific features
  - Subpath: `/student-dashboard/profile` - User profile management

- `/owner-dashboard` - Facility owner dashboard (protected)
  - Access: Restricted to users with 'hostelOwner', 'messOwner', or 'gymOwner' roles
  - Rendered component: OwnerDashboard
  - Purpose: Facility management dashboard for owners
  - Subpath: `/owner-dashboard/profile` - Owner profile management

### Backend API Routes

The backend API serves JSON responses with the following request/response formats:

- **POST `/api/auth/register`** - User registration
  - Request:
    ```json
    {
      "username": "string (minimum 3 characters)",
      "email": "string (valid email format)",
      "password": "string (minimum 6 characters)",
      "userType": "string (enum: student, hostelOwner, messOwner, gymOwner)"
    }
    ```
  - Response (success - 201):
    ```json
    {
      "success": true,
      "token": "JWT token",
      "user": {
        "id": "user ID",
        "username": "user's username",
        "email": "user's email",
        "userType": "user's role"
      }
    }
    ```
  - Response (error - 400/500):
    ```json
    {
      "success": false,
      "error": "Error message"
    }
    ```

- **POST `/api/auth/login`** - User login
  - Request:
    ```json
    {
      "email": "string (registered email)",
      "password": "string"
    }
    ```
  - Response (success - 200):
    ```json
    {
      "success": true,
      "token": "JWT token",
      "user": {
        "id": "user ID",
        "username": "user's username",
        "email": "user's email",
        "userType": "user's role"
      }
    }
    ```
  - Response (error - 400/401):
    ```json
    {
      "success": false,
      "error": "Invalid credentials"
    }
    ```
  - Note: Sets HTTP-only cookie with JWT token for authentication

- **GET `/api/auth/profile`** - Get user profile (protected)
  - Headers: Authorization: Bearer {token}
  - Response (success - 200):
    ```json
    {
      "success": true,
      "data": {
        "id": "user ID",
        "username": "user's username",
        "email": "user's email",
        "userType": "user's role",
        "createdAt": "account creation date"
      }
    }
    ```
  - Response (error - 401/404):
    ```json
    {
      "success": false,
      "error": "Not authorized to access this route"
    }
    ```

- **GET `/api/auth/me`** - Get current user (protected)
  - Headers: Authorization: Bearer {token}
  - Response (success - 200):
    ```json
    {
      "success": true,
      "data": {
        "id": "user ID",
        "username": "user's username",
        "email": "user's email",
        "userType": "user's role"
      }
    }
    ```
  - Response (error - 401):
    ```json
    {
      "success": false,
      "error": "Not authorized to access this route"
    }
    ```

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB instance

### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd Backend
npm install
# Create a .env file with required environment variables
npm run dev
```

Required environment variables for backend:
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `NODE_ENV` - Environment (development/production)
- `ALLOWED_ORIGINS` - Comma-separated list of allowed frontend URLs (for CORS)

## Deployment
- Frontend is configured for Vercel deployment
- Backend is configured for Render deployment

## License
ISC - as specified in the backend package.json
