import Features from "./Features";
import HowItWorks from "./HowItWorks";
import DemoSection from "./DemoSection";
import Testimonials from "./Testimonials";
import Navbar from "./NavBar";
import Hero from "./Hero";
import Stats from "./Stats";
import FAQ from "./FAQ";
import CTA from "./CTA";
import Footer from "./Footer";


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <DemoSection />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;