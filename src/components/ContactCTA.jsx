// src/components/ContactCTA.jsx

import React from 'react';
import { motion } from 'framer-motion'; // Keep motion for the h2 title
import { colors } from './UIMain';

// --- START: Footer Component Definition (unchanged, still inside this file) ---
const FOOTER_BG_IMAGE_URL = '${process.env.PUBLIC_URL}/assets/Storyline_Background_Dark.png'; 

const Footer = () => {
    const FOOTER_HEIGHT_CLASS = 'h-[15vh]'; 
    const DARK_OVERLAY_CLASS = 'absolute inset-0 bg-black opacity-80'; 

    return (
        <footer 
            className={`w-full relative text-gray-400 flex items-center justify-center text-center text-sm overflow-hidden ${FOOTER_HEIGHT_CLASS}`}
            style={{ 
                backgroundImage: `url('${FOOTER_BG_IMAGE_URL}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className={DARK_OVERLAY_CLASS}></div>
            <div className="relative z-10 p-4">
                <p>&copy; {new Date().getFullYear()} Recursive Axis. All rights reserved.</p>
                <div className='flex justify-center space-x-4 mt-2'>
                    <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
// --- END: Footer Component Definition ---


const ContactCTA = React.forwardRef((props, ref) => (
  <section 
    id="contact" 
    ref={ref} 
    className="min-h-screen bg-radiant-pulse text-gray-800 flex flex-col justify-between p-4" // Added p-4 for general padding
  >
    {/* Main content container for CTA (NO motion here) */}
    <div className="w-full relative z-10 flex flex-col items-center justify-center flex-grow">
      
      {/* ONLY THE H2 IS A motion.h2 */}
      <motion.h2
        className="text-4xl md:text-6xl font-extrabold text-center mb-4 animated-gradient"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        SIGN-UP FOR DISCOVERY CALL, NOW.
      </motion.h2>

      {/* Subtext (standard p, no motion) */}
      <p className={`text-base md:text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12`}>
        Lets put some life to your vision and see the results.
      </p>

      {/* Buttons (standard div, no motion) */}
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
        <a
          href="https://cal.com/asitdeva"
          target="_blank"
          rel="noopener noreferrer"
          className={`px-10 py-4 bg-[${colors.primary}] text-black text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-opacity-90 transform-gpu`}
        >
          Book a Call Today
        </a>
        <a
          href="mailto:ASITDEVA.TORONTO@GMAIL.COM"
          className={`px-10 py-4 bg-[${colors.secondary}] text-black text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl transform-gpu`}
        >
          Send an Email
        </a>
      </div>
    </div>

    {/* Footer is completely separate and static */}
    <Footer />
  </section>
));

export default ContactCTA;