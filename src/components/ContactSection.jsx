// npm install gsap @gsap/react
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── JSON data for the terminal panel ── */
const JSON_LINES = [
  { text: "{", type: "bracket" },
  {
    key: '"status"',
    value: "200",
    valueType: "number",
    trailing: ",",
  },
  {
    key: '"availability"',
    value: '"open for opportunities"',
    valueType: "string",
    trailing: ",",
  },
  {
    key: '"location"',
    value: '"Zagazig, Egypt"',
    valueType: "string",
    trailing: ",",
  },
  {
    key: '"email"',
    value: '"abdala.aa51511@gmail.com"',
    valueType: "string",
    trailing: ",",
  },
  {
    key: '"response_time"',
    value: '"within 24 hours"',
    valueType: "string",
    trailing: ",",
  },
  {
    key: '"social"',
    value: "{",
    valueType: "bracket",
    trailing: "",
  },
  {
    key: '"github"',
    value: '"github.com/ab812x"',
    valueType: "string",
    trailing: ",",
    indent: 2,
    href: "https://github.com/ab812x",
  },
  {
    key: '"linkedin"',
    value: '"linkedin.com/in/eng-abdullah-alaa-"',
    valueType: "string",
    trailing: ",",
    indent: 2,
    href: "https://www.linkedin.com/in/eng-abdullah-alaa-/",
  },
  {
    key: '"instagram"',
    value: '"instagram.com/ab812x"',
    valueType: "string",
    trailing: "",
    indent: 2,
    href: "https://www.instagram.com/ab812x/",
  },
  { text: "  },", type: "bracket" },
  {
    key: '"stack"',
    value: '["React", "Node.js", "Express.js", "Tailwind CSS","MongoDB"]',
    valueType: "string",
    trailing: ",",
  },
  {
    key: '"freelance"',
    value: "true",
    valueType: "boolean",
    trailing: "",
  },
  { text: "}", type: "bracket" },
];

/* ── Terminal JSON Panel ── */
const TerminalPanel = () => {
  const ref = useRef(null);
  const timersRef = useRef([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // START animation sequence
          const t1 = setTimeout(() => setShowPrompt(true), 200);
          timersRef.current.push(t1);

          JSON_LINES.forEach((_, i) => {
            const t = setTimeout(() => setVisibleLines(i + 1), 600 + i * 90);
            timersRef.current.push(t);
          });

          const tCursor = setTimeout(
            () => setShowCursor(true),
            600 + JSON_LINES.length * 90 + 200,
          );
          timersRef.current.push(tCursor);
        } else {
          // RESET everything on leave
          timersRef.current.forEach(clearTimeout);
          timersRef.current = [];
          setShowPrompt(false);
          setVisibleLines(0);
          setShowCursor(false);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const valueColor = (type) => {
    if (type === "string") return "text-green-400";
    if (type === "number" || type === "boolean") return "text-yellow-400";
    if (type === "bracket") return "text-gray-500";
    return "text-gray-400";
  };

  return (
    <div
      ref={ref}
      className="bg-gray-950 rounded-2xl border border-violet-500/20 overflow-hidden font-mono text-sm h-fit"
    >
      {/* Window chrome */}
      <div className="bg-gray-900 px-4 py-3 flex items-center gap-3">
        <div className="flex gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: "#ff5f57" }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: "#febc2e" }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: "#28c840" }}
          />
        </div>
        <span className="text-gray-500 text-xs">abdullah@portfolio:~</span>
      </div>

      {/* Terminal body */}
      <div className="px-6 py-5 space-y-0 leading-relaxed">
        {/* Prompt line */}
        <div
          className="transition-opacity duration-300"
          style={{ opacity: showPrompt ? 1 : 0 }}
        >
          <span className="text-violet-400">❯</span>
          <span className="text-gray-400"> curl </span>
          <span className="text-green-400">api.abdullah.dev/contact</span>
        </div>

        {/* Blank line */}
        {showPrompt && <div className="h-3" />}

        {/* JSON lines */}
        {JSON_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className="whitespace-pre animate-[fadeSlideIn_0.15s_ease_forwards]"
            style={{
              opacity: 0,
              animation: "fadeSlideIn 0.15s ease forwards",
            }}
          >
            {line.type === "bracket" ? (
              <span className="text-gray-500">{line.text}</span>
            ) : (
              <>
                <span className="text-gray-500">
                  {line.indent ? "    " : "  "}
                </span>
                <span className="text-violet-300">{line.key}</span>
                <span className="text-gray-500">: </span>
                {line.href ? (
                  <a
                    href={line.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="social"
                    className={`${valueColor(line.valueType)} hover:text-white hover:underline transition-colors`}
                  >
                    {line.value}
                  </a>
                ) : (
                  <span className={valueColor(line.valueType)}>
                    {line.value}
                  </span>
                )}
                <span className="text-gray-500">{line.trailing}</span>
              </>
            )}
          </div>
        ))}

        {/* Blinking cursor */}
        {showCursor && (
          <div className="mt-2">
            <span className="text-violet-400">❯</span>
            <span className="animate-pulse text-violet-400 ml-1">█</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════ */
/*  ContactSection                                           */
/* ══════════════════════════════════════════════════════════ */
const ContactSection = () => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // "success" | "error" | null
  const headingRef = useRef(null);

  // Heading fade+scale on scroll entry
  useGSAP(() => {
    gsap.fromTo(
      headingRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.96,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitStatus(null);

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_PUBLIC_KEY,
      )
      .then(() => {
        setSubmitStatus("success");
        formRef.current.reset();
        setTimeout(() => setSubmitStatus(null), 4000);
      })
      .catch(() => {
        setSubmitStatus("error");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  /* Shared input class — dark theme blend */
  const inputClasses =
    "w-full px-4 py-2 border border-gray-600 rounded-lg " +
    "focus:ring-2 focus:ring-violet-500 focus:border-violet-500 " +
    "focus:outline-none bg-gray-800/60 text-white placeholder-gray-500 " +
    "transition-all duration-300";

  return (
    <section
      id="contact"
      className="relative py-24 lg:px-24 px-10 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Inline keyframe for JSON line fade-in */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Background glow */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-800 rounded-full blur-3xl opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Section header ── */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block text-xs tracking-widest uppercase font-semibold text-violet-400 border border-violet-500/30 rounded-full px-4 py-1.5 mb-6">
            Contact
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4">
            Let's Build Something{" "}
            <span className="bg-linear-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Open for freelance work, collaborations, and interesting
            opportunities.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-[1fr_1px_1fr] grid-cols-1 gap-12 lg:gap-0 items-start">
          {/* ── LEFT — Contact Form (matches Header.jsx) ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="lg:pr-12"
          >
            <div className="bg-gray-900/40 rounded-2xl border border-violet-500/10 hover:border-violet-500/20 transition-all duration-500 p-8">
              <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="user_name"
                    placeholder="Your Name"
                    required
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="user_email"
                    placeholder="Your Email"
                    required
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    rows="4"
                    id="contact-message"
                    name="message"
                    placeholder="How can I help you?"
                    required
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                {/* Status messages */}
                {submitStatus === "success" && (
                  <p className="text-green-400 text-sm text-center">
                    ✅ Message sent successfully!
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-400 text-sm text-center">
                    ❌ Something went wrong. Please try again.
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={isSending}
                  data-cursor="button"
                  data-magnetic
                  whileHover={{ scale: isSending ? 1 : 1.02 }}
                  whileTap={{ scale: isSending ? 1 : 0.97 }}
                  className="w-full px-4 py-2 bg-linear-to-r from-violet-600 to-violet-400 hover:from-violet-700 hover:to-purple-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:shadow-violet-600/50 disabled:opacity-60 disabled:cursor-not-allowed font-semibold text-white"
                >
                  {isSending ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* ── Vertical divider (desktop only) ── */}
          <div className="hidden lg:block w-px bg-linear-to-b from-transparent via-violet-500/40 to-transparent" />

          {/* ── RIGHT — Terminal JSON Panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.2,
            }}
            className="lg:pl-12"
          >
            <TerminalPanel />
          </motion.div>
        </div>
      </div>

      {/* Subtle divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />
    </section>
  );
};

export default ContactSection;
