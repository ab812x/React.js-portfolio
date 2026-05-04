import "./App.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectSection from "./components/ProjectSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";
import SectionDivider from "./components/SectionDivider";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  // Refresh ScrollTrigger after intro completes and content is visible
  useEffect(() => {
    if (introComplete) {
      // Small delay to let the fade-in transition finish
      const t = setTimeout(() => ScrollTrigger.refresh(), 600);
      return () => clearTimeout(t);
    }
  }, [introComplete]);

  return (
    <>
      <IntroAnimation onComplete={() => setIntroComplete(true)} />

      {/* Site content fades in after intro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <CustomCursor />
        <Header />
        <ProgressBar />
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider flip />
        <ProjectSection />
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider flip />
        <ContactSection />
        <SectionDivider />
        <Footer />
      </motion.div>
    </>
  );
}

export default App;
