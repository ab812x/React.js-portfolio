import { motion } from "framer-motion";

const SectionDivider = ({ flip = false }) => {
  return (
    <div className="relative w-full h-px overflow-hidden bg-transparent">
      {/* Static base line */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-violet-500/20 to-transparent" />

      {/* Traveling light */}
      <motion.div
        className="absolute top-0 h-full w-32 bg-linear-to-r from-transparent via-violet-400/60 to-transparent"
        initial={{ x: flip ? "100vw" : "-100vw" }}
        whileInView={{ x: flip ? "-100vw" : "100vw" }}
        viewport={{ once: false, margin: "0px" }}
        transition={{
          duration: 1.8,
          ease: "easeInOut",
          delay: 0.1,
        }}
      />
    </div>
  );
};

export default SectionDivider;
