import HeroSection from '../components/hero/HeroSection';
import AboutSection from '../components/about/AboutSection';
import FaqSection from '../components/faq/FaqSection';
import FeatureCards from '../components/features/FeatureCards';
import FeatureDetails from '../components/features/FeatureDetails';
import DownloadApp from '@/components/downloadapp/DownloadApp';

export default function Home() {

  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection />

      <div id="features" >
        <FeatureCards />
        <FeatureDetails />
      </div>

      <div id="about" >
        <AboutSection />
      </div>

      <div id="downloadapp">
        <DownloadApp />  
      </div>  

      <div id="faq" >
        <FaqSection />
      </div>
      
    </main>
  );
}
