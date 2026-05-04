import { motion, useScroll, useTransform } from "framer-motion";

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();

  // Map scroll progress to percentage for dot positioning
  const dotLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  return (
    <>
      {/* Injected shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      {/* Bar container — sits just below the header */}
      <div className="fixed top-16 md:top-20 left-0 w-full z-40 h-[2px]">
        {/* Filled bar (scaleX driven by scroll) */}
        <motion.div
          className="h-full w-full origin-left"
          style={{
            scaleX: scrollYProgress,
            backgroundImage:
              "linear-gradient(to right, #7c3aed, #a855f7, #7c3aed)",
            backgroundSize: "200% auto",
            animation: "shimmer 3s linear infinite",
          }}
        />

        {/* Glow effect below the bar */}
        <motion.div
          className="absolute top-0 left-0 h-[4px] w-full origin-left"
          style={{
            scaleX: scrollYProgress,
            backgroundImage:
              "linear-gradient(to right, #7c3aed, #a855f7, #7c3aed)",
            backgroundSize: "200% auto",
            filter: "blur(4px)",
            opacity: 0.6,
          }}
        />

        <motion.div
          className="absolute -top-[2px] w-[6px] h-[6px] rounded-full bg-white"
          style={{
            left: dotLeft,
            translateX: "-50%",
            opacity: dotOpacity,
            boxShadow: "0 0 8px 2px rgba(139, 92, 246, 0.8)",
          }}
        />
      </div>
    </>
  );
};

export default ProgressBar;
