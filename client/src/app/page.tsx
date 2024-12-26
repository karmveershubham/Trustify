import Link from "next/link"
import HeroSection from "../components/HeroSection"
import AboutUs from '../components/AboutUs';
import TrustSection from '../components/TrustSection';
import Testimonials from '../components/Testimonials';
import Subscribe from '../components/Subscribe';
import Footer from '../components/Footer';
const page = () => {
  return (
    <div>
      <HeroSection/>
      <AboutUs />
      <TrustSection />
      <Testimonials />
      <Subscribe/>
      <Footer />
    </div>
  )
}

export default page;





