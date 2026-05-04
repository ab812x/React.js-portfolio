import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CUSTOM_EASE = [0.76, 0, 0.24, 1];

const IntroAnimation = ({ onComplete }) => {
  // To replay during development: open DevTools → Application
  // → Session Storage → delete the "introSeen" key and refresh.
  const hasSeenIntro = sessionStorage.getItem("introSeen");

  const [phase, setPhase] = useState(hasSeenIntro ? "done" : "enter");
  // "enter" → line draws + name reveals
  // "exit"  → panels split apart
  // "done"  → component unmounts

  // Lock scroll during intro
  useEffect(() => {
    if (phase === "done") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  // Sequence: enter → hold → exit
  useEffect(() => {
    if (phase === "done") return;
    const holdTimer = setTimeout(() => setPhase("exit"), 2000);
    return () => clearTimeout(holdTimer);
  }, []);

  // If already seen, fire onComplete immediately
  useEffect(() => {
    if (hasSeenIntro) onComplete();
  }, []);

  const handleExitComplete = () => {
    sessionStorage.setItem("introSeen", "true");
    document.body.style.overflow = "";
    setPhase("done");
    onComplete();
  };

  if (phase === "done") return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {phase !== "done" && (
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-[99999] pointer-events-auto"
        >
          {/* ── Top panel ── */}
          <motion.div
            className="fixed top-0 left-0 w-full h-[51%] bg-black z-[99999]"
            initial={{ y: "0%" }}
            animate={{ y: phase === "exit" ? "-100%" : "0%" }}
            transition={{
              duration: 0.6,
              ease: CUSTOM_EASE,
            }}
          />

          {/* ── Bottom panel ── */}
          <motion.div
            className="fixed bottom-0 left-0 w-full h-[51%] bg-black z-[99999]"
            initial={{ y: "0%" }}
            animate={{ y: phase === "exit" ? "100%" : "0%" }}
            transition={{
              duration: 0.6,
              ease: CUSTOM_EASE,
            }}
            onAnimationComplete={() => {
              if (phase === "exit") handleExitComplete();
            }}
          />

          {/* ── Center content ── */}
          <motion.div
            className="fixed inset-0 z-[100000] flex flex-col items-center justify-center gap-4"
            animate={{
              opacity: phase === "exit" ? 0 : 1,
              scale: phase === "exit" ? 0.95 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Violet line — two halves drawing outward from center */}
            <div className="flex items-center">
              {/* Left half */}
              <motion.div
                className="h-px w-32 bg-violet-500 origin-right"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              {/* Right half */}
              <motion.div
                className="h-px w-32 bg-violet-500 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            {/* Name reveal — clip-path wipe from left */}
            <motion.h1
              className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tight select-none"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{
                duration: 0.6,
                ease: CUSTOM_EASE,
                delay: 0.3,
              }}
            >
              Abdullah Alaa
            </motion.h1>

            {/* Subtitle fade-in */}
            <motion.span
              className="font-mono text-sm text-violet-400 select-none"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              {"< portfolio />"}
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
