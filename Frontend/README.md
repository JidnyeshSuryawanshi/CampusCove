# CampusCove Frontend

CampusCove is a comprehensive platform designed to connect students with essential services around campus, including hostels, mess facilities, and gyms. This repository contains the frontend code for the CampusCove application.

## Project Structure

```
Frontend/
├── public/                 # Public assets
├── src/
│   ├── Components/         # React components
│   │   ├── Landingpage/    # Landing page components
│   │   ├── Login.jsx       # Login component
│   │   ├── Profile.jsx     # User profile component
│   │   ├── Register.jsx    # Registration component
│   │   ├── ServiceConsumers/   # Components for students (service consumers)
│   │   │   └── DashboardHeader.jsx
│   │   ├── ServiceProviders/   # Components for service providers
│   │   │   ├── AllCustomers.jsx        # Customers management
│   │   │   ├── Bookings.jsx            # Bookings management
│   │   │   ├── DashboardHeader.jsx     # Header for provider dashboard
│   │   │   ├── OwnerDashboard.jsx      # Main dashboard for providers
│   │   │   ├── OwnerSidebar.jsx        # Sidebar navigation for providers
│   │   │   ├── Revenew.jsx             # Revenue management
│   │   │   └── ServiceManagement.jsx   # Service management (hostels, mess, gym)
│   │   └── protected/      # Protected route components
│   ├── context/            # React context providers
│   │   └── AuthContext.jsx # Authentication context
│   ├── layouts/            # Layout components
│   │   ├── DashboardLayout.jsx
│   │   └── PublicLayout.jsx
│   ├── pages/              # Page components
│   ├── WrapperContainers/  # Container components
│   ├── App.jsx             # Main App component
│   ├── main.jsx            # Entry point
│   └── routes.jsx          # Application routes
└── package.json            # Project dependencies and scripts
```

## Routes

The application has the following main routes:

### Public Routes
- `/` - Home page with facility listings
- `/about` - About CampusCove
- `/faq` - Frequently asked questions
- `/contact` - Contact information
- `/login` - User login
- `/register` - User registration

### Student Routes (Protected)
- `/student-dashboard` - Student dashboard
- `/student-dashboard/profile` - Student profile

### Service Provider Routes (Protected)
- `/owner-dashboard` - Service provider dashboard
- `/owner-dashboard/profile` - Provider profile
- `/owner-dashboard/all-customers` - Customers management
- `/owner-dashboard/bookings` - Bookings management
- `/owner-dashboard/revenew` - Revenue management
- `/owner-dashboard/services` - Service management

## Service Management

The Service Management section allows service providers to manage their listings:

### Hostel Owners
- Add, edit, and delete hostel room listings
- Upload room photos (stored on Cloudinary)
- Manage room details, amenities, and availability

### Mess Owners
- Coming soon: Manage mess service listings

### Gym Owners
- Coming soon: Manage gym service listings

## API Integration

The frontend connects to the backend API at:
- Production: `https://campus-cove.onrender.com/api`
- Development: `http://localhost:5000/api`

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. The application will be available at `http://localhost:5173`

## Deployment

The frontend is deployed on Vercel.
