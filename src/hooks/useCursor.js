import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const LABEL_MAP = {
  button: "execute()",
  link: "GET()",
  project: "open()",
  social: "connect()",
  text: "read()",
};

const useCursor = () => {
  const dotRef = useRef(null);
  const labelRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const xTo = useRef(null);
  const yTo = useRef(null);
  // Track the currently magnetic element
  const magneticElRef = useRef(null);

  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    // Hide system cursor
    const styleEl = document.createElement("style");
    styleEl.id = "cursor-hide";
    styleEl.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(styleEl);

    // ── GSAP quickTo setup ────────────────────────────────
    xTo.current = gsap.quickTo(dotRef.current, "x", {
      duration: 0.1,
      ease: "power3.out",
    });
    yTo.current = gsap.quickTo(dotRef.current, "y", {
      duration: 0.1,
      ease: "power3.out",
    });

    // ── SINGLE MOUSEMOVE HANDLER ──────────────────────────
    // One handler does everything — position, magnetic, label follow
    // This eliminates the dual-listener conflict entirely
    const handleMouseMove = (e) => {
      const mx = e.clientX;
      const my = e.clientY;
      posRef.current = { x: mx, y: my };

      // Check if we're over a magnetic element
      const magneticEl = e.target.closest("[data-magnetic]");
      magneticElRef.current = magneticEl || null;

      if (magneticEl) {
        // Magnetic pull — interpolate toward element center
        const rect = magneticEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const strength = 0.25;
        const targetX = mx + (centerX - mx) * strength;
        const targetY = my + (centerY - my) * strength;

        // Use quickTo for magnetic too — no conflict
        xTo.current(targetX);
        yTo.current(targetY);

        if (labelRef.current) {
          gsap.set(labelRef.current, { x: targetX + 16, y: targetY - 8 });
        }
      } else {
        // Normal movement
        xTo.current(mx);
        yTo.current(my);

        if (labelRef.current) {
          gsap.set(labelRef.current, { x: mx + 16, y: my - 8 });
        }
      }

      setVisible(true);
    };

    // ── HOVER DETECTION via mouseover/mouseout ────────────
    const handleMouseOver = (e) => {
      // Label
      const cursorEl = e.target.closest("[data-cursor]");
      setLabel(
        cursorEl ? LABEL_MAP[cursorEl.getAttribute("data-cursor")] || "" : "",
      );

      // Scale up on interactive
      const isInteractive = e.target.closest(
        "a, button, [data-cursor], [data-magnetic]",
      );
      if (isInteractive) {
        gsap.to(dotRef.current, {
          scale: 1.6,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseOut = (e) => {
      // Only reset when truly leaving interactive area
      // Check relatedTarget to avoid firing on child element transitions
      const leavingInteractive = e.target.closest(
        "a, button, [data-cursor], [data-magnetic]",
      );
      const enteringInteractive = e.relatedTarget?.closest(
        "a, button, [data-cursor], [data-magnetic]",
      );

      if (leavingInteractive && !enteringInteractive) {
        setLabel("");
        gsap.to(dotRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    // ── VISIBILITY ────────────────────────────────────────
    const handleDocLeave = () => setVisible(false);
    const handleDocEnter = () => setVisible(true);

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleDocLeave);
    document.documentElement.addEventListener("mouseenter", handleDocEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleDocLeave,
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleDocEnter,
      );
      document.getElementById("cursor-hide")?.remove();
      gsap.killTweensOf(dotRef.current);
    };
  }, []);

  return { dotRef, labelRef, label, visible, isTouch };
};

export default useCursor;
