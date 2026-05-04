import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram, FiArrowUp } from "react-icons/fi";

/* ── Easter egg help lines ── */
const HELP_LINES = [
  { type: "prompt", text: "❯ help" },
  { type: "blank" },
  { type: "label", text: "Available commands:" },
  { cmd: "whoami", value: '"Abdullah Alaa — Full Stack Dev"' },
  { cmd: "skills", value: '"React, Node, Python, Tailwind..."' },
  { cmd: "contact", value: '"Scroll up and say hello :)"' },
  { cmd: "sudo hire me", value: '"Wise choice. Let\'s talk."' },
  { cmd: "exit", value: "closes this terminal", isExit: true },
];

/* ── Easter Egg Terminal ── */
const EasterEggTerminal = ({ onClose }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const timersRef = useRef([]);

  useEffect(() => {
    HELP_LINES.forEach((_, i) => {
      const t = setTimeout(() => setVisibleLines(i + 1), i * 80);
      timersRef.current.push(t);
    });

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="absolute bottom-full right-0 mb-3 bg-gray-950 border border-violet-500/30 rounded-xl p-4 font-mono text-xs w-72 shadow-xl shadow-violet-900/20 z-50"
    >
      {HELP_LINES.slice(0, visibleLines).map((line, i) => {
        if (line.type === "blank") return <div key={i} className="h-2" />;
        if (line.type === "prompt")
          return (
            <div key={i} className="text-gray-400">
              {line.text}
            </div>
          );
        if (line.type === "label")
          return (
            <div key={i} className="text-gray-500 mt-1 mb-1">
              {line.text}
            </div>
          );
        return (
          <div key={i} className="flex gap-2 leading-relaxed">
            <span className="text-gray-500">→</span>
            {line.isExit ? (
              <button
                onClick={onClose}
                data-cursor="button"
                className="text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
              >
                {line.cmd}
              </button>
            ) : (
              <span className="text-violet-400">{line.cmd}</span>
            )}
            <span className="text-green-400">{line.value}</span>
          </div>
        );
      })}
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════ */
/*  Footer                                                    */
/* ══════════════════════════════════════════════════════════ */
const Footer = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const bufferRef = useRef("");

  /* ── Keyboard listener for easter egg ── */
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Escape to close
      if (e.key === "Escape") {
        setTerminalOpen(false);
        return;
      }

      // "F" key opens terminal
      if (e.key === "f" || e.key === "F") {
        // Don't trigger if user is typing in an input/textarea
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
          return;
        setTerminalOpen((prev) => !prev);
        return;
      }

      // Track typed chars for "help"
      if (e.key.length === 1) {
        bufferRef.current += e.key.toLowerCase();
        // Keep only last 4 chars
        if (bufferRef.current.length > 4) {
          bufferRef.current = bufferRef.current.slice(-4);
        }
        if (bufferRef.current === "help") {
          setTerminalOpen(true);
          bufferRef.current = "";
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    { href: "https://github.com/ab812x", icon: FiGithub },
    {
      href: "https://www.linkedin.com/in/eng-abdullah-alaa-/",
      icon: FiLinkedin,
    },
    { href: "https://www.instagram.com/ab812x/", icon: FiInstagram },
  ];

  const techBadges = [
    "React",
    "Framer Motion",
    "Tailwind CSS v4",
    "Spline",
    "GSAP",
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
      className="bg-gray-950 border-t border-violet-500/10 py-8 lg:px-24 px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── ROW 1 — Status + Scroll to top ── */}
        <div className="flex justify-between items-center border-b border-violet-500/10 pb-6 mb-6">
          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-xs text-gray-500">
              status: available for work
            </span>
          </div>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            data-cursor="button"
            data-magnetic
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full border border-violet-500/30 bg-gray-900 flex items-center justify-center text-violet-400 hover:border-violet-400 transition-colors duration-300 cursor-pointer"
          >
            <FiArrowUp className="w-4 h-4" />
          </motion.button>
        </div>

        {/* ── ROW 2 — Logo / Socials / Copyright ── */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          {/* Logo + name */}
          <div className="flex items-center gap-2">
            <img
              src="/images/my-logo.png"
              alt="Abdullah Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="font-heading text-sm font-bold bg-linear-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
              Abdullah Alaa
            </span>
          </div>

          {/* Social icons */}
          <div className="flex gap-5">
            {socials.map(({ href, icon: Icon }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="social"
                data-magnetic
                whileHover={{ scale: 1.15 }}
                className="text-gray-500 hover:text-violet-400 transition-colors duration-300"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <span className="text-gray-600 text-xs font-mono">
            © 2026 Abdullah Alaa. All rights reserved.
          </span>
        </div>

        {/* ── ROW 3 — Built with + Easter egg ── */}
        <div className="flex justify-between items-center border-t border-violet-500/10 pt-6 mt-6">
          {/* Built with badges */}
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-gray-600 text-xs mr-1">built with</span>
            {techBadges.map((badge) => (
              <span
                key={badge}
                className="text-xs font-mono px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Easter egg trigger */}
          <div className="relative">
            <AnimatePresence>
              {terminalOpen && (
                <EasterEggTerminal onClose={() => setTerminalOpen(false)} />
              )}
            </AnimatePresence>
            <button
              onClick={() => setTerminalOpen((prev) => !prev)}
              className="text-gray-700 text-xs font-mono hover:text-gray-500 transition-colors cursor-pointer"
            >
              press F or type &apos;help&apos;
            </button>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
