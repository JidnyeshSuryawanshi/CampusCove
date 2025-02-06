import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import HomePageWrapper from "./WrapperContainers/HomePageWrapper";
import AboutCampusCove from "./Components/AboutCampusCove";
import MessBookingInfo from "./Components/MessBookingInfo";
import OtherInfos from "./Components/OtherInfos";
import FacilitiesList from "./Components/FacilitiesList";
import MovingSlogan from "./Components/MovingSlogon";
import HostelBookingInfo from "./Components/HostelBookingInfo";
import FAQ from "./Components/FAQs";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Register from "./Components/Register";
import StudentDashboard from "./pages/StudentDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import ErrorBoundary from "./Components/ErrorBoundary";
import ProtectedRoute from "./Components/protected/ProtectedRoute";
import Profile from './Components/Profile';
import DashboardLayout from './layouts/DashboardLayout';

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