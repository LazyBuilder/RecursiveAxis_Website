// src/components/HeroSection.jsx (FIXED Layout for Full Background)

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
            bgClass="text-white" 
            style={{ backgroundColor: '#000000' }} 
            // 🚨 CRITICAL: Assuming FullPageSection root element has h-screen or h-full
        >
            
            {/* 1. BACKGROUND CONTAINER with Image and Positioning */}
            {/* This div must be a direct child of FullPageSection and span the whole thing */}
            <div 
                className="absolute inset-0 bg-cover bg-center w-full h-full"
                style={{ 
                    backgroundImage: `url(${BACKGROUND_IMAGE_PATH})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                {/* 2. OVERLAY for Contrast/Readability */}
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>
            
            {/* 3. HERO CONTENT */}
            {/* Make sure the content wrapper itself takes full height and width */}
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