import { motion } from "framer-motion";
import { FiGithub, FiInstagram, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import useScrollTo from "../hooks/useScrollTo";
import ContactModal from "./ContactModal";

const NAV_ITEMS = ["Home", "About", "Projects", "Experience", "Contact"];
const SECTION_IDS = ["home", "about", "projects", "experience", "contact"];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const scrollTo = useScrollTo();

  const [contactFormOpen, setContactFormOpen] = useState(false);
  const openContactForm = () => setContactFormOpen(true);
  const closeContactForm = () => setContactFormOpen(false);

  // ── Sticky header: transparent at top, frosted after 50px ──
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Active section tracking via IntersectionObserver ──
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observers = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-violet-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            delay: 0.3,
            duration: 1.2,
          }}
          className="flex items-center"
        >
          <div className="h-12 w-12 flex items-center justify-center mr-3">
            <img
              src="/images/my-logo.png"
              alt="Abdullah Logo"
              className="h-12 w-12 object-contain"
            />
          </div>
          <span className="font-heading text-xl font-bold bg-linear-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
            Abdullah Alaa
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="lg:flex hidden space-x-8">
          {NAV_ITEMS.map((item, index) => {
            const sectionId = SECTION_IDS[index];
            const isActive = activeSection === sectionId;

            return (
              <motion.a
                key={item}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -20 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 25,
                  delay: 0.7 + index * 0.2,
                }}
                data-cursor="link"
                className={`relative font-medium transition-colors duration-300 cursor-pointer ${
                  isActive
                    ? "text-violet-400 font-semibold"
                    : "text-gray-200 hover:text-violet-400"
                }`}
                role="button"
                onClick={() => scrollTo(sectionId)}
              >
                {item}
                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300" />
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* Social Icons + Hire Me */}
        <div className="md:flex hidden items-center space-x-4">
          {[
            {
              href: "https://github.com/ab812x",
              icon: <FiGithub className="w-5 h-5" />,
            },
            {
              href: "https://www.linkedin.com/in/eng-abdullah-alaa-/",
              icon: <FiLinkedin className="w-5 h-5" />,
            },
            {
              href: "https://www.instagram.com/ab812x/",
              icon: <FiInstagram className="w-5 h-5" />,
            },
          ].map(({ href, icon }) => (
            <motion.a
              key={href}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              href={href}
              target="_blank"
              data-cursor="social"
              data-magnetic
              className="text-gray-300 hover:text-violet-400 transition-colors duration-300"
            >
              {icon}
            </motion.a>
          ))}
          <motion.button
            onClick={openContactForm}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1.6,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            data-cursor="button"
            data-magnetic
            className="ml-4 px-4 py-2 rounded-xl bg-linear-to-r from-gray-400 to-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white transition-all duration-500"
          >
            Hire Me
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button
            className="text-gray-300"
            onClick={toggleMenu}
            whileTap={{ scale: 0.7 }}
          >
            {isOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.5 }}
        className="md:hidden overflow-hidden bg-gray-900 px-4 py-5 space-y-5"
      >
        <nav className="flex flex-col space-y-3">
          {NAV_ITEMS.map((item, index) => {
            const sectionId = SECTION_IDS[index];
            const isActive = activeSection === sectionId;

            return (
              <a
                role="button"
                onClick={() => {
                  scrollTo(sectionId);
                  toggleMenu();
                }}
                key={item}
                className={`font-medium py-2 ${
                  isActive ? "text-violet-400" : "text-gray-300"
                }`}
              >
                {item}
              </a>
            );
          })}
        </nav>
        <div className="pt-4 border-t border-gray-700">
          <div className="flex space-x-5">
            <a
              href="https://github.com/ab812x"
              className="h-5 w-5 text-gray-300"
              target="_blank"
            >
              <FiGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/eng-abdullah-alaa-/"
              className="h-5 w-5 text-gray-300"
              target="_blank"
            >
              <FiLinkedin />
            </a>
            <a
              href="https://www.instagram.com/ab812x/"
              className="h-5 w-5 text-gray-300"
              target="_blank"
            >
              <FiInstagram />
            </a>
          </div>
          <button
            onClick={() => {
              toggleMenu();
              openContactForm();
            }}
            className="mt-4 w-full block px-4 py-2 rounded-lg bg-linear-to-r from-violet-600 to-violet-400 font-bold"
          >
            Contact Me
          </button>
        </div>
      </motion.div>

      {/* Contact Form Modal — rendered via portal into document.body */}
      <ContactModal isOpen={contactFormOpen} onClose={closeContactForm} />
    </header>
  );
};

export default Header;
