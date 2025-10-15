// src/components/HeroSection.jsx (FIXED: Background Height and Centering)

import React from 'react';
import { motion } from 'framer-motion';
import FullPageSection from './FullPageSection'; 

// Use the corrected relative path
const BACKGROUND_IMAGE_PATH = `${process.env.PUBLIC_URL}/assets/Storyline_Background_Dark.png`;

const HeroSection = React.forwardRef((props, ref) => {
    return (
        <FullPageSection 
            id="home" 
            ref={ref} 
            // Ensures the section itself has a dark background color in case the image fails to load.
            bgClass="text-white" 
            style={{ backgroundColor: '#000000' }} 
        >
            
            {/* 1. BACKGROUND CONTAINER with Image and Positioning */}
            <div 
                // 🚨 FIX 1: Re-added min-h-screen to ensure the absolute element reliably covers 
                // the full mobile viewport height, fixing the scaling issue.
                className="absolute inset-0 bg-cover bg-center w-full h-full min-h-screen" 
                style={{ 
                    backgroundImage: `url(${BACKGROUND_IMAGE_PATH})`,
                    // 'cover' is the CSS background-size equivalent of 'fill'
                    backgroundSize: 'cover', 
                    backgroundRepeat: 'no-repeat', // Equivalent of no 'repeat'
                    backgroundPosition: 'center',
                }}
            >
                {/* 2. OVERLAY for Contrast/Readability */}
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>
            
            {/* 3. HERO CONTENT */}
            <div 
                // 🚨 FIX 2: Removed pt-20 to restore vertical centering. 
                // The z-20 correctly stacks content above the background.
                className="w-full h-full flex flex-col justify-center items-center text-center p-4 relative z-20"
            >
                
                <motion.h1
                    className="text-5xl md:text-7xl font-extrabold mb-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Your Strategic Partners for <span className="animated-gradient">Technology, Analytics & Innovation.</span>
                </motion.h1>
                
                <motion.p
                    className="text-xl md:text-2xl max-w-3xl mb-10 text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    We provide Tech Strategy, Execution, and Advisory services, designed to accelerate innovation for founders, investors, and corporate ventures.
                </motion.p>

                <motion.a
                    href="#contact"
                    className={`px-8 py-3 text-lg rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl bg-white text-black`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, type: "spring", stiffness: 150 }}
                >
                    Services & Solutions
                </motion.a>
            </div>
        </FullPageSection>
    );
});

export default HeroSection;