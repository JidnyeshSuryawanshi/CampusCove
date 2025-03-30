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
import AboutCampusCove from "./Components/Landingpage/AboutCampusCove.jsx";
import MessBookingInfo from "./Components/Landingpage/MessBookingInfo.jsx";
import OtherInfos from "./Components/Landingpage/OtherInfos.jsx";
import FacilitiesList from "./Components/Landingpage/FacilitiesList.jsx";
import MovingSlogan from "./Components/Landingpage/MovingSlogan.jsx";
import HostelBookingInfo from "./Components/Landingpage/HostelBookingInfo.jsx";
import FAQ from "./Components/Landingpage/FAQs.jsx";
import Contact from "./Components/Landingpage/Contact.jsx";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import ErrorBoundary from "./Components/ErrorBoundary.jsx";
import Profile from "./Components/Profile.jsx";


// Protected Routes
import ProtectedRoute from "./Components/protected/ProtectedRoute";

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