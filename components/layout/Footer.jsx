'use client';
import React from 'react';
import { Mail } from 'lucide-react';
import { DARK_BACKGROUND, HERO_BG_PATH, CONTACT_EMAIL, PRIMARY_ACCENT } from '../data/constants';

const Footer = ({ openTextModal }) => (
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

    {/* Dark Overlay for text legibility */}
    <div className="absolute inset-0 bg-gray-950/75"></div>

    {/* CONTENT LAYER (relative z-10) */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-gray-500 text-sm relative z-10">
      {/* Footer Navigation - Uses buttons to trigger text modals for legal content */}
      <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center justify-center space-x-2 text-gray-400 hover:text-pink-500 transition-colors font-semibold text-base mb-4">
          <Mail size={16} className={PRIMARY_ACCENT.replace('text-', 'text-')} />
          <span>{CONTACT_EMAIL}</span>
      </a>
      <div className="flex justify-center space-x-4 mb-4 flex-wrap">
        <button onClick={() => openTextModal({title: "Terms of Service", body: ["These are our terms of service. By using this website, you agree to our policies. This is placeholder text for the purpose of demonstrating the functionality. Actual terms will be provided upon engagement.", "This document is subject to change without notice. Please contact us for the latest version."]})}
        className="px-3 py-2 hover:text-pink-500 transition-colors">Terms of Service</button>
        <button onClick={() => openTextModal({title: "Privacy Policy", body: ["Your privacy is critically important to us. Our policy is to respect your privacy regarding any information we may collect while operating our websites. We do not share your information with third parties without your explicit consent. This is placeholder text for demonstration.", "Data collected is used solely for the purpose of improving our services and communication with you."]})}
        className="px-3 py-2 hover:text-pink-500 transition-colors">Privacy Policy</button>
      </div>
      <p>&copy; {new Date().getFullYear()} Recursive Axis. All rights reserved. | Strategic Partner for Innovation.</p>
    </div>
  </footer>
);

export default Footer;
