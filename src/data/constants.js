// src/data/constants.js
import { Zap, Briefcase, BookOpen, Mail } from 'lucide-react';

export const LIGHT_BACKGROUND = 'bg-white';
export const DARK_BACKGROUND = 'bg-gray-950';
export const LIGHT_TEXT = 'text-gray-900';
export const DARK_TEXT = 'text-white';
export const PRIMARY_ACCENT = 'text-pink-600';
export const SECONDARY_ACCENT = 'text-cyan-700';

export const SIMPLE_LOGO_PATH = `/assets/RA_MiniLogo.png`;
export const LOGO_PATH = `/assets/RA_FullLogo_Dark.png`;
export const HERO_BG_PATH = `/assets/RA_Dark_Background.png`;
export const FOUNDER_IMAGE_PATH = `/assets/TeamProfilePic_Asit.jpeg`;

export const BLOG_URL = 'https://blog.recursiveaxis.com/';
export const CONTACT_EMAIL = "hello@recursiveaxis.com";
export const DESCRIPTION_LIMIT = 150;

// Project Card Color Mapping
export const PROJECT_COLORS = {
    pink: { iconBg: 'bg-pink-50', iconText: 'text-pink-600', shadow: 'shadow-pink-100', border: 'border-pink-200' },
    cyan: { iconBg: 'bg-cyan-50', iconText: 'text-cyan-600', shadow: 'shadow-cyan-100', border: 'border-cyan-200' },
    green: { iconBg: 'bg-green-50', iconText: 'text-green-600', shadow: 'shadow-green-100', border: 'border-green-200' },
    purple: { iconBg: 'bg-purple-50', iconText: 'text-purple-600', shadow: 'shadow-purple-100', border: 'border-purple-200' },
    yellow: { iconBg: 'bg-yellow-50', iconText: 'text-yellow-600', shadow: 'shadow-yellow-100', border: 'border-yellow-200' },
    fuchsia: { iconBg: 'bg-fuchsia-50', iconText: 'text-fuchsia-600', shadow: 'shadow-fuchsia-100', border: 'border-fuchsia-200' },
};

// Navigation links for the Header
export const NAV_LINKS = [
  { name: 'Services', type: 'internal', href: '/services', icon: Zap },
  { name: 'Projects', type: 'page', href: '/projects', icon: Briefcase },
  { name: 'Blog', type: 'external', href: BLOG_URL, icon: BookOpen },
  { name: 'Contact', type: 'internal', href: '/contact', icon: Mail },
];

// FAQ Data
export const FAQ_DATA = [
  {
    question: "What is Technical Due Diligence for AI?",
    answer: "Technical Due Diligence for AI is an unbiased, deep review of AI assets, software viability, and execution capability. It removes market uncertainty by providing investors with technical certainty and clear signals regarding the value of the technology."
  },
  {
    question: "How does Recursive Axis accelerate Product-Market Fit (PMF)?",
    answer: "We use a PMF Acceleration Strategy powered by logical experimentation and data-driven decision-making. We help founders replace guesswork with a disciplined process to find the most viable solution for their market need."
  },
  {
    question: "What is the role of an Interim CPO/CTO?",
    answer: "An Interim CPO/CTO provides world-class, battle-tested leadership to a company without the permanent hiring risk. They handle strategic planning, system design, and technical leadership, bridging the gap until a permanent hire is found."
  },
  {
    question: "What is the D.I.V.E. Framework?",
    answer: "The D.I.V.E. Framework is our proprietary four-stage methodology—Decision, Iteration, Verification, and Execution—designed to move a project from a vague idea to a scalable, verified business outcome with minimal wasted resources."
  }
];

// Trusted Companies
export const TRUSTED_COMPANIES = [
  { name: 'TCS', url: 'https://www.tcs.com/' , logo: `/assets/asit_logos/TCS_logo.png` },
  { name: 'Equifax', url: 'https://www.equifax.ca/canada/equifax/b_en.html', logo: `/assets/asit_logos/Equifax_Logo.png` },
  { name: 'J&J', url: 'https://www.jnj.com/', logo: `/assets/asit_logos/JnJ_Logo.png` },
  { name: 'Siemens', url: 'https://www.siemens.com/global/en.html', logo: `/assets/asit_logos/Siemens_logo.png` },
  { name: 'PUDO', url: 'https://pudopoint.com/'  , logo: `/assets/asit_logos/PUDO_logo.png` },
  { name: 'Ignite AI', url: "https://www.linkedin.com/company/ignite-ai/posts" },
  { name: 'YorkU', url: 'https://www.yorku.ca/' , logo: `/assets/asit_logos/York_U_Logo.png` },
  { name: 'Kare Granola', url: 'https://karegranola.com/', logo: `/assets/asit_logos/Kare_Granola.png` },
  { name: 'StartupFuel', url: 'https://www.startupfuel.com/' , logo: `/assets/asit_logos/Startup-Fuel.png` },
  { name: 'Innovation Factory', url: 'https://innovationfactory.ca/', logo: `/assets/asit_logos/iF_Logo.png` },
  { name: 'FutureSight', url: 'https://futuresight.ventures/' , logo: `/assets/asit_logos/FutureSight_Logo.png` },
  { name: 'Untrap', url: 'https://getuntrap.com/' , logo: `/assets/asit_logos/Untrap_logo.png` },
  { name: 'Addie', url: 'https://getaddie.com/' , logo: `/assets/asit_logos/Addie_Logo.png` },
  { name: 'CaringAI', url: 'https://getcaring.ai/' , logo: `/assets/asit_logos/CaringAI_logo.png` },
  { name: 'Mercata', url: 'https://mercataintel.com/' , logo: `/assets/asit_logos/Mercata_Logo.png` }
];

// Partner/Founder details
export const PARTNER_DATA = [
    {
        name: 'Asit Deva',
        title: 'Founder & Principal',
        copy: 'Asit Deva is a seasoned expert dedicated to helping businesses navigate the complexities of technology and innovation. With a passion for building, advising, and strategizing, he transforms ideas into tangible, successful products.',
        linkedin: 'https://www.linkedin.com/in/asitkdeva/',
        isFounder: true,
    }
];
