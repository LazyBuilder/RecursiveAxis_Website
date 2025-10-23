import React, { useState, useCallback, useEffect, useRef } from 'react';
// Lucide icons are used for a modern, lightweight icon set.
import { Menu, X, Mail, ArrowRight, TrendingUp, Zap, Users, ShieldCheck, HardHat, Link, Globe, Briefcase, Building, User, BookOpen, Tag, Search } from 'lucide-react';

// ----------------------------------------------------------------------
// --- Configuration & Data ---
// This section centralizes all customizable variables for easy modification.
// ----------------------------------------------------------------------

// Global Aesthetics - Use these constants for quick theme changes
const LIGHT_BACKGROUND = 'bg-white';
const DARK_BACKGROUND = 'bg-gray-950';
const LIGHT_TEXT = 'text-gray-900';
const DARK_TEXT = 'text-white';
const PRIMARY_ACCENT = 'text-pink-600'; // Used for main CTAs and highlights
const SECONDARY_ACCENT = 'text-cyan-600'; // Used for sub-headings and distinction

/**
 * --- ASSET CONFIGURATION ---
 * Images are loaded directly from the environment using unique contentFetchIds.
 */
const SIMPLE_LOGO_PATH = `${process.env.PUBLIC_URL}/assets/RA_MiniLogo.png`;
const LOGO_PATH = `${process.env.PUBLIC_URL}/assets/RA_FullLogo_Dark.png`;
const HERO_BG_PATH = `${process.env.PUBLIC_URL}/assets/RA_Dark_Background.png`;
const FOUNDER_IMAGE_PATH = `${process.env.PUBLIC_URL}/assets/TeamProfilePic_Asit.jpeg`; // Placeholder (Update with actual ID)

import project_data from './projects_db.jsx';

// Project Card Color Mapping (Tailwind classes must be full strings for compilation)
const PROJECT_COLORS = {
    pink: { iconBg: 'bg-pink-50', iconText: 'text-pink-600', shadow: 'shadow-pink-100', border: 'border-pink-200' },
    cyan: { iconBg: 'bg-cyan-50', iconText: 'text-cyan-600', shadow: 'shadow-cyan-100', border: 'border-cyan-200' },
    green: { iconBg: 'bg-green-50', iconText: 'text-green-600', shadow: 'shadow-green-100', border: 'border-green-200' },
    purple: { iconBg: 'bg-purple-50', iconText: 'text-purple-600', shadow: 'shadow-purple-100', border: 'border-purple-200' },
    yellow: { iconBg: 'bg-yellow-50', iconText: 'text-yellow-600', shadow: 'shadow-yellow-100', border: 'border-yellow-200' },
    fuchsia: { iconBg: 'bg-fuchsia-50', iconText: 'text-fuchsia-600', shadow: 'shadow-fuchsia-100', border: 'border-fuchsia-200' },
};

const NAV_LINKS = [
  { name: 'Services', id: 'services' },
  { name: 'Philosophy', id: 'philosophy' },
  { name: 'Projects', id: 'projects' },
];

// Data structure for the Services section
const SERVICE_DATA = [
  {
    segment: "Founders & Startups",
    icon: HardHat,
    headline: "BUILD DISCIPLINED VENTURES",
    body: "Building your startup means fighting against the odds. Our strength comes from successfully taking projects from idea to market (0 to 1). We build the focus and toughness needed to master uncertainty and set a conclusive path forward.",
    tagline: "CONTROLLED CHAOS",
    modalTitle: "Product Strategy & Tech Advisory",
    modalBulletPoints: [
      "PMF Acceleration Strategy: Strategic planning powered by logical experimentation and data-driven decision-making.",
      "Interim CPO/CTO Advisory: World-class, battle-tested leadership without the permanent hiring risk.",
      "Actionable Tech Roadmaps: Scalable system design, deployment architecture, and maintenance strategies.",
      "Technical Debt Reduction: Audits and remediation plans to stabilize platforms and prepare for investment.",
      "Due-Diligence Preparation: Prepare tech assets for investor/auditor scrutiny."
    ],
    modalCta: "Book a Strategy Session",
    ctaLink: "https://cal.com/asitdeva/founders"
  },
  {
    segment: "Investors & Private Equity",
    icon: ShieldCheck,
    headline: "DE-RISK YOUR TECH INVESTMENTS",
    body: "Modern investment decisions depends on emerging tech. We remove market uncertainty by providing deep technical certainty for emerging technologies. We turn complex details into clear, trustworthy signals for investors.",
    tagline: "CLEAR & CONFIDENT DECISIONS",
    modalTitle: "Technical Due Diligence & Portfolio Design",
    modalBulletPoints: [
      "Technical Due Diligence (AI & Software): Deep, unbiased review of AI assets, software viability, and execution capability across the portfolio.",
      "Portfolio De-Risking Analysis: Deep analysis for technology diversification—your real value and defensive strategy.",
      "AI Strategy Consulting & Training: Upskilling and tech know-how for new technologies to make better, data-backed investment decisions.",
      "Valuation Strategy & Risk Mitigation: Identify and mitigate critical technical risks post-acquisition.",
      "Exit Readiness Audits: Ensuring tech stack is optimized for maximum valuation."
    ],
    modalCta: "Request Due Diligence Scope",
    ctaLink: "https://cal.com/asitdeva/investors"
  },
  {
    segment: "Corporates & Enterprise",
    icon: Building,
    headline: "INNOVATE LIKE A STARTUP",
    body: "Innovation requires a clear, controlled plan. We design programs that let big companies move with the speed of a startup, helping teams handle uncertainty and achieve reliable outcomes every time.",
    tagline: "EFFECTIVE INNOVATION",
    modalTitle: "Innovation Programs & Acquisition Vetting",
    modalBulletPoints: [
      "Innovation Program Design: Design effective, repeatable programs to successfully enable your teams to leverage emerging Technologies.",
      "Tech Maturity Evaluation: Detailed analysis of your teams' maturity levels and phased roadmaps for capability advancement.",
      "Acquisition Technical Vetting: Exhaustive search and technical analysis for your next significant strategic acquisition.",
      "Strategic Roadmap Consulting: Guidance through organizational shifts and CPO/CTO advisory for digital transformation.",
      "Internal Venture Structuring: Frameworks to validate and spin out new internal ventures."
    ],
    modalCta: "Explore Program Options",
    ctaLink: "https://cal.com/asitdeva/corporates"
  }
];

// Data structure for the Philosophy section (D.I.V.E. Framework)
const DIVE_FRAMEWORK = [
  { 
    letter: 'D', title: 'Decision', description: 'Hypothesis-Led Strategy', 
    modalTitle: 'D: Decision - Hypothesis-Led Strategy', 
    modalBody: [
        "The Strategy: Why we build what we build.",
        "Our work always begins with strategy, not code. We combine our technical expertise and market knowledge to build sharp, data-backed hypotheses about the market need and the most viable solution. This systematic approach ensures that every resource is targeted at the highest-leverage problem, giving your project a clear strategic axis and defining the most efficient path forward."
    ]
  },
  { 
    letter: 'I', title: 'Iteration', description: 'Velocity-Focused Design', 
    modalTitle: 'I: Iteration - Velocity-Focused Design', 
    modalBody: [
        "The Process: How we build and learn fast.",
        "Our methodology is built on speed and quality. We design highly testable, user-centric experiences that allow for rapid and high-quality cycles. We leverage our scalable methods to quickly test core assumptions, resulting in maximized learning and significantly reduced time-to-market for every feature and product. This is how we ensure speed is not reckless."
    ]
  },
  { 
    letter: 'V', title: 'Verification', description: 'Analytics-Driven Learning', 
    modalTitle: 'V: Verification - Analytics-Driven Learning', 
    modalBody: [
        "The Rigor: How we know it's working.",
        "We install rigorous data analytics and measurement frameworks from the start. This process confirms that the results of your iterative efforts are driving measurable business growth, not just activity. We verify every learning and pivot with hard data, giving investors and stakeholders the critical clarity and confidence needed to commit to the next phase."
    ]
  },
  { 
    letter: 'E', title: 'Execution', description: 'Scalable Delivery', 
    modalTitle: 'E: Execution - Scalable Delivery', 
    modalBody: [
        "The Outcome: How we deliver lasting value.",
        "Once a hypothesis is verified, we move into full, expert execution. We use tested, scalable methods to devise the long-term plan, ensuring clean, robust engineering. This commitment to quality builds a foundation that is future-proofed for growth and requires minimal technical debt, allowing you to scale without costly rebuilds."
    ]
  },
];

// New structure for the list of trusted companies
// 'url' and 'logo' are optional fields. If 'logo' is not present, the 'name' will be displayed.
const TRUSTED_COMPANIES = [
  { name: 'TCS', url: 'https://www.tcs.com/' , logo: `${process.env.PUBLIC_URL}/assets/asit_logos/TCS_logo.png` },
  { name: 'Equifax', url: 'https://www.equifax.ca/canada/equifax/b_en.html', logo: `${process.env.PUBLIC_URL}/assets/asit_logos/Equifax_Logo.png` },
  { name: 'J&J', url: 'https://www.jnj.com/', logo: `${process.env.PUBLIC_URL}/assets/asit_logos/JnJ_Logo.png` },
  { name: 'Siemens', url: 'https://www.siemens.com/global/en.html', logo: `${process.env.PUBLIC_URL}/assets/asit_logos/Siemens_logo.png` },
  { name: 'PUDO', url: 'https://pudopoint.com/'  , logo: `${process.env.PUBLIC_URL}/assets/asit_logos/PUDO_logo.png` },
  { name: 'Ignite AI', url: "https://www.linkedin.com/company/ignite-ai/posts" },
  { name: 'YorkU', url: 'https://www.yorku.ca/' , logo: `${process.env.PUBLIC_URL}/assets/asit_logos/York_U_Logo.png` },
  { name: 'Kare Granola', url: 'https://karegranola.com/', logo: `${process.env.PUBLIC_URL}/assets/asit_logos/Kare_Granola.png` },
  { name: 'StartupFuel', url: 'https://www.startupfuel.com/' , logo: `${process.env.PUBLIC_URL}/assets/asit_logos/Startup-Fuel.png` },
  { name: 'Innovation Factory', url: 'https://innovationfactory.ca/', logo: `${process.env.PUBLIC_URL}/assets/asit_logos/iF_Logo.png` },
  { name: 'FutureSight', url: 'https://futuresight.ventures/' , logo: `${process.env.PUBLIC_URL}/assets/asit_logos/FutureSight_Logo.png` },
  { name: 'Untrap', url: 'https://getuntrap.com/' , logo: `${process.env.PUBLIC_URL}/assets/asit_logos/Untrap_logo.png` },
  { name: 'Addie', url: 'https://getaddie.com/' , logo: `${process.env.PUBLIC_URL}/assets/asit_logos/Addie_Logo.png` },
  { name: 'CaringAI', url: 'https://getcaring.ai/' , logo: `${process.env.PUBLIC_URL}/assets/asit_logos/CaringAI_logo.png` },
  { name: 'Mercata', url: 'https://mercataintel.com/' , logo: `${process.env.PUBLIC_URL}/assets/asit_logos/Mercata_Logo.png` }
];

// Partner/Founder details
const PARTNER_DATA = [
    {
        name: 'Asit Deva',
        title: 'Founder & Principal',
        copy: 'Asit Deva is a seasoned expert dedicated to helping businesses navigate the complexities of technology and innovation. With a passion for building, advising, and strategizing, he transforms ideas into tangible, successful products.',
        linkedin: 'https://www.linkedin.com/in/asitkdeva/', // Placeholder for LinkedIn URL
        isFounder: true,
    }
];

const CONTACT_EMAIL = "hello@recursiveaxis.com"; // Defined the email here

/**
 * --- Project Data ---
 * NOTE: Each project must have a maximum of 3 tags.
 * The 'image' field is optional but highly recommended for visual appeal.
 */
const projectsData = project_data;

const DESCRIPTION_LIMIT = 150; // Max length before showing 'Read More'


// ----------------------------------------------------------------------
// --- Helper Functions ---
// ----------------------------------------------------------------------

/**
 * Utility to smoothly scroll to a section on the page.
 * Uses useCallback for stability, preventing unnecessary re-creation on render.
 */
const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};


// ----------------------------------------------------------------------
// --- Shared Components ---
// ----------------------------------------------------------------------

// Reusable Tag Component for consistency
const TagPill = ({ text }) => (
    <span className="inline-flex items-center rounded-full bg-cyan-600/20 px-3 py-1 text-xs font-medium text-cyan-300 ring-1 ring-inset ring-cyan-600/50 mr-2 mb-2 transition duration-300 hover:bg-cyan-500/30">
        <Tag className="w-3 h-3 mr-1" />
        {text}
    </span>
);

/**
 * Full Description Modal for Projects
 * Designed to be a highly visible overlay with a backdrop blur.
 */
const FullDescriptionModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
      // Modal Overlay (1. ADDED: overflow-y-auto for scrolling the entire overlay)
      <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/90 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto"
          aria-modal="true"
          role="dialog"
          onClick={onClose}
      >
          <div
              // Modal Content Container (2. ADDED: max-h-[90vh] to constrain height)
              // 3. ADDED: p-4 to the container itself ensures a minimum gap from screen edge on mobile
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-gray-900 shadow-2xl transform transition-transform duration-300 scale-100 border border-gray-700"
              onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
          >
              <div className="p-6 sm:p-8">
                  
                  {/* Header Group: Logo, Title, and Close Button */}
                  <div className="flex items-start justify-between mb-4">
                      {/* 4. Logo and Title Group */}
                      <div className="flex items-center space-x-4">
                          {/* Logo: Small, fixed size with cyan border */}
                          <div className="p-2 rounded-md bg-white border border-cyan-600 flex-shrink-0 aspect-square w-8"> 
                              <img 
                                  src={SIMPLE_LOGO_PATH} 
                                  alt="Recursive Axis Logo" 
                                  className={`h-full w-full object-contain opacity-80`} 
                              />
                          </div>
                          <h2 className="text-3xl font-extrabold text-pink-400 border-b border-pink-600 pb-2">
                              {project.title}
                          </h2>
                      </div>
                      
                      {/* Close Button (Moved out of the flow for clean alignment) */}
                      <button
                          onClick={onClose}
                          className="text-gray-400 hover:text-white transition duration-200 p-2 rounded-full hover:bg-gray-800 flex-shrink-0"
                          aria-label="Close modal"
                      >
                          <X className="w-6 h-6" />
                      </button>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap mb-4">
                      {project.tags.map((tag, index) => (
                          <TagPill key={index} text={tag} />
                      ))}
                  </div>
                  
                  {/* Full Description - using whitespace-pre-wrap for cleaner paragraph formatting */}
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{project.description}</p>

                  {/* -------------------- START NEW CODE -------------------- */}
                  {/* Link to Project */}
                  {project.link && (
                    <a
                        href={project.link}
                        target="_blank" // Opens the link in a new tab
                        rel="noopener noreferrer" // Security best practice for target="_blank"
                        className={`inline-flex items-center px-6 py-3 rounded-lg text-lg font-bold transition-all duration-300 bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/30`}
                    >
                        {/* Assuming Mail is the Lucide icon 'Mail' */}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-7-3l-4 4m0 0l4 4m-4-4h13"></path></svg>
                        <span>View Project</span>
                    </a>
                  )}
                  {/* -------------------- END NEW CODE -------------------- */}

                  {/* Project Image - Responsive and with error fallback */}
                  {project.imageSrc && (
                      <img
                          src={project.imageSrc}
                          alt={project.title}
                          className="mt-6 w-full h-auto object-cover rounded-lg shadow-lg"
                          // Error handler for broken images, replacing them with a placeholder
                          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/555/eee?text=${project.title.replace(/\s/g, '+')}`; }}
                      />
                  )}
              </div>
          </div>
      </div>
  );
};


/**
 * Card component used for the dedicated Projects page.
 * Handles truncation logic and triggers the modal for full details.
 */
const ProjectCard = ({ project, onReadMore }) => {
    const isLongDescription = project.description.length > DESCRIPTION_LIMIT;
    const displayDescription = isLongDescription
        ? project.description.substring(0, DESCRIPTION_LIMIT) + '...'
        : project.description;

    return (
        <div className="flex flex-col bg-gray-800 rounded-xl shadow-xl hover:shadow-cyan-500/30 transition duration-500 overflow-hidden border border-gray-700/50">
            {/* Project Image (Optional) - Fixed height for uniform card layout */}
            {project.imageSrc && (
                <div className="h-48 overflow-hidden">
                    <img
                        src={project.imageSrc}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/555/eee?text=${project.title.replace(/\s/g, '+')}`; }}
                    />
                </div>
            )}

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">{project.title}</h3>

                {/* Tags - Ensures a minimum height to prevent layout shifts */}
                <div className="flex flex-wrap min-h-[40px] mb-4">
                    {project.tags.map((tag, index) => (
                        <TagPill key={index} text={tag} />
                    ))}
                </div>

                {/* Description - flex-grow ensures this area takes up available space */}
                <p className={`text-gray-300 mb-4 flex-grow ${isLongDescription ? 'line-clamp-4' : ''}`}>
                    {displayDescription}
                </p>

                {/* Read More Button - Only shows if description is truncated */}
                {isLongDescription && (
                    <button
                        onClick={() => onReadMore(project)}
                        className="mt-auto w-full flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-pink-600 rounded-lg hover:bg-pink-500 transition duration-300 shadow-md shadow-pink-500/30"
                    >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Read Full Description
                    </button>
                )}
            </div>
        </div>
    );
};

/**
 * Generic Modal for Services (Bulleted List)
 */
const ServiceModal = ({ isOpen, onClose, content }) => {
  if (!isOpen || !content) return null;

  return (
    // 1. ADDED: overflow-y-auto to allow scrolling of the entire overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/90 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto">
      <div 
            // 2. ADDED: max-h-[90vh] to constrain height
            // 3. ADDED: overflow-y-auto to allow scrolling within the box
            className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl max-w-xl w-full p-8 transition-transform duration-300 scale-100 transform-gpu animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        <div className="flex justify-between items-start mb-6">
          {/* Logo and Title Group */}
          <div className="flex items-center space-x-3">
             {/* CORRECTED LOGO SIZE: w-8 container, inner image h-full w-full */}
             <div className="p-2 rounded-md bg-white border border-cyan-600 flex-shrink-0 aspect-square w-12"> 
              <img 
                src={SIMPLE_LOGO_PATH} 
                alt="Recursive Axis Logo" 
                className={`h-full w-full object-contain opacity-80`} 
              />
            </div>
             <h3 className={`text-2xl font-bold ${PRIMARY_ACCENT}`}>{content.modalTitle}</h3>
          </div>
          {/* Close Button */}
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <ul className="list-disc list-inside space-y-3 text-gray-300 mb-6 pl-4">
            {content.modalBulletPoints.map((item, index) => (
                <li key={index} className="text-sm md:text-base">
                    {item}
                </li>
            ))}
        </ul>

        <p className="text-gray-500 italic text-sm mb-8">... and more custom solutions tailored to your unique challenges.</p>

        {/* Modal CTA Button */}
        <a href={content.ctaLink} target="_blank" rel="RecursiveAxis Website" onClick={onClose} className={`w-full block text-center font-bold py-3 px-6 rounded-lg ${DARK_BACKGROUND} border border-pink-500 text-white transition-all duration-300 hover:bg-pink-500 hover:text-gray-950`}>
          {content.modalCta} <ArrowRight className="inline ml-2" size={16} />
        </a>
      </div>
    </div>
  );
};

/**
 * Generic Modal for Philosophy and Legal Texts
 */
const TextModal = ({ isOpen, onClose, content }) => {
  if (!isOpen || !content) return null;

  return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/90 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto"
      >
          <div 
              className="bg-white border border-pink-300/50 rounded-xl shadow-2xl max-w-xl w-full p-8 transition-transform duration-300 scale-100 transform-gpu animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
          >
              <div 
                  className="flex justify-between items-start mb-6 border-b border-pink-100 pb-4"
              >
                  <div className="flex items-center space-x-3">
                       {/* CORRECTED LOGO SIZE: Outer div sets size (w-8), inner image fills it (h-full w-full) */}
                       <div className="p-2 rounded-md bg-gray-950 border border-cyan-600 flex-shrink-0 aspect-square w-12"> 
                          <img 
                            src={SIMPLE_LOGO_PATH} 
                            alt="Recursive Axis Logo" 
                            className={`h-full w-full object-contain opacity-80`} 
                          />
                        </div>
                      
                      <h3 className={`text-2xl font-bold ${PRIMARY_ACCENT}`}>{content.title}</h3>
                  </div>
                  
                  <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition-colors">
                      <X size={24} />
                  </button>
              </div>
              
              {typeof content.body === 'string' ? (
                  <p className={`text-gray-700 mb-4`}>{content.body}</p>
              ) : (
                  content.body.map((paragraph, index) => (
                      <p key={index} className={`text-gray-700 mb-4`}>{paragraph}</p>
                  ))
              )}
          </div>
      </div>
  );
};

// ----------------------------------------------------------------------
// --- Main Layout Components ---
// ----------------------------------------------------------------------

/**
 * Header Component (Sticky and Responsive)
 * Uses flexbox and responsive classes (md:hidden) for mobile/desktop toggle.
 */
const Header = React.memo(({ setPage, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = useCallback((id) => {
    setIsMenuOpen(false);
    if (id === 'projects') {
      setPage('projects');
    } else {
      setPage('home');
      // Timeout ensures the page state updates before the scroll fires on the new DOM
      scrollToSection(id);
    }
  }, [setPage, scrollToSection]);

  return (
    <header className={`sticky top-0 z-40 w-full ${DARK_BACKGROUND} bg-opacity-100 border-b border-gray-800/50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo/Brand (Always visible) */}
        <button onClick={() => setPage('home')} 
          className={`
            flex items-center space-x-2 text-white 
            p3 md:p-5 rounded-xl shadow-xl z-50 transition-all duration-300 
            ${DARK_BACKGROUND} transform translate-y-3 md:translate-y-6
            hover:scale-[1.2]
            hover:shadow-2xl hover:shadow-cyan-100 cursor-pointer transform hover:translate-y-3
          `}
        >
          <img src={LOGO_PATH} alt="Recursive Axis Logo" className={`h-10 md:h-20`} />
          {/* <span className="text-xl font-extrabold tracking-tight">Recursive Axis</span>*/}
        </button>

        {/* Desktop Navigation (Hidden on small screens) */}
        <nav className="hidden md:flex space-x-8 items-center">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-gray-300 hover:text-white transition-colors font-medium relative group"
            >
              {link.name}
              {/* Underline hover effect */}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 ${PRIMARY_ACCENT} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
            </button>
          ))}
          {/* Main CTA Button */}
          <a href="https://cal.com/asitdeva" target="_blank" rel="RecursiveAxis Website" className={`ml-8 px-5 py-2 rounded-lg font-bold transition-all duration-300 bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/30`}>
            Book a Call
          </a>
        </nav>

        {/* Mobile Menu Button (Visible only on small screens) */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown (Responsive: conditional rendering) */}
      {isMenuOpen && (
        <div className={`md:hidden ${DARK_BACKGROUND} p-4 border-t border-gray-800 absolute w-full transition-all duration-300 transform-gpu translate-y-0 animate-in fade-in`}>
          <nav className="flex flex-col space-y-4">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-lg text-gray-300 hover:text-white text-right py-2 border-b border-gray-800"
              >
                {link.name}
              </button>
            ))}
            <a href="https://cal.com/asitdeva" 
              target="_blank" rel="RecursiveAxis Website"
              onClick={() => setIsMenuOpen(false)} 
              className={`w-full text-center font-bold py-3 rounded-lg mt-4 transition-all duration-300 bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/30`}>
              Book a Call
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}) // REMOVED trailing semicolon from React.memo

/**
 * Footer Component (Minimal and Professional)
 */
const Footer = React.memo(({ openTextModal }) => (
  <footer 
    className={`${DARK_BACKGROUND} border-t border-gray-800/50 mt-20 relative overflow-hidden`}
  >
    {/* --- NEW BACKGROUND LAYER (z-0) --- */}
    <div 
      className="absolute inset-0 z-0 bg-opacity-30"
      style={{
        backgroundImage: `url(${HERO_BG_PATH})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(1px)', 
      }}
    />
    {/* ---------------------------- */}

    {/* Dark Overlay for text legibility */}
    <div className="absolute inset-0 bg-gray-950/75"></div>

    {/* CONTENT LAYER (relative z-10) */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-gray-500 text-sm relative z-10">
      {/* Footer Navigation - Uses buttons to trigger text modals for legal content */}
      {/* New Email Link */}
      <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center space-x-2 text-gray-400 hover:text-pink-500 transition-colors font-semibold text-base">
          <Mail size={16} className={PRIMARY_ACCENT.replace('text-', 'text-')} />
          <span>{CONTACT_EMAIL}</span>
      </a>
      <div className="flex justify-center space-x-4 mb-4 flex-wrap">
        <button onClick={() => openTextModal({title: "Terms of Service", body: ["These are our terms of service. By using this website, you agree to our policies. This is placeholder text for the purpose of demonstrating the functionality. Actual terms will be provided upon engagement.", "This document is subject to change without notice. Please contact us for the latest version."]})
        } className="hover:text-pink-500 transition-colors">Terms of Service</button>
        <button onClick={() => openTextModal({title: "Privacy Policy", body: ["Your privacy is critically important to us. Our policy is to respect your privacy regarding any information we may collect while operating our websites. We do not share your information with third parties without your explicit consent. This is placeholder text for demonstration.", "Data collected is used solely for the purpose of improving our services and communication with you."]})
        } className="hover:text-pink-500 transition-colors">Privacy Policy</button>
      </div>
      <p>&copy; {new Date().getFullYear()} Recursive Axis. All rights reserved. | Strategic Partner for Innovation.</p>
    </div>
  </footer>
)); // REMOVED trailing semicolon from React.memo

// ----------------------------------------------------------------------
// --- Home Page Sections ---
// ----------------------------------------------------------------------

/**
 * Section 1: Hero (Dark Background, Responsive Image/Text)
 */
const HeroSection = React.memo(({ scrollToServices }) => (
  <section
    id="hero"
    className="relative py-32 md:py-48 flex items-center justify-center overflow-hidden border-b border-gray-800/50 min-h-[70vh]"
    style={{
      // Responsive Background Style: Uses repeating pattern for consistency across all sizes.
      // NOTE: If using a single, large image (e.g., 1920x1080px), change '150px' to 'cover' and 'backgroundRepeat' to 'no-repeat'.
      backgroundImage: `url(${HERO_BG_PATH})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      //backgroundBlendMode: 'overlay', // Blends the pattern with the solid color
      backgroundColor: '#0A0A0A',
      backgroundPosition: 'center',
    }}
  >
    {/* Dark Overlay for text legibility */}
    <div className="absolute inset-0 bg-gray-950/75"></div>
    
    <div className="relative z-10 max-w-4xl text-center px-4">
      {/* H1: Fully responsive font sizes (text-4xl up to lg:text-7xl) */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tighter animate-in fade-in duration-1000">
        Your Strategic Partner for <span className={SECONDARY_ACCENT}>Technology</span>, <span className={SECONDARY_ACCENT}>Analytics</span> & <span className={SECONDARY_ACCENT}>Innovation</span>.
      </h1>
      {/* H2: Responsive font size (text-xl up to sm:text-2xl) */}
      <h2 className="text-xl sm:text-2xl text-gray-400 mb-10 font-light max-w-3xl mx-auto animate-in fade-in delay-300 duration-1000">
        We provide expert Tech Strategy, Execution, and Advisory services, designed to accelerate innovation for founders, investors, and corporate ventures globally.
      </h2>
      {/* CTA: Explore Our Solutions */}
      <button
        onClick={scrollToServices}
        className={`inline-flex items-center px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 bg-pink-600 hover:bg-pink-700 text-white shadow-xl shadow-pink-500/40 transform hover:scale-[1.03] animate-in fade-in delay-500`}
      >
        Explore Our Solutions <ArrowRight className="ml-2" size={20} />
      </button>
    </div>
  </section>
)) // REMOVED trailing semicolon from React.memo

/**
 * Section 2: Services & Offerings (Light Background)
 * Added new, distinct "Learn More" button style.
 */
const ServicesSection = React.memo(({ openModal }) => (
  <section id="services" className={`py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${LIGHT_BACKGROUND} ${LIGHT_TEXT}`}>
    <div className="text-center mb-16">
      <h3 className={`text-sm tracking-widest uppercase font-bold mb-3 ${SECONDARY_ACCENT}`}>Our Focus</h3>
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Services & Offerings</h2>
    </div>

    {/* Responsive Grid Layout (1 column mobile, 3 columns desktop) */}
    <div className="grid md:grid-cols-3 gap-8">
      {SERVICE_DATA.map((service, index) => (
        // Card is clickable to open the modal
        <div 
            key={service.segment} 
            className="relative group overflow-hidden rounded-xl border border-gray-200 shadow-xl bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-100 cursor-pointer transform hover:-translate-y-1" 
            onClick={() => openModal(service)}
        >
            <div className="p-8">
                {/* Segment Header and Icon */}
                <div className="flex items-center mb-6">
                    <div className={`h-12 w-12 flex items-center justify-center rounded-xl ${PRIMARY_ACCENT} bg-pink-50 mr-4 border border-pink-200 transition-transform group-hover:scale-110`}>
                        <service.icon size={24} />
                    </div>
                    <p className={`text-lg font-bold uppercase tracking-wider ${SECONDARY_ACCENT}`}>{service.segment}</p>
                </div>

                {/* Main Content */}
                <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-pink-700 transition-colors">{service.headline}</h4>
                <p className="text-gray-600 mb-6">{service.body}</p>

                {/* --- UPDATED "Learn More" Section with distinct button --- */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className={`text-sm font-semibold mb-3 text-pink-700`}>{service.tagline}</p>
                    {/* Small, distinct button for 'Learn More' */}
                    <button
                        onClick={(e) => { e.stopPropagation(); openModal(service); }} // Stop propagation to prevent double click
                        className={`inline-flex items-center px-4 py-1.5 text-xs font-semibold rounded-full bg-cyan-600/10 text-cyan-600 border border-cyan-300 transition-all duration-300 hover:bg-cyan-600 hover:text-white hover:border-cyan-600 shadow-sm`}
                        aria-label={`Learn more about ${service.segment} services`}
                    >
                        Read More <ArrowRight className="ml-1" size={12} />
                    </button>
                </div>
            </div>
            {/* Subtle Cyan glow border effect on hover */}
            <div className="absolute inset-0 border-4 border-transparent rounded-xl pointer-events-none group-hover:border-cyan-400/50 transition-all duration-300"></div>
        </div>
      ))}
    </div>
  </section>
)) // REMOVED trailing semicolon from React.memo

/**
 * Section 3: Recent Projects Showcase (Limited to 3 items)
 */
const ProjectsShowcase = React.memo(({ goToProjects }) => {
    
  // 1. IMPLEMENT RANDOM SELECTION: Create a shuffled array and take the first 3 projects
  const shuffledProjects = [...projectsData].sort(() => 0.5 - Math.random());
  const showcaseProjects = shuffledProjects.slice(0, 3); // Now selecting 3

  return (
      <section id="projects" className={`py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${LIGHT_BACKGROUND} ${LIGHT_TEXT}`}>
          <div className="text-center mb-16">
              <h3 className={`text-sm tracking-widest uppercase font-bold mb-3 ${PRIMARY_ACCENT}`}>Social Proof</h3>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Recent Projects: Evidence of Our Impact</h2>
              <p className="text-gray-600 mt-4 max-w-3xl mx-auto">See how we've partnered with leaders to turn complex challenges into elegant, scalable outcomes.</p>
          </div>

          {/* 1. GRID LAYOUT: Changed to 1 column mobile, 2 columns medium, 3 columns large */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {showcaseProjects.map((project) => {

                  const colorKey = project.color || 'default';
                  const FALLBACK_COLORS = { 
                      border: 'border-gray-400', 
                      shadow: 'shadow-gray-200' 
                      // Only need border/shadow for this component
                  };

                  const colors = PROJECT_COLORS[colorKey] ?? FALLBACK_COLORS;
                  
                  // Use a project-specific image or a default logo path
                  const projectVisual = project.imageSrc || LOGO_PATH; 

                  const imageClass = project.imageSrc 
                    ? "w-full h-full object-cover" 
                    : "w-full h-full object-contain p-8 bg-gray-100";

                  return (
                      <div
                          key={project.id}
                          className={`bg-white p-6 rounded-xl border ${colors.border} shadow-lg transition-all duration-300 hover:shadow-xl hover:${colors.shadow} cursor-pointer`}
                      >
                          
                          {/* 2. DEDICATED IMAGE SPACE: Fixed height (h-48) */}
                          <div className="mb-4 h-48 w-full overflow-hidden rounded-lg relative">
                              <img
                                  src={projectVisual}
                                  alt={`Visual for ${project.title}`}
                                  className={imageClass}
                              />
                          </div>
                          {/* Title (Now takes full width under the image) */}
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h4>
                          
                          {/* Summary Text */}
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {project.description.substring(0, 90)}...
                          </p>
                          
                          {/* Tags display */}
                          <div className="flex flex-wrap gap-2">
                              {project.tags.map(tag => (
                                  <span key={tag} className={`text-xs font-medium px-2 py-0.5 rounded-full border border-gray-300 text-gray-600 bg-gray-50`}>
                                      {tag}
                                  </span>
                              ))}
                          </div>
                      </div>
                  );
              })}
          </div>

          <div className="text-center mt-12">
              {/* Button to switch to the dedicated Projects page */}
              <button
                  onClick={() => goToProjects()}
                  className={`inline-flex items-center font-bold text-lg px-6 py-3 rounded-lg text-white bg-cyan-600 transition-all duration-300 hover:bg-cyan-700 shadow-md shadow-cyan-500/30 transform hover:scale-[1.03]`}
              >
                  Explore All Projects & Case Studies <ArrowRight className="ml-2" size={20} />
              </button>
          </div>
      </section>
  );
}) // REMOVED trailing semicolon from React.memo

/**
 * Section 4: Our Core Philosophy (The D.I.V.E. Framework)
 */
const PhilosophySection = React.memo(({ openTextModal }) => (
  <section id="philosophy" className={`py-20 md:py-32 bg-gray-50 border-t border-b border-gray-200 ${LIGHT_TEXT}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h3 className={`text-sm tracking-widest uppercase font-bold mb-3 ${SECONDARY_ACCENT}`}>Our Blueprint</h3>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Our Core Philosophy: The D.I.V.E. Framework.</h2>
      </div>

      {/* Responsive Grid Layout (4 columns desktop) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
        {DIVE_FRAMEWORK.map((item, index) => (
          <button
            key={item.letter}
            onClick={() => openTextModal({title: item.modalTitle, body: item.modalBody})}
            // ADDED: max-w-xs (limit width) and mx-auto (center it)
            className="text-center p-6 border border-gray-200 rounded-xl shadow-lg bg-white transition-all duration-300 hover:shadow-cyan-200 hover:border-cyan-500 transform hover:-translate-y-0.5 max-w-xs"
          >
            <div className={`text-5xl font-extrabold mb-4 ${PRIMARY_ACCENT}`}>{item.letter}</div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h4>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </button>
        ))}
      </div>
    </div>
  </section>
)) // REMOVED trailing semicolon from React.memo

/**
 * Section 5: Meet The Team & Trusted Companies Marquee (Dark Background)
 */
const TeamSection = React.memo(() => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // Component for the horizontally scrolling company logos
const TrustedCompaniesMarquee = () => (
  <div className="relative w-full overflow-hidden whitespace-nowrap py-4 border-y border-gray-700 bg-white mt-8">
      <style jsx="true">{`
          /* CSS for the infinite horizontal scroll effect */
          @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
          }
          .marquee {
              display: flex;
              width: 200%; /* Double width to allow smooth looping */
              animation: marquee 45s linear infinite;
          }
          .marquee-item {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 0 2rem;
              min-width: fit-content;
          }
          /* Style for the company logo images */
          .company-logo {
              height: 2rem; /* Adjust this value as needed for logo size */
              width: auto;
              object-fit: contain;
              opacity: 0.9; /* Initial opacity for a subtle look */
              transition: opacity 0.1s, transform 0.3s;
          }
          .company-logo:hover {
              opacity: 1;
              transform: scale(1.05);
          }
      `}</style>
      <div className="marquee">
          {/* Duplicating the list ensures a seamless loop */}
          {[...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES].map((company, index) => {
              // Determine the content based on whether a logo exists
              const content = company.logo ? (
                  <img
                      src={company.logo}
                      alt={`${company.name} Logo`}
                      className="company-logo"
                  />
              ) : (
                  <span className="text-2xl font-bold text-gray-500 hover:text-white transition-colors cursor-default select-none tracking-wider">
                      {company.name}
                  </span>
              );

              // Wrap the content in an anchor tag if a URL exists, otherwise use a simple div
              return (
                  <div key={index} className="marquee-item">
                      {company.url ? (
                          <a
                              href={company.url}
                              target="_blank" rel="RecursiveAxis Website"
                              aria-label={`Visit ${company.name}'s website`}
                              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" // Add focus styles
                          >
                              {content}
                          </a>
                      ) : (
                          content
                      )}
                  </div>
              );
          })}
      </div>
  </div>
);

    return (
      <section className={`py-20 md:py-32 ${DARK_BACKGROUND} border-t border-b border-gray-800 relative overflow-hidden`}>
      {/* --- NEW BACKGROUND LAYER (z-0) --- */}
      <div 
        className="absolute inset-0 z-0 bg-opacity-10"
        style={{
          backgroundImage: `url(${HERO_BG_PATH})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // ADDED: Native CSS filter: blur(3px)
          filter: 'blur(1px)', 
        }}
      />
      {/* ---------------------------- */}

      {/* Dark Overlay for text legibility */}
      <div className="absolute inset-0 bg-gray-950/75"></div>
        
      {/* CONTENT LAYER: ADDED relative and ensured z-10 for stacking context */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {PARTNER_DATA.map((partner, index) => (
                // Responsive layout: image/text switch order on desktop
                <div key={index} className="grid md:grid-cols-2 gap-12 items-center p-10 rounded-xl">
                    <div className="md:order-1">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                            Meet The {partner.isFounder ? 'Founder' : 'Partner'}: {partner.name}
                        </h2>
                        <p className={`text-lg mb-8 ${SECONDARY_ACCENT}`}>{partner.title}</p>
                        <p className="text-gray-300 text-lg mb-8">{partner.copy}</p>

                        <a
                            href={partner.linkedin}
                            target="_blank" rel="RecursiveAxis Website"
                            className={`inline-flex items-center font-bold text-lg ${PRIMARY_ACCENT} hover:text-white transition-colors`}
                        >
                            Connect with {partner.name.split(' ')[0]} on LinkedIn <Link className="ml-2" size={20} />
                        </a>
                    </div>
                    <div className="md:order-2 flex justify-center">
                        {/* Founder Image Placeholder/Container */}
                        {/* NOTE: Recommended founder image size is 500x500px. */}
                        <div className={`w-64 h-64 rounded-full bg-gray-800 border-4 border-pink-500 flex items-center justify-center shadow-2xl shadow-pink-500/20 overflow-hidden`}>
                            <img
                                src={FOUNDER_IMAGE_PATH}
                                alt={`Headshot of ${partner.name}`}
                                className={`w-full h-full object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                onLoad={() => setIsImageLoaded(true)}
                                // Ensure fallback icon shows on error by setting isImageLoaded to false
                                onError={(e) => { 
                                    e.target.onerror = null; 
                                    setIsImageLoaded(false); 
                                }}
                            />
                            {/* Fallback icon - only visible if image hasn't loaded (either loading or error) */}
                            {!isImageLoaded && <User className='text-gray-400' size={64}/>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Has worked with:
          </h4>
        {/* Trusted Companies Marquee */}
        <TrustedCompaniesMarquee />
    </section>
    );
}) // REMOVED trailing semicolon from React.memo

/**
 * Section 6: Closing CTA (Final Conversion)
 */
const FinalCTASection = React.memo(() => (
  <section id="booking" className={`py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${LIGHT_BACKGROUND}`}>
    <div className="text-center p-12 md:p-20 rounded-2xl bg-gradient-to-br from-pink-600 to-cyan-500 shadow-2xl shadow-pink-500/50 transform-gpu animate-in fade-in zoom-in-95">
      <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
        LET'S DISCUSS YOUR VISION. <span className="block sm:inline-block">LIMITED SPOTS AVAILABLE.</span>
      </h2>
      <p className="text-xl text-white/90 mb-10 max-w-4xl mx-auto">
        Take the first step toward product-market fit, de-risked investment, or structured innovation. Let's see the results, together.
      </p>
      {/* Final CTA Button (Prominent size and hover effect) */}
      <a
        href="https://cal.com/asitdeva" // Placeholder for Calendly link
        target="_blank" rel="RecursiveAxis Website"
        className="inline-flex items-center px-10 py-4 rounded-lg text-xl font-extrabold transition-all duration-300 bg-gray-950 hover:bg-gray-800 text-white shadow-xl shadow-gray-950/50 transform hover:scale-[1.05]"
      >
        Reserve Your Free Discovery Session Now
      </a>
    </div>
  </section>
)) // REMOVED trailing semicolon from React.memo


// ----------------------------------------------------------------------
// --- Dedicated Projects Page View ---
// ----------------------------------------------------------------------

const ProjectsView = React.memo(({ setPage, openFullDescriptionModal }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering Logic: Filters projects based on title or any tag matching the query
  const filteredProjects = projectsData.filter(project => {
    if (!searchQuery) return true; 

    const query = searchQuery.toLowerCase();

    // Check if the project title or any tag includes the query
    const titleMatch = project.title.toLowerCase().includes(query);
    const tagsMatch = project.tags.some(tag => tag.toLowerCase().includes(query));

    return titleMatch || tagsMatch;
  });
    
  return (
    <div className={`min-h-[70vh] py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${DARK_BACKGROUND} ${DARK_TEXT}`}>
      {/* Back to Home Button */}
      <button onClick={() => setPage('home')} className={`inline-flex items-center mb-10 text-lg text-gray-500 hover:text-pink-500 transition-colors`}>
        <ArrowRight className="rotate-180 mr-2" size={20} /> Back to Home
      </button>
      
      <h1 className="text-5xl font-extrabold text-white mb-4">All Projects & Case Studies</h1>
      <p className="text-xl text-cyan-300 mb-10">A deep dive into our most impactful strategic and execution engagements across various sectors.</p>

      {/* Search Bar (Responsive: max-w-xl limits width on large screens) */}
      <div className="relative mb-12 max-w-xl">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects by title or tag (e.g., 'React', 'Blockchain')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500 transition duration-300 shadow-md"
        />
      </div>

      {/* Projects Grid (Responsive: 1, 2, or 3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onReadMore={openFullDescriptionModal}
              />
            ))
        ) : (
            // No results found message
            <div className="lg:col-span-3 text-center py-20 bg-gray-900 rounded-xl border border-gray-700">
                <h3 className="text-3xl font-bold text-pink-400 mb-4">No Projects Found</h3>
                <p className="text-gray-400 text-lg">Try adjusting your search query, or contact us to discuss a new project!</p>
            </div>
        )}
      </div>

      <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to be the next success story?</h3>
          <a
              href="https://cal.com/asitdeva"
              target="_blank" rel="RecursiveAxis Website"
              className={`inline-flex items-center px-6 py-3 rounded-lg text-lg font-bold transition-all duration-300 bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/30`}
          >
              Reserve Your Session
          </a>
      </div>
    </div>
  );
}) // REMOVED trailing semicolon from React.memo

// ----------------------------------------------------------------------
// --- Home Page Wrapper View ---
// ----------------------------------------------------------------------

const HomeView = React.memo(({ openServiceModal, openTextModal, setPage, goToProjects }) => {
    const scrollToServices = () => scrollToSection('services');

    return (
        <>
            <HeroSection scrollToServices={scrollToServices} />
            <ServicesSection openModal={openServiceModal} />
            <ProjectsShowcase goToProjects={goToProjects} />
            <PhilosophySection openTextModal={openTextModal} />
            <TeamSection />
            <FinalCTASection />
        </>
    );
}) // REMOVED trailing semicolon from React.memo

// ----------------------------------------------------------------------
// --- Main App Component ---
// ----------------------------------------------------------------------

const App = () => {
  // State for page routing (simple client-side router)
  const [page, setPage] = useState('home');

  const mainContainerRef = useRef(null); 
  
  // State for Service Detail Modal
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceModalContent, setServiceModalContent] = useState(null);
  
  // State for Generic Text Modal (Philosophy, Legal)
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [textModalContent, setTextModalContent] = useState(null);
  
  // State for Full Project Description Modal
  const [isFullDescriptionModalOpen, setIsFullDescriptionModalOpen] = useState(false);
  const [fullDescriptionModalContent, setFullDescriptionModalContent] = useState(null);


  // Memoized callback handlers for modals for performance optimization
  const handleOpenServiceModal = useCallback((content) => {
    setServiceModalContent(content);
    setIsServiceModalOpen(true);
  }, []);
  const handleCloseServiceModal = useCallback(() => {
    setIsServiceModalOpen(false);
    setServiceModalContent(null);
  }, []);

  const handleOpenTextModal = useCallback((content) => {
    setTextModalContent(content);
    setIsTextModalOpen(true);
  }, []);
  const handleCloseTextModal = useCallback(() => {
    setIsTextModalOpen(false);
    setTextModalContent(null);
  }, []);
  
  const handleOpenFullDescriptionModal = useCallback((content) => {
    setFullDescriptionModalContent(content);
    setIsFullDescriptionModalOpen(true);
  }, []);
  const handleCloseFullDescriptionModal = useCallback(() => {
    setIsFullDescriptionModalOpen(false);
    setFullDescriptionModalContent(null);
  }, []);

  // New function to handle the button click sequence
  const handleGoToProjects = useCallback(() => {
    const container = mainContainerRef.current;
    // Ensure the container element exists before attempting to scroll
    if (container) {
      // 1. SCROLL BEFORE STATE CHANGE (Attempt 1: Synchronous)
      container.scrollTop = 0;

      // 2. SCROLL AFTER STATE CHANGE (Attempt 2: Asynchronous)
      // We use a small delay to ensure the scroll happens AFTER the browser 
      // has registered the new DOM content (ProjectsView) and repositioned the scrollbar.
      setTimeout(() => {
        // Check for the container again, just in case
        if (mainContainerRef.current) {
          mainContainerRef.current.scrollTop = 0;
        }
      }, 50); // A minimal 50ms delay for maximum reliability
    }
  
    // 2. Change Page State (This triggers the ProjectsView to render)
    setPage('projects');
  }, [setPage]); // Dependency on setPage

  useEffect(() => {
    // We only need the hash scroll logic if on the 'home' page. 
    if (page === 'home' && window.location.hash) {
      const id = window.location.hash.substring(1);
  
      // Keep a slight delay for hash scrolling (targets element positioning)
      const hashScrollTimeout = setTimeout(() => scrollToSection(id), 100);
  
      // Cleanup function for the hash scroll timeout only
      return () => {
        clearTimeout(hashScrollTimeout);
      };
    }
    // The scroll-to-top for the 'projects' transition is now handled by handleGoToProjects, 
    // so no other scroll-to-top logic is needed here.
  }, [page]);


  return (
    // Base container set to min-h-screen for full height layout
    <div ref={mainContainerRef} className={`min-h-screen ${page === 'home' ? LIGHT_BACKGROUND : DARK_BACKGROUND} text-white font-sans antialiased`}>
      
      {/* The Header is always visible */}
      <Header setPage={setPage} scrollToSection={scrollToSection} />

      <main>
        {/* Conditional Rendering of Views (Simple Router) */}
        {page === 'home' && (
            <HomeView 
                openServiceModal={handleOpenServiceModal} 
                openTextModal={handleOpenTextModal} 
                setPage={setPage} 
                goToProjects={handleGoToProjects} 
            />
        )}
        {page === 'projects' && (
            <ProjectsView 
                setPage={setPage} 
                openFullDescriptionModal={handleOpenFullDescriptionModal} 
            />
        )}
      </main>

      {/* The Footer is always visible */}
      <Footer openTextModal={handleOpenTextModal} />

      {/* Modals are rendered outside the main content flow */}
      <ServiceModal isOpen={isServiceModalOpen} onClose={handleCloseServiceModal} content={serviceModalContent} />
      <TextModal isOpen={isTextModalOpen} onClose={handleCloseTextModal} content={textModalContent} />
      <FullDescriptionModal project={fullDescriptionModalContent} onClose={handleCloseFullDescriptionModal} />
    </div>
  )
}

export default App;
