import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import App from "./route/App";
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
import UserProfile from "./Components/UserProfile";
import TempHiddenWrapper from "./WrapperContainers/TempHiddenWrapper";
import Register from "./Components/Register";
import ProfilePage from "./Components/ProfilePage";
import BusinessDashboard from "./Components/BusinessDashboard";
import BookingPage from "./Components/BookingPage";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
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
          path: "/FAQ",
          element: <FAQ />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/Login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/hidden",
          element: (
            <TempHiddenWrapper>
              <BookingPage />
              <BusinessDashboard />
              <ProfilePage />
              <UserProfile />
            </TempHiddenWrapper>
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
      v7_startTransition: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
