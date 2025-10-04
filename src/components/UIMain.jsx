// src/components/UIMain.jsx

import React from 'react';

// Color Palette
export const colors = {
  background: '#0a0a0a',
  text: '#ffffff',
  primary: '#00eaff',
  secondary: '#ff00ff',
  cardBg: 'rgba(255, 255, 255, 0.05)',
  cardBorder: 'rgba(255, 255, 255, 0.15)',
  mutedText: '#a0a0a0',
};

// Inline SVGs for icons and logo
export const CodeSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
export const DesignSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);
export const DataSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="12" width="6" height="8" rx="1" /><rect x="9" y="8" width="6" height="12" rx="1" /><rect x="15" y="4" width="6" height="16" rx="1" />
  </svg>
);
export const LogoSVG = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Data
export const serviceData = [
  {
    title: 'FOUNDERS & STARTUPS',
    description: 'Accelerate your vision from an idea to a market-ready product, providing the technical leadership and support you need to succeed.',
    offerings: ['CTO/CPO Office', 'Fundraising', 'Prototyping', 'AI Agents & Automation'],
    icon: <img src="https://placehold.co/100x100/1a1a1a/fff?text=FOUNDER" alt="Founder Icon" className="w-16 h-16" />,
    tagline: 'BRINGING YOUR VISION TO LIFE'
  },
  {
    title: 'INVESTORS & VCS',
    description: 'De-risk your investments and ensure portfolio companies are built on a solid technical foundation with our expert due diligence and strategic guidance.',
    offerings: ['Tech Due-Diligence', 'De-risk Portfolio Growth', 'System Design & Architecture'],
    icon: <img src="https://placehold.co/100x100/1a1a1a/fff?text=INVESTOR" alt="Investor Icon" className="w-16 h-16" />,
    tagline: 'MAPPING YOUR MISSION TO ACTIONS'
  },
  {
    title: 'ENTERPRISE & CORPORATE',
    description: 'Scale innovation and drive digital transformation with bespoke strategies, robust governance models, and hands-on innovation programs.',
    icon: <img src="https://placehold.co/100x100/1a1a1a/fff?text=ENTERPRISE" alt="Enterprise Icon" className="w-16 h-16" />,
    tagline: 'SCALING INNOVATION'
  },
];

export const philosophyData = {
  code: { heading: 'Our Core Philosophy', title: 'CODE', description: 'Powerful, efficient, and scalable code that forms the backbone of all innovation.', icon: <CodeSVG />, bgClass: 'bg-black bg-grid-white/[0.05]' },
  design: { heading: 'Our Core Philosophy', title: 'DESIGN', description: 'Intuitive and elegant design that puts the user experience at the forefront of every product.', icon: <DesignSVG />, bgClass: 'bg-black bg-[radial-gradient(ellipse_at_center,rgba(0,234,255,0.1),transparent_70%)]' },
  data: { heading: 'Our Core Philosophy', title: 'DATA', description: 'Insightful, actionable data that informs every decision and drives progress forward.', icon: <DataSVG />, bgClass: 'bg-black bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,0,255,0.1)_10%,transparent_50%)]' },
};

export const companies = [
  { name: 'Siemens', logoUrl: 'https://placehold.co/180x90/333/fff?text=SIEMENS' },
  { name: 'Equifax', logoUrl: 'https://placehold.co/180x90/333/fff?text=EQUIFAX' },
  { name: 'York University', logoUrl: 'https://placehold.co/180x90/333/fff?text=YORK+U' },
  { name: 'Untrap', logoUrl: 'https://placehold.co/180x90/333/fff?text=UNTRAP' },
  { name: 'Pudo Point', logoUrl: 'https://placehold.co/180x90/333/fff?text=PUDO+POINT' },
  { name: 'Ignite AI', logoUrl: 'https://placehold.co/180x90/333/fff?text=IGNITE+AI' },
  { name: 'Siemens 2', logoUrl: 'https://placehold.co/180x90/333/fff?text=SIEMENS' },
  { name: 'Equifax 2', logoUrl: 'https://placehold.co/180x90/333/fff?text=EQUIFAX' },
  { name: 'York University 2', logoUrl: 'https://placehold.co/180x90/333/fff?text=YORK+U' },
  { name: 'Untrap 2', logoUrl: 'https://placehold.co/180x90/333/fff?text=UNTRAP' },
  { name: 'Pudo Point 2', logoUrl: 'https://placehold.co/180x90/333/fff?text=PUDO+POINT' },
  { name: 'Ignite AI 2', logoUrl: 'https://placehold.co/180x90/333/fff?text=IGNITE+AI' },
];