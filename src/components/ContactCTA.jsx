// src/components/ContactCTA.jsx (UPDATED - CTA Content Only)

import React from 'react'; // 💡 Removed useState, AnimatePresence
import { motion } from 'framer-motion'; 
import { colors } from './UIMain';
import Footer from './Footer';

// 💡 Removed SimpleModal and Footer definitions
// 💡 Removed legal content definitions

const ContactCTA = React.forwardRef((props, ref) => {
    
    // 💡 Removed state and modal handlers
    
    return (
        <section 
            id="contact" 
            ref={ref} 
            // 💡 Removed flex-col justify-between because the footer is no longer here
            className="min-h-screen text-gray-800" 
        >
            
            {/* Main content container for CTA */}
            <div className="w-full relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 py-20"> 
                
                {/* Pulsing Background - Sits behind everything */}
                <div className="absolute inset-0 bg-radiant-pulse" />

                {/* 1. Animated Title */}
                <motion.h2
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

                {/* 3. Button and Urgency Text */}
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

            {/* 💡 FOOTER REMOVED: Footer is now separate and must be rendered outside this component */}
            <Footer />
        </section>
    );
});

export default ContactCTA;