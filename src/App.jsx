import AboutCampusCove from "./Landing Page/About";
import Contact from "./Landing Page/Contact";
import FAQ from "./Landing Page/FAQs";
import FacilitiesList from "./Landing Page/FacilitiesList";
import Footer from "./Landing Page/Footer";
import HostelBookingInfo from "./Landing Page/HostelBookingInfo";
import MessBookingInfo from "./Landing Page/MessBookingInfo";
import MovingSlogon from "./Landing Page/MovingSlogon";
import Navbar from "./Landing Page/Navbar";
import OtherInfos from "./Landing Page/OtherInfos";
import ProfilePage from "./Landing Page/ProfilePage";
import Login from "./Landing Page/login";
import Profile from "./Landing Page/Profile";
import Register from "./Landing Page/Register";
import UserProfile from "./Landing Page/UserProfile";
import BookingPage from "./Landing Page/BookingPage";
import { BusinessDashboard } from "./Landing Page/BusinessDashboard";


function App() {
  return (
    <>
      <Navbar />
      <FacilitiesList />
      <HostelBookingInfo />
      <MovingSlogon />
      <MessBookingInfo />
      <OtherInfos />
      <AboutCampusCove />
<<<<<<< HEAD
      <Contact />
      <FAQ />
      <Login />
=======
      <Login/>
      <Contact/>
      <FAQ/>
      <Register/>
      <Profile/>
     <UserProfile/>
     <BookingPage/>
     <BusinessDashboard/>
>>>>>>> 0e2f8d3c1560b8bc9af5ecc39fbfaba8bd3908c5
      <Footer />
      <ProfilePage />
    </>
  );
}

export default App;
