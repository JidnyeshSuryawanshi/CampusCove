import AboutCampusCove from "./Landing Page/About";
import FacilitiesList from "./Landing Page/FacilitiesList";
import FAQ from "./Landing Page/FAQs";
import Footer from "./Landing Page/Footer";
import HostelBookingInfo from "./Landing Page/HostelBookingInfo";
import MessBookingInfo from "./Landing Page/MessBookingInfo";
import MovingSlogon from "./Landing Page/MovingSlogon";
import Navbar from "./Landing Page/Navbar";
import OtherInfos from "./Landing Page/OtherInfos";

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
      <FAQ/>

      <Footer />
    </>
  );
}

export default App;