import React, { useState, useCallback, useEffect } from 'react';
// Lucide icons are used for a modern, lightweight icon set.
import { Menu, X, ArrowRight, TrendingUp, Zap, Users, ShieldCheck, HardHat, Link, Globe, Briefcase, User, BookOpen, Tag, Search } from 'lucide-react';

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
const LOGO_PATH = `${process.env.PUBLIC_URL}/assets/StorylineDS_Logo_NoBackground_AccentColor.png`;
const HERO_BG_PATH = `${process.env.PUBLIC_URL}/assets/Storyline_Background_Dark.png`;
const FOUNDER_IMAGE_PATH = `${process.env.PUBLIC_URL}/assets/TeamProfilePic_Asit.jpeg`; // Placeholder (Update with actual ID)

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
    segment: 'Founders',
    icon: HardHat,
    headline: 'ACHIEVE PRODUCT-MARKET FIT. FASTER.',
    body: 'Missing an executive tech or product leader? We plug in with interim CPO/CTO services and provide execution-focused project delivery to accelerate your runway.',
    tagline: 'MAXIMIZE RUNWAY. MINIMIZE ITERATION. EXPERT EXECUTION.',
    modalTitle: 'Interim Leadership & Execution for Founders',
    modalBulletPoints: [
        "Interim CTO/CPO Placement: Expert guidance from strategy to roadmapping.",
        "Execution-focused Project Delivery: Accelerate development velocity with senior resources.",
        "Technical Debt Reduction: Audits and remediation plans to stabilize the platform.",
        "Due Diligence Preparation: Readying your technology for investor scrutiny.",
    ],
    modalCta: 'Book a Strategy Session',
    ctaLink: '#booking'
  },
  {
    segment: 'Investors',
    icon: ShieldCheck,
    headline: 'DE-RISK YOUR INVESTMENTS AND SCALE PORTFOLIO VALUE.',
    body: 'Gain critical technical clarity on potential deals with our deep technical due diligence. Extend our expertise to your portfolio for immediate strategic value.',
    tagline: 'CRITICAL CLARITY. CONFIDENT INVESTMENT. EXPERT ADVISORY.',
    modalTitle: 'Technical Due Diligence & Portfolio Support',
    modalBulletPoints: [
        "Deep Technical Diligence: Unbiased review of code, architecture, team, and scalability.",
        "Valuation Strategy: Identify and mitigate technical risks post-acquisition.",
        "Portfolio Value Acceleration: Specialized advisory for technical leadership gaps in portfolio companies.",
        "Exit Readiness Audits: Ensuring tech stack is optimized for maximum valuation upon sale.",
    ],
    modalCta: 'Request Due Diligence Scope',
    ctaLink: '#booking'
  },
  {
    segment: 'Corporates',
    icon: Users,
    headline: 'EMPOWER INTERNAL INNOVATION THROUGH STRUCTURED PROGRAMS.',
    body: 'Give your teams a structured, efficient way to innovate. We provide expert program design, training, and consultation to build lasting internal capability.',
    tagline: 'FROM IDEA TO IPO. BUILD INTERNAL CAPABILITY.',
    modalTitle: 'Structured Innovation & Training Programs',
    modalBulletPoints: [
        "Innovation Program Design: Establishing agile, product-focused teams and processes.",
        "Technical Training: Customized workshops for senior engineers and architects.",
        "Structured Consultation: Mentorship for internal product managers and innovators.",
        "In-House Venture Design: Frameworks to validate and spin out new internal ventures.",
    ],
    modalCta: 'Explore Program Options',
    ctaLink: '#booking'
  },
];

// Data structure for the Philosophy section (D.I.V.E. Framework)
const DIVE_FRAMEWORK = [
  { 
    letter: 'D', icon: TrendingUp, title: 'Decision', description: 'Hypothesis-Led Strategy', 
    modalTitle: 'D: Decision - Hypothesis-Led Strategy', 
    modalBody: [
        "The Strategy: Why we build what we build.",
        "Our work always begins with strategy, not code. We combine our technical expertise and market knowledge to build sharp, data-backed hypotheses about the market need and the most viable solution. This systematic approach ensures that every resource is targeted at the highest-leverage problem, giving your project a clear strategic axis and defining the most efficient path forward."
    ]
  },
  { 
    letter: 'I', icon: Zap, title: 'Iteration', description: 'Velocity-Focused Design', 
    modalTitle: 'I: Iteration - Velocity-Focused Design', 
    modalBody: [
        "The Process: How we build and learn fast.",
        "Our methodology is built on speed and quality. We design highly testable, user-centric experiences that allow for rapid and high-quality cycles. We leverage our scalable methods to quickly test core assumptions, resulting in maximized learning and significantly reduced time-to-market for every feature and product. This is how we ensure speed is not reckless."
    ]
  },
  { 
    letter: 'V', icon: ShieldCheck, title: 'Verification', description: 'Analytics-Driven Learning', 
    modalTitle: 'V: Verification - Analytics-Driven Learning', 
    modalBody: [
        "The Rigor: How we know it's working.",
        "We install rigorous data analytics and measurement frameworks from the start. This process confirms that the results of your iterative efforts are driving measurable business growth, not just activity. We verify every learning and pivot with hard data, giving investors and stakeholders the critical clarity and confidence needed to commit to the next phase."
    ]
  },
  { 
    letter: 'E', icon: HardHat, title: 'Execution', description: 'Scalable Delivery', 
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
  { name: 'TCS', url: 'https://www.tcs.com/' , logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Tata_Consultancy_Services_old_logo.svg/2560px-Tata_Consultancy_Services_old_logo.svg.png' },
  { name: 'Equifax', url: 'https://www.equifax.ca/canada/equifax/b_en.html', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Equifax_Logo.svg/2560px-Equifax_Logo.svg.png' },
  { name: 'J&J', url: 'https://www.jnj.com/', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Johnson_and_Johnson_Logo.svg' },
  { name: 'Siemens', url: 'https://www.siemens.com/global/en.html', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Siemens_AG_logo.svg' },
  { name: 'PUDO', url: 'https://www.amazon.com/' /* , logo: '/logos/amazon.png' */ },
  { name: 'Ignite AI', url: 'https://www.meta.com/', logo: '/logos/meta.png' },
  { name: 'YorkU', url: 'https://www.netflix.com/' /* , logo: '/logos/netflix.png' */ },
  { name: 'Kare Granola', url: 'https://www.microsoft.com/', logo: '/logos/microsoft.png' },
  { name: 'StartupFuel', url: 'https://www.spacex.com/' /* , logo: '/logos/spacex.png' */ },
  { name: 'Innovation Factory', url: 'https://www.apple.com/', logo: '/logos/apple.png' },
  { name: 'FutureSight', url: 'https://www.ibm.com/' /* , logo: '/logos/ibm.png' */ },
  { name: 'Untrap', url: 'https://www.intel.com/' /* , logo: '/logos/intel.png' */ },
  { name: 'Addie', url: 'https://www.intel.com/' /* , logo: '/logos/intel.png' */ },
  { name: 'CaringAI', url: 'https://www.intel.com/' /* , logo: '/logos/intel.png' */ }
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

/**
 * --- Project Data ---
 * NOTE: Each project must have a maximum of 3 tags.
 * The 'image' field is optional but highly recommended for visual appeal.
 */
const projectsData = [
    {
      id: 1,
      title: 'Quantum Leap Computing Platform',
      description: 'Developed a novel, distributed computing platform utilizing custom-built quantum simulation algorithms. This project involved designing a fault-tolerant architecture capable of processing petabytes of data for molecular modeling and pharmaceutical discovery. The results showed a 400% increase in simulation speed compared to conventional supercomputers. This is a very long description to ensure the "Read More" feature is properly tested and utilized. It details the complex technical challenges, the innovative solutions implemented, and the measurable impact on the industry, which is crucial for project showcasing.',
      tags: ['React', 'TypeScript', 'Quantum'], 
      image: 'https://placehold.co/600x400/1e293b/cbd5e1?text=Quantum+Leap',
      color: 'pink', 
    },
    {
      id: 2,
      title: 'Eco-System Monitoring Dashboard',
      description: 'A real-time data visualization tool for environmental metrics. Integrates satellite imagery and IoT sensor data to track deforestation, water quality, and biodiversity indicators across six continents. Built for rapid deployment and easy accessibility for NGOs and government agencies.',
      tags: ['D3.js', 'Python', 'Environmental'], 
      image: 'https://placehold.co/600x400/1e293b/cbd5e1?text=Eco+Dashboard',
      color: 'cyan',
    },
    {
      id: 3,
      title: 'Decentralized Identity Protocol',
      description: 'Designed and implemented a secure, self-sovereign identity verification system on a private blockchain. Focus was placed on privacy-by-design principles and regulatory compliance (GDPR, CCPA).',
      tags: ['Solidity', 'Blockchain', 'Security'], 
      image: 'https://placehold.co/600x400/1e293b/cbd5e1?text=ID+Protocol',
      color: 'green',
    },
    {
      id: 4,
      title: 'Minimalist Task Manager',
      description: 'A simple, elegant, and highly performant task management application for desktop users, emphasizing keyboard-only navigation.',
      tags: ['Electron', 'Vue.js', 'Desktop'], 
      color: 'purple',
    },
    {
        id: 5,
        title: 'Global Payment Gateway Integration', 
        description: 'Architected a secure, multi-region payment solution handling $100M+ transactions. Implemented a microservices architecture to ensure high availability and scalability across global financial markets, reducing transaction latency by 15%.', 
        tags: ['Fintech', 'Architecture', 'Security'], 
        color: 'yellow' 
    }, 
    {
        id: 6,
        title: 'Decentralized Voting System Pilot', 
        description: 'Conducted a feasibility study and built a secure, verifiable pilot system for internal governance. This required deep cryptographic knowledge and front-end development to ensure user trust and verifiable audit trails.', 
        tags: ['Governance', 'Blockchain', 'Pilot'], 
        color: 'fuchsia' 
    }
];

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
        // Modal Overlay (Responsive: fixed, full screen, centered content)
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/90 backdrop-blur-sm transition-opacity duration-300"
            aria-modal="true"
            role="dialog"
            onClick={onClose}
        >
            <div
                // Modal Content Container (Responsive: max width, max height, scrollable)
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-gray-900 shadow-2xl transform transition-transform duration-300 scale-100 border border-gray-700"
                onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
            >
                <div className="p-6 sm:p-8">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-200 p-2 rounded-full hover:bg-gray-800"
                        aria-label="Close modal"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <h2 className="text-3xl font-extrabold text-pink-400 mb-4 border-b border-pink-600 pb-2">
                        {project.title}
                    </h2>

                    {/* Tags */}
                    <div className="flex flex-wrap mb-4">
                        {project.tags.map((tag, index) => (
                            <TagPill key={index} text={tag} />
                        ))}
                    </div>
                    
                    {/* Full Description - using whitespace-pre-wrap for cleaner paragraph formatting */}
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{project.description}</p>

                    {/* Project Image - Responsive and with error fallback */}
                    {project.image && (
                        <img
                            src={project.image}
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
            {project.image && (
                <div className="h-48 overflow-hidden">
                    <img
                        src={project.image}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/90 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl max-w-xl w-full p-8 transition-transform duration-300 scale-100 transform-gpu animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        <div className="flex justify-between items-start mb-6">
          <h3 className={`text-2xl font-bold ${PRIMARY_ACCENT}`}>{content.modalTitle}</h3>
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
        <a href={content.ctaLink} onClick={onClose} className={`w-full block text-center font-bold py-3 px-6 rounded-lg ${DARK_BACKGROUND} border border-pink-500 text-white transition-all duration-300 hover:bg-pink-500 hover:text-gray-950`}>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/90 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white border border-gray-300 rounded-xl shadow-2xl max-w-xl w-full p-8 transition-transform duration-300 scale-100 transform-gpu animate-in fade-in zoom-in-95"
                onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
            >
                <div className="flex justify-between items-start mb-6">
                    <h3 className={`text-2xl font-bold ${LIGHT_TEXT}`}>{content.title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                {/* Handles content which can be a single string or array of strings (for paragraphs) */}
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
      setTimeout(() => scrollToSection(id), 10);
    }
  }, [setPage, scrollToSection]);

  return (
    <header className={`sticky top-0 z-40 w-full ${DARK_BACKGROUND} border-b border-gray-800/50 backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo/Brand (Always visible) */}
        <button onClick={() => setPage('home')} className="flex items-center space-x-2 text-white transition-opacity hover:opacity-80">
          <img src={LOGO_PATH} alt="Recursive Axis Logo" className={`h-8`} />
          <span className="text-xl font-extrabold tracking-tight">Recursive Axis</span>
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
          <a href="#booking" className={`ml-8 px-5 py-2 rounded-lg font-bold transition-all duration-300 bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/30`}>
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
                className="text-lg text-gray-300 hover:text-white text-left py-2 border-b border-gray-800"
              >
                {link.name}
              </button>
            ))}
            <a href="#booking" onClick={() => setIsMenuOpen(false)} className={`w-full text-center font-bold py-3 rounded-lg mt-4 transition-all duration-300 bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/30`}>
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
  <footer className={`${DARK_BACKGROUND} border-t border-gray-800/50 mt-20`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-gray-500 text-sm">
      {/* Footer Navigation - Uses buttons to trigger text modals for legal content */}
      <div className="flex justify-center space-x-4 mb-4 flex-wrap">
        <a href="#services" onClick={() => scrollToSection('services')} className="hover:text-pink-500 transition-colors">Services</a>
        <a href="#philosophy" onClick={() => scrollToSection('philosophy')} className="hover:text-pink-500 transition-colors">Philosophy</a>
        <a href="#projects" onClick={() => scrollToSection('projects')} className="hover:text-pink-500 transition-colors">Projects</a>
        <button onClick={() => openTextModal({title: "Terms of Service", body: ["These are our terms of service. By using this website, you agree to our policies. This is placeholder text for the purpose of demonstrating the functionality. Actual terms will be provided upon engagement.", "This document is subject to change without notice. Please contact us for the latest version."]})
        } className="hover:text-pink-500 transition-colors">Terms of Service</button>
        <button onClick={() => openTextModal({title: "Privacy Policy", body: ["Your privacy is critically important to us. Our policy is to respect your privacy regarding any information we may collect while operating our websites. We do not share your information with third parties without your explicit consent. This is placeholder text for demonstration.", "Data collected is used solely for the purpose of improving our services and communication with you."]})
        } className="hover:text-pink-500 transition-colors">Privacy Policy</button>
      </div>
      <p>&copy; {new Date().getFullYear()} Recursive Axis. All rights reserved. | Strategic Partner for Innovation.</p>
    </div>
  </footer>
)) // REMOVED trailing semicolon from React.memo

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
      backgroundSize: '150px',
      backgroundRepeat: 'repeat',
      backgroundBlendMode: 'overlay', // Blends the pattern with the solid color
      backgroundColor: '#0A0A0A',
      backgroundPosition: 'center',
    }}
  >
    {/* Dark Overlay for text legibility */}
    <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm"></div>
    
    <div className="relative z-10 max-w-4xl text-center px-4">
      {/* H1: Fully responsive font sizes (text-4xl up to lg:text-7xl) */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tighter animate-in fade-in duration-1000">
        Your Strategic Partner for Effective and <span className={SECONDARY_ACCENT}>Efficient Innovation.</span>
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
 * Section 3: Our Core Philosophy (The D.I.V.E. Framework)
 */
const PhilosophySection = React.memo(({ openTextModal }) => (
  <section id="philosophy" className={`py-20 md:py-32 bg-gray-50 border-t border-b border-gray-200 ${LIGHT_TEXT}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h3 className={`text-sm tracking-widest uppercase font-bold mb-3 ${SECONDARY_ACCENT}`}>Our Blueprint</h3>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Our Core Philosophy: The D.I.V.E. Framework.</h2>
      </div>

      {/* Responsive Grid Layout (4 columns desktop) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {DIVE_FRAMEWORK.map((item, index) => (
          <button
            key={item.letter}
            onClick={() => openTextModal({title: item.modalTitle, body: item.modalBody})}
            className="text-center p-6 border border-gray-200 rounded-xl shadow-lg bg-white transition-all duration-300 hover:shadow-cyan-200 hover:border-cyan-500 transform hover:-translate-y-0.5"
          >
            <div className={`text-5xl font-extrabold mb-4 ${PRIMARY_ACCENT}`}>{item.letter}</div>
            <item.icon className={`${SECONDARY_ACCENT} mx-auto mb-4`} size={32} />
            <h4 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h4>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </button>
        ))}
      </div>
    </div>
  </section>
)) // REMOVED trailing semicolon from React.memo

/**
 * Section 4: Recent Projects Showcase (Limited to 4 items)
 */
const ProjectsShowcase = React.memo(({ setPage }) => {
    // Show only the first 4 projects for the homepage showcase
    const showcaseProjects = projectsData.slice(0, 4);

    return (
        <section id="projects" className={`py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${LIGHT_BACKGROUND} ${LIGHT_TEXT}`}>
            <div className="text-center mb-16">
                <h3 className={`text-sm tracking-widest uppercase font-bold mb-3 ${PRIMARY_ACCENT}`}>Social Proof</h3>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Recent Projects: Evidence of Our Impact</h2>
                <p className="text-gray-600 mt-4 max-w-3xl mx-auto">See how we've partnered with leaders to turn complex challenges into elegant, scalable outcomes.</p>
            </div>

            {/* Responsive Grid Layout (2 columns mobile, 4 columns desktop) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {showcaseProjects.map((project) => {
                    const colors = PROJECT_COLORS[project.color];
                    return (
                        <div
                            key={project.id}
                            className={`bg-white p-6 rounded-xl border ${colors.border} shadow-lg transition-all duration-300 hover:shadow-xl hover:${colors.shadow}`}
                        >
                            <div className={`h-16 w-16 mb-4 rounded-lg ${colors.iconBg} flex items-center justify-center`}>
                                <Globe className={colors.iconText} size={28} />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h4>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {project.description.substring(0, 90)}...
                            </p>
                            {/* Tags display at the bottom of the card */}
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
                    onClick={() => setPage('projects')}
                    className={`inline-flex items-center font-bold text-lg ${SECONDARY_ACCENT} hover:text-cyan-800 transition-colors`}
                >
                    Explore All Projects & Case Studies <ArrowRight className="ml-2" size={20} />
                </button>
            </div>
        </section>
    );
}) // REMOVED trailing semicolon from React.memo

/**
 * Section 5: Meet The Team & Trusted Companies Marquee (Dark Background)
 */
const TeamSection = React.memo(() => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // Component for the horizontally scrolling company logos
const TrustedCompaniesMarquee = () => (
  <div className="relative w-full overflow-hidden whitespace-nowrap py-4 border-y border-gray-700 mt-8">
      <style jsx="true">{`
          /* CSS for the infinite horizontal scroll effect */
          @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
          }
          .marquee {
              display: flex;
              width: 200%; /* Double width to allow smooth looping */
              animation: marquee 30s linear infinite;
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
              max-height: 2rem; /* Adjust this value as needed for logo size */
              width: auto;
              opacity: 0.5; /* Initial opacity for a subtle look */
              transition: opacity 0.3s, transform 0.3s;
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
                              target="_blank"
                              rel="noopener noreferrer"
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
        <section className={`py-20 md:py-32 ${DARK_BACKGROUND} border-t border-b border-gray-800`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                target="_blank"
                                rel="noopener noreferrer"
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
        href="#" // Placeholder for Calendly link
        target="_blank"
        rel="noopener noreferrer"
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
          <h3 className="text-2xl font-bold text-white mb-4">Ready to be our next success story?</h3>
          <a
              href="#booking"
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

const HomeView = React.memo(({ openServiceModal, openTextModal, setPage }) => {
    const scrollToServices = () => scrollToSection('services');

    return (
        <>
            <HeroSection scrollToServices={scrollToServices} />
            <ServicesSection openModal={openServiceModal} />
            <PhilosophySection openTextModal={openTextModal} />
            <ProjectsShowcase setPage={setPage} />
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

  // EFFECT: Handles page change and scroll position (Ensures view starts at top)
  useEffect(() => {
    // Scroll to the top immediately upon page state change (important for mobile UX)
    window.scrollTo(0, 0);

    // If on the home page and a hash exists, try to scroll to that section.
    if (page === 'home' && window.location.hash) {
      const id = window.location.hash.substring(1);
      // Short delay to wait for the DOM to fully render the home view
      setTimeout(() => scrollToSection(id), 100);
    }
  }, [page]); // Dependency on 'page' state


  return (
    // Base container set to min-h-screen for full height layout
    <div className={`min-h-screen ${page === 'home' ? LIGHT_BACKGROUND : DARK_BACKGROUND} text-white font-sans antialiased`}>
      
      {/* The Header is always visible */}
      <Header setPage={setPage} scrollToSection={scrollToSection} />

      <main>
        {/* Conditional Rendering of Views (Simple Router) */}
        {page === 'home' && (
            <HomeView 
                openServiceModal={handleOpenServiceModal} 
                openTextModal={handleOpenTextModal} 
                setPage={setPage} 
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
