// src/components/HeroSection.jsx

import React from 'react';
import { motion } from 'framer-motion';
import FullPageSection from './FullPageSection'; 
// Assuming colors are imported from UIMain.jsx or defined globally

// Background image path (since it's in public/assets)
const BACKGROUND_IMAGE_PATH = `${process.env.PUBLIC_URL}/assets/Storyline_Background_Dark.png`;

const HeroSection = React.forwardRef((props, ref) => {
    return (
        <FullPageSection 
            id="home" 
            ref={ref} 
            // Setting the text color to white globally for this section
            bgClass="text-white" 
            // We use style here to ensure the full section background is black 
            // before the image loads, or if the image fails.
            style={{ backgroundColor: '#000000' }} 
        >
            {/* 1. BACKGROUND CONTAINER with Image and Positioning */}
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                    backgroundImage: `url(${BACKGROUND_IMAGE_PATH})`,
                    // Optional: Ensures the image scales to cover the entire div
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                {/* 2. OVERLAY for Contrast/Readability */}
                {/* Adjust opacity (e.g., 60, 70, 80) to control darkness */}
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>
            
            {/* 3. HERO CONTENT (Z-indexed above the background layers) */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center p-4">
                
                <motion.h1
                    className="text-5xl md:text-7xl font-extrabold mb-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    We Build <span className="animated-gradient">Digital Stories.</span>
                </motion.h1>
                
                <motion.p
                    className="text-xl md:text-2xl max-w-3xl mb-10 text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Turning complex challenges into elegant, scalable software solutions that drive growth and user engagement.
                </motion.p>

                <motion.a
                    href="#contact"
                    // Tailwind classes for the button look
                    className={`px-8 py-3 text-lg rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl bg-white text-black`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, type: "spring", stiffness: 150 }}
                >
                    Start Your Project
                </motion.a>
            </div>
        </FullPageSection>
    );
});

export default HeroSection;