// src/components/ContactCTA.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { colors } from './UIMain';

// --- START: Footer Component Definition (unchanged) ---
const FOOTER_BG_IMAGE_URL = `${process.env.PUBLIC_URL}/assets/Storyline_Background_Dark.png`; 

const Footer = () => {
    // Note: User changed this from 15vh to 20vh
    const FOOTER_HEIGHT_CLASS = 'h-[20vh]'; 
    // Note: User changed this from opacity-60 to opacity-25
    const DARK_OVERLAY_CLASS = 'absolute inset-0 bg-black opacity-25'; 

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
            
            <div className="relative z-10 p-4 w-full px-4"> 
                <p>© {new Date().getFullYear()} Recursive Axis. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-2">
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
    className="min-h-screen text-gray-800 flex flex-col justify-between" 
  >
    
    {/* Main content container for CTA. Removed bg-radiant-pulse from here. */}
    <div className="w-full relative z-10 flex flex-col items-center justify-center flex-grow px-4 py-20"> 
      
      {/* 1. Animated Title: APPLYING PULSE HERE */}
      <motion.h2
        // ADDED bg-radiant-pulse and a background fill class (like bg-white) 
        // to make the radial gradient visible inside the text area.
        // It's usually better to apply the pulsing effect to a container BEHIND the text.
        // For the intended visual effect, let's create a *pseudo-element* pulsing container.

        className="text-4xl md:text-6xl font-extrabold text-center mb-4 animated-gradient relative z-10"
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

        {/* The Main Button with a glowing border wrapper */}
        <div 
            // Wrapper for the glowing effect. 
            // The actual glowing effect is added via the 'glowing-button' class (requires CSS definition).
            className={`glowing-button p-[2px] rounded-full transition-all duration-300 hover:scale-[1.05]`}
            style={{ 
                // Set the initial glow color using one of the accent colors
                background: colors.primary,
                // If you want the gradient animation as a border, you need a custom CSS class 
                // similar to 'animated-gradient-border' which mimics the text animation.
                // For a simple glow, setting the background color is enough.
            }}
        >
            <a
              href="https://cal.com/asitdeva"
              target="_blank"
              rel="noopener noreferrer"
              // Ensure the button content has a solid background to sit inside the glow wrapper
              className={`px-12 py-5 bg-white text-black text-xl font-bold rounded-full shadow-lg transition-all duration-300 hover:bg-gray-100 transform-gpu`}
            >
              Reserve Your Slot Right Now
            </a>
        </div>
      </div>
    </div>

    {/* Footer is completely separate and static */}
    <Footer />
  </section>
));

export default ContactCTA;