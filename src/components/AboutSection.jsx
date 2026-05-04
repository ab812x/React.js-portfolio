// npm install gsap @gsap/react
import { motion } from "framer-motion";
import { FiDownload, FiArrowRight } from "react-icons/fi";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import useScrollTo from "../hooks/useScrollTo";

const skills = [
  { name: "CSS / HTML", level: 95, emoji: "🎨" },
  { name: "React.js", level: 90, emoji: "⚛️" },
  { name: "JavaScript", level: 88, emoji: "⚡" },
  { name: "Tailwind CSS", level: 85, emoji: "🌊" },
  { name: "Framer Motion", level: 82, emoji: "🎬" },
  { name: "Git", level: 80, emoji: "🔀" },
  { name: "Python", level: 75, emoji: "🐍" },
  { name: "Node.js", level: 70, emoji: "🟢" },
];

const stats = [
  { value: "3", label: "Certifications" },
  { value: "2+", label: "Years of Learning" },
  { value: "5+", label: "Projects Shipped" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
    },
  },
};

/* ── Profile Photo with layered card stack + animated gradient border ── */
const ProfilePhoto = () => {
  const photoRef = useRef(null);

  // GSAP parallax — photo drifts upward slower than surrounding text
  useGSAP(() => {
    if (!photoRef.current) return;

    gsap.to(photoRef.current, {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: photoRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.8,
      },
    });
  }, []);

  return (
    <motion.div
      ref={photoRef}
      initial={{ opacity: 0, y: 60, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 20,
        delay: 0.05,
      }}
      className="relative w-full flex justify-center lg:justify-start mb-10"
    >
      {/* Inline keyframes for the rotating gradient border */}
      <style>{`
        @keyframes borderSpin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-4px); }
        }
      `}</style>

      {/* ── Card stack container ── */}
      <div className="relative group" style={{ width: 260, height: 320 }}>
        {/* ─ Background card 3 (deepest) ─ */}
        <div
          className="absolute inset-0 rounded-2xl bg-purple-900/30 border border-purple-500/15 transition-all duration-700 ease-out group-hover:rotate-0 group-hover:translate-x-0 group-hover:translate-y-0"
          style={{
            transform: "rotate(6deg) translateX(12px) translateY(8px)",
          }}
        />

        {/* ─ Background card 2 (middle) ─ */}
        <div
          className="absolute inset-0 rounded-2xl bg-violet-900/40 border border-violet-500/20 transition-all duration-600 ease-out group-hover:rotate-0 group-hover:translate-x-0 group-hover:translate-y-0"
          style={{
            transform: "rotate(3deg) translateX(6px) translateY(4px)",
          }}
        />

        {/* ─ Main photo card ─ */}
        <div
          className="relative rounded-2xl overflow-hidden transition-all duration-500 ease-out group-hover:rotate-0"
          style={{
            width: 260,
            height: 320,
            transform: "rotate(-2deg)",
          }}
        >
          {/* ── Animated gradient border ── */}
          {/* Large spinning gradient behind the card, clipped by the inner container */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{ padding: 2 }}
          >
            <div
              className="absolute -inset-[50%] opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "conic-gradient(from 0deg, #7c3aed, #a78bfa, #c084fc, #7c3aed, #6d28d9, #a78bfa, #7c3aed)",
                animation: "borderSpin 4s linear infinite",
              }}
            />
            {/* Inner mask — creates the border effect */}
            <div className="absolute inset-[2px] rounded-[14px] bg-[#0a0a0a] z-[1]" />
          </div>

          {/* ── Photo image ── */}
          <div className="absolute inset-[3px] rounded-[13px] overflow-hidden z-[2]">
            <img
              src="/images/my-photo.png"
              alt="Abdullah Alaa — Full Stack Developer"
              className="w-full h-full object-cover transition-all duration-700 ease-out grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110"
              loading="eager"
            />

            {/* Violet overlay that fades on hover */}
            <div className="absolute inset-0 bg-violet-900/20 group-hover:bg-transparent transition-colors duration-700" />

            {/* Bottom gradient fade for depth */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent pointer-events-none" />
          </div>

          {/* ── Glow effect behind card — intensifies on hover ── */}
          <div className="absolute -inset-4 rounded-3xl bg-violet-600/10 blur-2xl group-hover:bg-violet-500/25 transition-all duration-700 -z-10" />
        </div>

        {/* ── Floating "Available" badge ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
          className="absolute -bottom-3 -right-3 z-30"
          style={{ animation: "floatBadge 3s ease-in-out infinite" }}
        >
          <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-900/90 border border-violet-500/30 backdrop-blur-md shadow-lg shadow-violet-900/20">
            {/* Pulse ring */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="text-[10px] font-semibold text-gray-300 tracking-wide whitespace-nowrap">
              Available for work
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const AboutSection = () => {
  const scrollTo = useScrollTo();
  const skillsRef = useRef(null);
  const headingRef = useRef(null);

  // GSAP skill cards entrance + bar fill
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Cards entrance
      gsap.fromTo(
        ".skill-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Bars fill
      const bars = skillsRef.current.querySelectorAll(".skill-bar-fill");
      bars.forEach((bar) => {
        const targetWidth = bar.getAttribute("data-width");
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: targetWidth,
            duration: 1.2,
            ease: "power1.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
              toggleActions: "play none none reset",
            },
          },
        );
      });
    }, skillsRef);

    return () => ctx.revert();
  }, []);

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
      },
    );
  }, []);

  return (
    <section
      id="about"
      className="relative py-24 lg:px-24 px-10 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-violet-700 rounded-full blur-3xl opacity-10 pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-[0.07] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 grid-cols-1 gap-16 items-start">
        {/* ─── LEFT COLUMN ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* ── Profile Photo — sits above everything ── */}
          <ProfilePhoto />

          {/* Badge + Heading — GSAP fade+scale on scroll entry */}
          <div ref={headingRef}>
            <motion.span
              variants={itemVariants}
              className="inline-block text-xs tracking-widest uppercase font-semibold text-violet-400 border border-violet-500/30 rounded-full px-4 py-1.5 mb-6"
            >
              About Me
            </motion.span>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight mb-8"
            >
              Crafting Digital{" "}
              <span className="bg-linear-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent">
                Experiences
              </span>{" "}
              That Matter
            </motion.h2>
          </div>

          {/* Paragraphs */}
          <motion.p
            variants={itemVariants}
            data-cursor="text"
            className="text-gray-400 text-lg leading-relaxed mb-4"
          >
            I'm a full-stack developer and engineering student based in Egypt,
            passionate about building fast, beautiful, and functional web
            applications.
          </motion.p>
          <motion.p
            variants={itemVariants}
            data-cursor="text"
            className="text-gray-400 text-lg leading-relaxed mb-10"
          >
            I specialize in React, modern CSS, and clean UI architecture —
            always chasing that perfect balance between performance and
            aesthetics.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-8 mb-10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block text-3xl lg:text-4xl font-bold bg-linear-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-sm text-gray-500 mt-1 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <a
              href="../../public/Abdullah_Alaa_Resume.pdf"
              download
              data-cursor="button"
              data-magnetic
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-linear-to-r from-violet-600 to-purple-400 hover:from-violet-500 hover:to-purple-300 transition-all duration-300 shadow-lg shadow-violet-700/25"
            >
              <FiDownload className="text-lg" />
              Download CV
            </a>
            <a
              role="button"
              onClick={() => scrollTo("projects")}
              data-cursor="button"
              data-magnetic
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-violet-400 border border-violet-500 hover:bg-violet-500/10 transition-all duration-300"
            >
              View Projects
              <FiArrowRight className="text-lg" />
            </a>
          </motion.div>
        </motion.div>

        {/* ─── RIGHT COLUMN — SKILLS GRID ─── */}
        <div ref={skillsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="skill-card bg-white/5 border border-violet-500/20 rounded-xl p-4 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">{skill.emoji}</span>
                <span className="text-sm font-medium text-gray-300">
                  {skill.name}
                </span>
                <span className="ml-auto text-xs text-violet-400 font-semibold">
                  {skill.level}%
                </span>
              </div>

              {/* Proficiency bar — GSAP triggered on viewport entry */}
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="skill-bar-fill h-full rounded-full bg-linear-to-r from-violet-600 to-purple-400"
                  data-width={`${skill.level}%`}
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />
    </section>
  );
};

export default AboutSection;
