import AboutCampusCove from "./Landing Page/About";
import Contact from "./Landing Page/Contact";
import FacilitiesList from "./Landing Page/FacilitiesList";
import Footer from "./Landing Page/Footer";
import HostelBookingInfo from "./Landing Page/HostelBookingInfo";
import MessBookingInfo from "./Landing Page/MessBookingInfo";
import MovingSlogon from "./Landing Page/MovingSlogon";
import Navbar from "./Landing Page/Navbar";
import OtherInfos from "./Landing Page/OtherInfos";
import Login from "./Landing Page/login";

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
      <Footer />
    </>
  );
}

export default App;
