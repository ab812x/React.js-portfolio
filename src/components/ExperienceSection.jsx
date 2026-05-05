// npm install gsap @gsap/react
import { motion } from "framer-motion";
import { useRef } from "react";
import {
  FiBook,
  FiBriefcase,
  FiBookOpen,
  FiAward,
  FiExternalLink,
  FiPlus,
} from "react-icons/fi";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── Animation variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 },
  },
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { type: "spring", stiffness: 50, damping: 20 },
  },
};

/* ── Data ── */
const education = [
  {
    icon: FiBookOpen,
    institution: "Zagazig University",
    degree: "Faculty of Engineering",
    duration: "2022 — Present",
    status: { label: "Currently Enrolled", color: "green" },
    description:
      "Pursuing an engineering degree while actively self-studying full-stack web development and building real-world projects in parallel.",
    tags: [],
    credential: null,
  },
  {
    icon: FiAward,
    institution: "Codecademy",
    degree: "Full-Stack Engineer Career Path",
    duration: "~1 Year • Issued Jan 2026",
    status: null,
    description:
      "A comprehensive full-stack curriculum covering frontend, backend, and everything in between.",
    tags: [
      "Redux.js",
      "REST APIs",
      "HTML",
      "CSS",
      "React.js",
      "Problem Solving",
      "Express.js",
      "Node.js",
      "Bootstrap",
      "JavaScript",
    ],
    credential:
      "https://www.codecademy.com/profiles/ab812x/certificates/ffd0f42cce1a44e9a0108b365047a0a6",
  },
  {
    icon: FiAward,
    institution: "National Telecommunication Institute (NTI)",
    degree: "MEAN-Stack Web Development",
    duration: "1 Month • Issued Sep 2025",
    status: null,
    description:
      "An intensive one-month bootcamp covering the full MEAN stack with hands-on project work.",
    tags: [
      "Redux.js",
      "REST APIs",
      "HTML",
      "CSS",
      "React.js",
      "Problem Solving",
      "AngularJS",
      "Express.js",
      "Angular",
      "Node.js",
      "MongoDB",
      "Bootstrap",
      "Swagger API",
      "JavaScript",
    ],
    credential: "https://www.linkedin.com/posts/eng-abdullah-alaa-_my-official-certificate-ugcPost-7373929625812353025-2nZJ?utm_source=share&utm_medium=member_desktop&rcm=ACoAABt4JzQBvSse-kvOMz06go7gsimhTI2tU7Y",
  },
];

const experience = [
  {
    icon: FiBriefcase,
    company: "Digital Egypt Pioneers Initiative (DEPI)",
    role: "React Frontend Web Developer",
    track: "Software Development Track",
    duration: "2025 — July 2026",
    status: { label: "In Progress", color: "violet" },
    description:
      "Selected for Egypt's national digital upskilling program. Specializing in React frontend development with a comprehensive curriculum covering modern web essentials and professional tooling.",
    highlights: [
      "React + TypeScript application development",
      "Version control with Git & GitHub",
      "Backend integration with NodeJS + Express",
      "Containerization basics with Docker & Kubernetes",
      "Capstone project: full React + NodeJS real-world web app",
    ],
    tags: [
      "React",
      "TypeScript",
      "JavaScript",
      "NodeJS",
      "Express",
      "Docker",
      "Git",
      "Bootstrap",
      "UX/UI Principles",
    ],
  },
];

/* ── Reusable tag pill ── */
const Tag = ({ children }) => (
  <span className="text-xs px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 whitespace-nowrap">
    {children}
  </span>
);

/* ── Status badge ── */
const StatusBadge = ({ label, color }) => {
  const dotColor = color === "green" ? "bg-green-400" : "bg-violet-400";
  const textColor = color === "green" ? "text-green-400" : "text-violet-400";
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs ${textColor}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
      {label}
    </span>
  );
};

/* ── Timeline connector ── */
const TimelineConnector = () => (
  <motion.div
    variants={lineVariants}
    className="w-px h-8 bg-violet-500/30 mx-auto origin-top"
  />
);

/* ── Education card ── */
const EducationCard = ({ entry }) => {
  const Icon = entry.icon;
  return (
    <motion.div
      variants={itemVariants}
      className="rounded-2xl bg-gray-900 border border-violet-500/20 p-6"
    >
      {/* Header row */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0">
          <Icon className="text-violet-400 text-lg" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-heading text-white font-semibold">
              {entry.institution}
            </h3>
            <span className="text-gray-500 text-sm whitespace-nowrap">
              {entry.duration}
            </span>
          </div>
          <p className="text-gray-300 text-sm mt-0.5">{entry.degree}</p>
          {entry.status && (
            <div className="mt-1.5">
              <StatusBadge
                label={entry.status.label}
                color={entry.status.color}
              />
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mt-4 leading-relaxed">
        {entry.description}
      </p>

      {/* Tags */}
      {entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {entry.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}

      {/* Credential button */}
      {entry.credential && (
        <a
          href={entry.credential}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg text-sm font-semibold text-violet-400 border border-violet-500 hover:bg-violet-500/10 transition-all duration-300"
        >
          Show Credential
          <FiExternalLink className="text-sm" />
        </a>
      )}
    </motion.div>
  );
};

/* ── Experience card ── */
const ExperienceCard = ({ entry }) => {
  const Icon = entry.icon;
  return (
    <motion.div
      variants={itemVariants}
      className="rounded-2xl bg-gray-900 border border-violet-500/20 p-6"
    >
      {/* Header row */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0">
          <Icon className="text-violet-400 text-lg" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-heading text-white font-semibold">
              {entry.company}
            </h3>
            <span className="text-gray-500 text-sm whitespace-nowrap">
              {entry.duration}
            </span>
          </div>
          <p className="text-gray-300 text-sm mt-0.5">{entry.role}</p>
          <p className="text-gray-500 text-xs mt-0.5">{entry.track}</p>
          {entry.status && (
            <div className="mt-1.5">
              <StatusBadge
                label={entry.status.label}
                color={entry.status.color}
              />
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mt-4 leading-relaxed">
        {entry.description}
      </p>

      {/* Highlights */}
      {entry.highlights && (
        <ul className="mt-3 space-y-1.5">
          {entry.highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-gray-400 text-sm"
            >
              <span className="text-violet-500 mt-1.5 w-1 h-1 rounded-full bg-violet-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* Tags */}
      {entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {entry.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
    </motion.div>
  );
};

/* ── Placeholder card ── */
const PlaceholderCard = () => (
  <div className="rounded-2xl bg-gray-900 border border-dashed border-violet-500/20 p-8 flex flex-col items-center justify-center gap-3">
    <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center">
      <FiPlus className="text-violet-500/60 text-lg" />
    </div>
    <p className="text-gray-600 text-sm">More experience coming soon...</p>
  </div>
);

/* ══════════════════════════════════════════════════════════ */
/*  ExperienceSection                                        */
/* ══════════════════════════════════════════════════════════ */
const ExperienceSection = () => {
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
      },
    );
  }, []);

  return (
    <section
      id="experience"
      className="relative py-24 lg:px-24 px-10 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-violet-800 rounded-full blur-3xl opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Section header ── */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block text-xs tracking-widest uppercase font-semibold text-violet-400 border border-violet-500/30 rounded-full px-4 py-1.5 mb-6">
            My Journey
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4">
            Education &{" "}
            <span className="bg-linear-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The path that shaped my skills and perspective as a developer.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-[1fr_1px_1fr] grid-cols-1 gap-10 lg:gap-0">
          {/* ── LEFT COLUMN — Education ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:pr-10"
          >
            {/* Column label */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 mb-6"
            >
              <FiBook className="text-violet-400" />
              <span className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                Education
              </span>
            </motion.div>

            {education.map((entry, i) => (
              <div key={entry.institution}>
                <EducationCard entry={entry} />
                {i < education.length - 1 && <TimelineConnector />}
              </div>
            ))}
          </motion.div>

          {/* ── Vertical divider (desktop only) ── */}
          <div className="hidden lg:block w-px bg-linear-to-b from-transparent via-violet-500/40 to-transparent" />

          {/* ── RIGHT COLUMN — Experience ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:pl-10"
          >
            {/* Column label */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 mb-6"
            >
              <FiBriefcase className="text-violet-400" />
              <span className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                Experience
              </span>
            </motion.div>

            {experience.map((entry, i) => (
              <div key={entry.company}>
                <ExperienceCard entry={entry} />
                {i < experience.length - 1 && <TimelineConnector />}
              </div>
            ))}

            <PlaceholderCard />
          </motion.div>
        </div>
      </div>

      {/* Subtle divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />
    </section>
  );
};

export default ExperienceSection;
