// src/components/ContactCTA.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { colors } from './UIMain';

// --- START: Footer Component Definition (unchanged) ---
const FOOTER_BG_IMAGE_URL = `${process.env.PUBLIC_URL}/assets/Storyline_Background_Dark.png`; 

const Footer = () => {
    const FOOTER_HEIGHT_CLASS = 'h-[15vh]'; 
    const DARK_OVERLAY_CLASS = 'absolute inset-0 bg-black opacity-10'; // Reduced opacity

    return (
        <footer 
            className={`w-full relative text-white flex items-center justify-center text-center text-sm overflow-hidden ${FOOTER_HEIGHT_CLASS}`} 
            style={{ 
                backgroundImage: `url('${FOOTER_BG_IMAGE_URL}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className={DARK_OVERLAY_CLASS}></div>
            
            {/* Added w-full and px-4 for full-width layout and padding */}
            <div class="relative z-10 p-4 w-full px-4"> 
                <p>© {new Date().getFullYear()} Recursive Axis. All rights reserved.</p>
                <div class="flex justify-center space-x-4 mt-2">
                    <a href="/privacy" class="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="/terms" class="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
// --- END: Footer Component Definition ---


const ContactCTA = React.forwardRef((props, ref) => (
  // Removed p-4 from the section for end-to-end footer
  <section 
    id="contact" 
    ref={ref} 
    className="min-h-screen text-gray-800 flex flex-col justify-between" 
  >
    
    {/* Main content container for CTA. bg-radiant-pulse is here to animate the background only. 
        Added px-4 for horizontal padding on the CTA content. */}
    <div className="w-full relative z-10 flex flex-col items-center justify-center flex-grow bg-radiant-pulse px-4 py-20"> 
      
      {/* 1. Animated Title */}
      <motion.h2
        className="text-4xl md:text-6xl font-extrabold text-center mb-4 animated-gradient"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        SIGN-UP FOR DISCOVERY CALL, NOW.
      </motion.h2>

      {/* 2. Subtext (static) */}
      <p className={`text-base md:text-xl text-gray-600 text-center max-w-2xl mx-auto mb-8`}>
        Lets put some life to your vision and see the results.
      </p>

      {/* 3. New Single Button and Urgency Text */}
      <div className="flex flex-col items-center justify-center space-y-4">
        
        {/* The Urgency Text */}
        <p className="text-sm font-bold tracking-widest uppercase text-red-500">
            Limited Spots
        </p>

        {/* The Main Button */}
        <a
          href="https://cal.com/asitdeva"
          target="_blank"
          rel="noopener noreferrer"
          // Using primary color for high visibility
          className={`px-12 py-5 bg-[${colors.primary}] text-black text-xl font-bold rounded-full shadow-xl transition-all duration-300 hover:scale-[1.05] hover:bg-opacity-90 transform-gpu`}
        >
          Reserve Your Slot Right Now
        </a>
      </div>
    </div>

    {/* Footer is completely separate and static */}
    <Footer />
  </section>
));

export default ContactCTA;