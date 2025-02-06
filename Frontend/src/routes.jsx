import { createBrowserRouter } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from './layouts/DashboardLayout';

// Wrappers
import HomePageWrapper from "./WrapperContainers/HomePageWrapper";

// Pages
import StudentDashboard from "./pages/StudentDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";

// Components
import AboutCampusCove from "./components/AboutCampusCove";
import MessBookingInfo from "./components/MessBookingInfo";
import OtherInfos from "./components/OtherInfos";
import FacilitiesList from "./components/FacilitiesList";
import MovingSlogan from "./components/MovingSlogan";
import HostelBookingInfo from "./components/HostelBookingInfo";
import FAQ from "./components/FAQs";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import ErrorBoundary from "./components/ErrorBoundary";
import Profile from "./components/Profile";


// Protected Routes
import ProtectedRoute from "./components/protected/ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: (
          <HomePageWrapper>
            <FacilitiesList />
            <HostelBookingInfo />
            <MovingSlogan />
            <MessBookingInfo />
            <OtherInfos />
          </HomePageWrapper>
        ),
      },
      {
        path: "/about",
        element: <AboutCampusCove />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/student-dashboard",
    element: (
      <ProtectedRoute allowedRoles={['student']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <StudentDashboard />
      },
      {
        path: "profile",
        element: <Profile />
      },
      // Add other student routes
    ]
  },
  {
    path: "/owner-dashboard",
    element: (
      <ProtectedRoute allowedRoles={['hostelOwner', 'messOwner', 'gymOwner']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <OwnerDashboard />
      },
      {
        path: "profile",
        element: <Profile />
      },
      // Add other owner routes
    ]
  },
]); 