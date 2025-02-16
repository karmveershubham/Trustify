import Link from "next/link"
import HeroSection from "../components/landing/HeroSection"
import AboutUs from '../components/landing/AboutUs';
import TrustSection from '../components/landing/TrustSection';
import Testimonials from '../components/landing/Testimonials';
import Subscribe from '../components/landing/Subscribe';
import Footer from '../components/Footer';
const page = () => {
  return (
    <div>
      <HeroSection/>
      <AboutUs />
      <TrustSection />
      <Testimonials />
      <Subscribe/>
    </div>
  )
}

export default page;