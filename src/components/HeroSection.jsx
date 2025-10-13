// src/components/HeroSection.jsx (FIXED Layout for Full Background & Content Offset)

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
        >
            
            {/* 1. BACKGROUND CONTAINER with Image and Positioning */}
            <div 
                // Removed min-h-screen here as the parent FullPageSection handles responsive sizing (min-h-screen/lg:h-screen).
                // This ensures the background correctly fills the parent container.
                className="absolute inset-0 bg-cover bg-center w-full h-full" 
                style={{ 
                    backgroundImage: `url(${BACKGROUND_IMAGE_PATH})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    // The background image position is fixed to center, which is generally what you want.
                    backgroundPosition: 'center', 
                }}
            >
                {/* 2. OVERLAY for Contrast/Readability */}
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>
            
            {/* 3. HERO CONTENT */}
            {/* 🚨 FIX 1: Added z-20 to stack above background (which defaults to z-0 or z-10) */}
            {/* 🚨 FIX 2: Added pt-20 to push the content below the fixed Header component */}
            <div 
                className="w-full h-full flex flex-col justify-center items-center text-center p-4 pt-20 relative z-20"
            >
                
                <motion.h1
                    className="text-5xl md:text-7xl font-extrabold mb-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Your Strategic Partners for <span className="animated-gradient">Technology & Innovation.</span>
                </motion.h1>
                
                <motion.p
                    className="text-xl md:text-2xl max-w-3xl mb-10 text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    We create, design, and evaluate technology to accelerate your entire innovation journey effectively and efficiently.
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