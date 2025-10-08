// src/components/ContactCTA.jsx (Final version for full-page scroll)

import React from 'react';
import { motion } from 'framer-motion'; 
import { colors } from './UIMain';
import Footer from './Footer'; // Assuming Footer is in the same directory or accessible via this path

const ContactCTA = React.forwardRef((props, ref) => {
    
    return (
        <section 
            id="contact" 
            ref={ref} 
            // 💡 CRITICAL: Ensure this section takes exactly 100% of the viewport height.
            // We are using 'flex-col justify-between' to push the content up and the footer down.
            className="w-screen h-screen flex flex-col justify-between text-gray-800" 
        >
            
            {/* 1. Main content container for CTA (Takes up remaining space) */}
            {/* 💡 CHANGE: Give this part flex-grow and use standard padding */}
            <div className="w-full relative z-10 flex flex-col items-center justify-center flex-grow px-4 py-20"> 
                
                {/* Pulsing Background - Sits behind everything */}
                {/* NOTE: If bg-radiant-pulse is too large, it might still cause issues. 
                   Ensure its size is constrained to the bounds of the 'div' or 'section'. */}
                <div className="absolute inset-0 bg-radiant-pulse" />

                {/* ... (Title, Subtext, Button remain the same) ... */}
                <motion.h2
                    className="text-4xl md:text-6xl font-extrabold text-center mb-4 animated-gradient relative z-10"
                    // ... (framer-motion props)
                >
                    SIGN-UP FOR DISCOVERY CALL, NOW.
                </motion.h2>

                <p className={`text-base md:text-xl text-gray-600 text-center max-w-2xl mx-auto mb-8`}>
                    Lets put some life to your vision and see the results.
                </p>

                <div className="flex flex-col items-center justify-center space-y-4 relative z-10">
                    
                    <p className="text-sm font-bold tracking-widest uppercase text-red-500">
                        Limited Spots
                    </p>

                    <div 
                        className={`glowing-button p-[2px] rounded-full transition-all duration-300 hover:scale-[1.05]`}
                        style={{ background: colors.primary }}
                    >
                        <a
                          href="https://cal.com/asitdeva"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-12 py-5 bg-white text-black text-xl font-bold rounded-full shadow-lg transition-all duration-300 hover:bg-gray-100 transform-gpu`}
                        >
                          Reserve Your Slot Right Now
                        </a>
                    </div>
                </div>
            </div>

            {/* 2. FOOTER: RENDERED INSIDE THE FULL-HEIGHT SECTION */}
            <Footer />

        </section>
    );
});

export default ContactCTA;