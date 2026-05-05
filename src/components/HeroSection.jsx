// npm install gsap @gsap/react
import { motion } from "framer-motion";
import { lazy, Suspense, useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Spline = lazy(() => import("@splinetool/react-spline"));

const HeroSection = ({ introComplete }) => {
  const textRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    gsap.to(textRef.current, {
      y: -120,
      opacity: 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  }, []);

  return (
    <section id="home" className="h-screen bg-linear-to-b from-violet-900 to-black flex xl:flex-row flex-col-reverse items-center lg:px-24 px-10 relative overflow-hidden gap-8 xl:gap-0">
      {/* left section */}
      <div ref={textRef} className="z-40 xl:mb-0 mb-[10%] xl:w-1/2 shrink-0 max-w-xl xl:max-w-none xl:pr-8">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            delay: 1.3,
            duration: 1.5,
          }}
          data-cursor="text"
          className="font-heading text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] z-10 mb-6"
        >
          I Build Things
          <br />
          <span className="bg-linear-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
            for the Web.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            delay: 1.8,
            duration: 1.5,
          }}
          data-cursor="text"
          className="text-lg md:text-xl lg:text-xl text-gray-200 max-w-2xl"
        >
          Full-stack developer based in Egypt —
          <br />
          crafting fast, beautiful, and functional
          <br />
          web experiences that people remember.
        </motion.p>
      </div>

      {/* Right section */}
      <div className="flex-1 flex items-center justify-center w-full xl:w-1/2 h-full min-h-[400px] relative">
        {introComplete ? (
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center text-violet-500/30 font-mono text-sm">
                loading scene...
              </div>
            }
          >
            <Spline
              scene="https://prod.spline.design/Px1fdImyXiaIsixY/scene.splinecode"
              className="w-full h-full"
              style={{ width: "100%", height: "100%" }}
            />
          </Suspense>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-64 h-64 rounded-full bg-violet-900/20 blur-3xl animate-pulse" />
          </div>
        )}
      </div>

      {/* ── Scroll nudge ── */}
      <motion.div
        animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? 10 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 hidden xl:flex flex-col items-center gap-2 pointer-events-none"
      >
        {/* Rotated text — reads bottom-to-top */}
        <motion.span
          className="text-[10px] font-mono tracking-[0.3em] text-gray-500 uppercase"
          style={{ writingMode: "vertical-rl", rotate: "180deg" }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.6, ease: "easeOut" }}
        >
          scroll
        </motion.span>

        {/* Animated line + traveling dot */}
        <motion.div
          className="relative w-px h-16 bg-gray-800 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.4 }}
        >
          {/* Line fill */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-violet-500"
            initial={{ height: "0%" }}
            animate={{ height: "100%" }}
            transition={{ delay: 3.0, duration: 0.6, ease: "easeIn" }}
          />
          {/* Traveling dot */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-violet-400"
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
            transition={{
              top: {
                delay: 3.6,
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.4,
              },
              opacity: {
                delay: 3.6,
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.4,
              },
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
