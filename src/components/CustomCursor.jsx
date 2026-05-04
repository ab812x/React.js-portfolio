import useCursor from "../hooks/useCursor";
import { motion, AnimatePresence } from "framer-motion";

const CustomCursor = () => {
  const { dotRef, labelRef, label, visible, isTouch } = useCursor();

  if (isTouch) return null;

  return (
    <>
      {/* ── DOT ──────────────────────────────────────────── */}
      <div
        ref={dotRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         "12px",
          height:        "12px",
          borderRadius:  "50%",
          background:    "#ffffff",
          pointerEvents: "none",
          zIndex:        9999,
          opacity:       visible ? 1 : 0,
          transform:     "translate(-50%, -50%)",
          willChange:    "transform, opacity",
          transition:    "opacity 0.2s ease",
          // NO mixBlendMode — was causing visual glitches
        }}
      />

      {/* ── LABEL ────────────────────────────────────────── */}
      <div
        ref={labelRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          pointerEvents: "none",
          zIndex:        9999,
          willChange:    "transform",
        }}
      >
        <AnimatePresence mode="wait">
          {label && visible && (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 4,  scale: 0.9 }}
              animate={{ opacity: 1, y: 0,  scale: 1   }}
              exit={{    opacity: 0, y: -4, scale: 0.9 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              style={{
                display:        "block",
                fontFamily:     "'Fira Code', monospace",
                fontSize:       "10px",
                color:          "#c4b5fd",
                whiteSpace:     "nowrap",
                letterSpacing:  "0.02em",
                userSelect:     "none",
                textShadow:     "0 0 8px rgba(167,139,250,0.4)",
              }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CustomCursor;
