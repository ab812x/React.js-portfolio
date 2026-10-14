# Abdullah Portfolio

A modern, award-quality personal developer portfolio built with React. Features cinematic intro animations, GSAP-powered scroll effects, a 3D Spline hero scene, a GSAP custom cursor with magnetic p[...]

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0050?logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)

---

## Live Demo

> **[View Live →](https://ab812x-portfolio.vercel.app)**

---

## Tech Stack

| Technology | Role in this project |
| --- | --- |
| **React 19** | Component architecture and UI rendering |
| **Vite 8** | Dev server with instant HMR and optimized production builds |
| **Tailwind CSS v4** | Utility-first styling with dark theme design tokens |
| **Framer Motion 12** | Page transitions, staggered reveals, layout animations, and AnimatePresence |
| **GSAP 3** | Scroll-triggered animations, parallax effects, skill bar fills, and the custom cursor |
| **@gsap/react** | React hook (`useGSAP`) for GSAP lifecycle management and cleanup |
| **Spline** | Interactive 3D scene rendered in the hero section |
| **@splinetool/react-spline** | React wrapper for embedding Spline 3D scenes |
| **EmailJS** | Client-side email sending from the contact form (no backend required) |
| **React Icons** | SVG icon library (Feather Icons set) used across all sections |
| **React Router DOM** | Client-side routing infrastructure |
| **React Scroll** | Smooth scroll utility for section navigation |
| **Cabinet Grotesk** | Display/heading typeface loaded via Fontshare |
| **DM Sans** | Body text typeface loaded via Google Fonts |
| **Fira Code** | Monospace typeface for the custom cursor labels and terminal panel |
| **ESLint** | Code linting with React Hooks and React Refresh plugins |

---

## Project Structure

```
newPortfolio/
├── public/
│   ├── images/
│   │   ├── jamming.png           # Jammming project screenshot
│   │   ├── mixedMessages.png     # Mixed Messages project screenshot
│   │   ├── old-Portfolio.png     # Old portfolio project screenshot
│   │   ├── my-logo.png           # Site logo
│   │   └── my-photo.png          # Profile photo (also used as favicon)
│   └── Abdullah_Alaa_Resume.pdf  # Downloadable CV
│
├── src/
│   ├── components/
│   │   ├── AboutSection.jsx      # Bio, profile photo, skills grid, stats, CTAs
│   │   ├── ContactModal.jsx      # Popup contact form (reused in Header)
│   │   ├── ContactSection.jsx    # Contact form + terminal JSON panel
│   │   ├── CustomCursor.jsx      # GSAP-driven dot cursor with animated labels
│   │   ├── ExperienceSection.jsx # Education + work + certifications timeline
│   │   ├── Footer.jsx            # Footer with socials, badges, easter egg terminal
│   │   ├── Header.jsx            # Sticky nav with scroll tracking + mobile menu
│   │   ├── HeroSection.jsx       # Hero with Spline 3D scene + parallax text
│   │   ├── IntroAnimation.jsx    # Cinematic page-load intro sequence
│   │   ├── ProgressBar.jsx       # Scroll progress bar with shimmer effect
│   │   ├── ProjectSection.jsx    # Filterable project grid + featured card
│   │   └── SectionDivider.jsx    # Gradient divider between sections
│   │
│   ├── hooks/
│   │   ├── useCursor.js          # Custom cursor logic (position, magnetic, labels)
│   │   └── useScrollTo.js        # GSAP-powered smooth scroll to section
│   │
│   ├── App.jsx                   # Root component — assembles all sections
│   ├── App.css                   # App-level styles
│   ├── index.css                 # Global styles and Tailwind directives
│   └── main.jsx                  # React DOM entry point
│
├── index.html                    # HTML shell with font preloads
├── vite.config.js                # Vite + Tailwind plugin config
├── eslint.config.js              # ESLint configuration
├── package.json                  # Dependencies and scripts
└── .gitignore                    # Git ignore rules
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (or yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/ab812x/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root for EmailJS:

```env
VITE_SERVICE_ID=your_emailjs_service_id
VITE_TEMPLATE_ID=your_emailjs_template_id
VITE_PUBLIC_KEY=your_emailjs_public_key
```

### Development

```bash
npm run dev
```

Opens the dev server at `http://localhost:5173` with hot module replacement.

### Production Build

```bash
npm run build
```

Outputs optimized static files to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Serves the `dist/` build locally for testing before deployment.

### Linting

```bash
npm run lint
```

---

## Features

- **Cinematic Intro** — full-screen animated loading sequence on first visit (session-based, only plays once)
- **3D Hero Scene** — interactive Spline model with parallax text on scroll
- **Custom Cursor** — GSAP `quickTo` dot with magnetic pull, hover scaling, and monospace labels
- **Scroll Animations** — GSAP ScrollTrigger drives heading reveals, skill bar fills, card staggers, and parallax depth
- **Profile Photo** — layered card stack with spinning gradient border, grayscale-to-color hover, and floating availability badge
- **Filterable Projects** — category tabs with Framer Motion layout animations
- **Terminal Panel** — typing-style JSON display with line-by-line reveal
- **Contact Form** — EmailJS integration with success/error states
- **Easter Egg** — press `F` or type `help` in the footer to open a hidden terminal
- **Scroll Progress Bar** — sticky top bar with shimmer animation
- **Fully Responsive** — mobile-first layout across all sections

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ☕ and 💜 by **Abdullah Alaa**
