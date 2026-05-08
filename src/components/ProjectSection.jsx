// npm install gsap @gsap/react
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiCode } from "react-icons/fi";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    name: "React Portfolio",
    description:
      "An award-quality personal developer portfolio featuring a cinematic intro sequence, interactive 3D Spline hero, GSAP-powered scroll animations, a custom magnetic cursor, a filterable project grid, and a terminal-style contact panel — all wrapped in a dark violet design system.",
    tags: ["React 19", "Tailwind CSS v4", "Framer Motion", "GSAP", "Spline", "EmailJS"],
    category: "React",
    github: "https://github.com/ab812x/React.js-portfolio",
    live: null,
    image: "/images/react-portfolio.png",
    featured: true,
  },
  {
    name: "Jammming",
    description:
      "A Spotify-integrated playlist builder that uses OAuth 2.0 to search the Spotify library, retrieve track metadata, and lets users dynamically build and save custom playlists — all driven by React hooks.",
    tags: ["React v18", "Spotify Web API", "OAuth 2.0", "CSS Modules"],
    category: "React",
    github: "https://github.com/ab812x/jammming",
    live: "https://jammming-ab812x.netlify.app/",
    image: "/images/jamming.png",
    featured: false,
  },
  {
    name: "Old Portfolio Website",
    description:
      "A responsive personal portfolio built with a mobile-first approach, featuring glassmorphism navigation, a functional mobile menu, and a CSS-only marquee for showcasing skills.",
    tags: ["HTML5", "Tailwind CSS", "JavaScript"],
    category: "Frontend",
    github: "https://github.com/ab812x/portfolio",
    live: "https://ab812x.github.io/portfolio/",
    image: "/images/old-Portfolio.png",
    featured: false,
  },
  // TODO: Add terminal screenshot — run `node script.js` in the
  // repo, screenshot the terminal output, save as
  // public/images/mixedMessages.png
  {
    name: "Mixed Messages",
    description:
      "A lightweight Node.js CLI tool that algorithmically generates unique random messages by combining elements from distinct data arrays.",
    tags: ["JavaScript", "Node.js"],
    category: "JavaScript",
    github: "https://github.com/ab812x/mixedMessages",
    live: null,
    image: "/images/mixedMessages.png",
    featured: false,
  },
];

const filters = ["All", "Frontend", "React", "JavaScript"];

/* ── Placeholder image for projects without a screenshot ── */
const ImagePlaceholder = ({ name }) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="relative w-full h-full min-h-[200px] bg-gray-800 flex items-center justify-center overflow-hidden">
      {/* violet gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-violet-900/30 to-transparent" />
      {/* faint grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(139,92,246,0.3) 39px, rgba(139,92,246,0.3) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(139,92,246,0.3) 39px, rgba(139,92,246,0.3) 40px)",
        }}
      />
      {/* centred icon + initials */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-violet-400/60">
        <FiCode className="text-4xl" />
        <span className="text-lg font-bold tracking-widest uppercase">
          {initials}
        </span>
      </div>
    </div>
  );
};

/* ── Tag pill reused across cards ── */
const Tag = ({ children }) => (
  <span className="text-xs px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 whitespace-nowrap">
    {children}
  </span>
);

/* ── Featured project card ── */
const FeaturedCard = ({ project }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ type: "spring", stiffness: 50, damping: 20 }}
    data-cursor="project"
    className="rounded-2xl bg-gray-900 border border-violet-500/20 overflow-hidden grid lg:grid-cols-5 grid-cols-1 mb-14"
  >
    {/* ── Details (left 60%) ── */}
    <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-center order-2 lg:order-1">
      <span className="text-xs tracking-widest uppercase font-semibold text-violet-400 mb-3">
        Featured Project
      </span>
      <h3 className="font-heading text-3xl font-bold mb-4">{project.name}</h3>
      <p className="text-gray-400 leading-relaxed mb-6">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            data-magnetic
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white bg-linear-to-r from-violet-600 to-purple-400 hover:from-violet-500 hover:to-purple-300 transition-all duration-300 shadow-lg shadow-violet-700/25"
          >
            <FiExternalLink />
            Live Demo
          </a>
        )}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="social"
          data-magnetic
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-violet-400 border border-violet-500 hover:bg-violet-500/10 transition-all duration-300"
        >
          <FiGithub />
          GitHub
        </a>
      </div>
    </div>

    {/* ── Image (right 40%) ── */}
    <div className="lg:col-span-2 order-1 lg:order-2">
      {/* TODO: Replace with actual project screenshot */}
      {project.image ? (
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width="800"
          height="600"
        />
      ) : (
        <ImagePlaceholder name={project.name} />
      )}
    </div>
  </motion.div>
);

/* ── Regular project card ── */
const ProjectCard = ({ project }) => (
  <div
    data-cursor="project"
    className="project-card group rounded-2xl bg-gray-900 border border-violet-500/20 overflow-hidden flex flex-col hover:border-violet-500/60 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.15)] transition-all duration-300 hover:scale-[1.02]"
  >
    {/* ── Image area ── */}
    <div className="h-48 overflow-hidden">
      {/* TODO: Replace with actual project screenshot */}
      {project.image ? (
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
          width="800"
          height="600"
        />
      ) : (
        <ImagePlaceholder name={project.name} />
      )}
    </div>

    {/* ── Body ── */}
    <div className="p-6 flex flex-col flex-1">
      <span className="inline-block w-fit text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full bg-linear-to-r from-violet-600/20 to-purple-400/20 text-violet-300 border border-violet-500/20 mb-3">
        {project.category}
      </span>
      <h3 className="font-heading text-xl font-bold mb-2">{project.name}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
        {project.description}
      </p>

      {/* ── Tags + links footer ── */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-violet-500/10">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="social"
          className="text-gray-400 hover:text-violet-400 transition-colors"
          aria-label={`${project.name} GitHub`}
        >
          <FiGithub className="text-xl" />
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="text-gray-400 hover:text-violet-400 transition-colors"
            aria-label={`${project.name} live demo`}
          >
            <FiExternalLink className="text-xl" />
          </a>
        )}
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════ */
/*  ProjectSection                                           */
/* ══════════════════════════════════════════════════════════ */
const ProjectSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const gridRef = useRef(null);
  const headingRef = useRef(null);
  const hasInitialRevealRef = useRef(false);

  const featured = projects.find((p) => p.featured);
  const regular = projects.filter((p) => !p.featured);

  const filteredRegular =
    activeFilter === "All"
      ? regular
      : regular.filter((p) => p.category === activeFilter);

  // Show featured only when its category matches the active filter (or "All")
  const showFeatured =
    activeFilter === "All" || featured?.category === activeFilter;

  // GSAP stagger cards — ScrollTrigger on first load, immediate on filter change
  useGSAP(() => {
    if (!gridRef.current) return;

    // Kill stale ScrollTrigger instances and tweens on the grid
    ScrollTrigger.getAll()
      .filter((st) => st.trigger === gridRef.current)
      .forEach((st) => st.kill());
    gsap.killTweensOf(gridRef.current.querySelectorAll(".project-card"));

    // Defer to next frame so React has painted the new filtered cards
    const frameId = requestAnimationFrame(() => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".project-card");
      if (!cards.length) return;

      // Reset cards to invisible
      gsap.set(cards, { opacity: 0, y: 60 });

      if (!hasInitialRevealRef.current) {
        // First load — use ScrollTrigger for scroll-reveal
        hasInitialRevealRef.current = true;
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
          overwrite: true,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      } else {
        // Filter change — user is already at the section,
        // always animate immediately (no ScrollTrigger)
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          overwrite: true,
        });
      }
    });

    // Cleanup: cancel pending frame if dependencies change before it fires
    return () => cancelAnimationFrame(frameId);
  }, { dependencies: [activeFilter] });



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
      id="projects"
      className="relative py-24 lg:px-24 px-10 bg-gray-950 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-800 rounded-full blur-3xl opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Section header ── */}
        <div ref={headingRef} className="text-center mb-14">
          <span className="inline-block text-xs tracking-widest uppercase font-semibold text-violet-400 border border-violet-500/30 rounded-full px-4 py-1.5 mb-6">
            My Work
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4">
            Projects That{" "}
            <span className="bg-linear-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent">
              Speak
            </span>{" "}
            For Themselves
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A selection of things I've built — from real-world tools to passion
            projects.
          </p>
        </div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            delay: 0.15,
          }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              data-cursor="button"
              className={`relative z-10 px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${
                activeFilter === filter
                  ? "text-white"
                  : "text-gray-400 border border-violet-500/30 hover:text-violet-300 hover:border-violet-500/50"
              }`}
            >
              {activeFilter === filter && (
                <motion.span
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-full bg-linear-to-r from-violet-600 to-purple-400 -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {filter}
            </button>
          ))}
        </motion.div>

        {/* ── Featured project ── */}
        <AnimatePresence mode="wait">
          {showFeatured && featured && (
            <motion.div
              key="featured"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <FeaturedCard project={featured} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Project grid — GSAP stagger ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredRegular.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>

        {/* Empty state */}
        {!showFeatured && filteredRegular.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 py-16 text-lg"
          >
            No projects in this category yet — stay tuned.
          </motion.p>
        )}
      </div>

      {/* Subtle divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />
    </section>
  );
};

export default ProjectSection;
