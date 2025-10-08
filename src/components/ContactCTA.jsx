// src/components/ContactCTA.jsx

import React from 'react';
import { motion } from 'framer-motion'; // Keep motion for the h2 title
import { colors } from './UIMain';

// --- START: Footer Component Definition (unchanged, still inside this file) ---
const FOOTER_BG_IMAGE_URL = '${process.env.PUBLIC_URL}/assets/Storyline_Background_Dark.png'; 

const Footer = () => {
    const FOOTER_HEIGHT_CLASS = 'h-[15vh]'; 
    const DARK_OVERLAY_CLASS = 'absolute inset-0 bg-black opacity-95'; 

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
  // 1. REMOVED: bg-radiant-pulse from the section.
  <section 
    id="contact" 
    ref={ref} 
    className="min-h-screen text-gray-800 flex flex-col justify-between " // NOTE: No bg-radiant-pulse here
  >
    
    {/* 2. ADDED: bg-radiant-pulse to the inner div for the pulsing background effect.
       This div now contains the background and the content, but EXCLUDES the Footer. */}
    <div className="w-full relative z-10 flex flex-col items-center justify-center flex-grow p-4"> 
      
      {/* The motion.h2 is unchanged and still animates */}
      <motion.h2
        className="text-4xl md:text-6xl font-extrabold text-center mb-4 animated-gradient bg-radiant-pulse"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        SIGN-UP FOR DISCOVERY CALL, NOW.
      </motion.h2>

      {/* Subtext and Buttons are unchanged and static */}
      <p className={`text-base md:text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12`}>
        Lets put some life to your vision and see the results.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
        {/* ... buttons ... */}
      </div>
    </div>

    {/* Footer is completely static and outside the pulsing area */}
    <Footer />
  </section>
));

export default ContactCTA;