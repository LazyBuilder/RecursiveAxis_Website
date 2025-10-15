// src/components/FounderStorySection.jsx (Logo Scroller Implementation)

import React from 'react';
import { motion } from 'framer-motion';
import FullPageSection from './FullPageSection';
import { colors } from './UIMain'; // Assuming CodeSVG, DesignSVG, DataSVG are now unused

// --- PLACEHOLDER LOGO DATA ---
// In a real application, these should be imported images (e.g., import GoogleLogo from '../assets/google.png')
const logoPlaceholders = [
    { name: 'Google', src: 'https://placehold.co/120x60/333333/fff?text=Google' },
    { name: 'Microsoft', src: 'https://placehold.co/120x60/333333/fff?text=MSFT' },
    { name: 'Amazon', src: 'https://placehold.co/120x60/333333/fff?text=Amazon' },
    { name: 'IBM', src: 'https://placehold.co/120x60/333333/fff?text=IBM' },
    { name: 'Cisco', src: 'https://placehold.co/120x60/333333/fff?text=Cisco' },
    { name: 'Deloitte', src: 'https://placehold.co/120x60/333333/fff?text=Deloitte' },
    { name: 'Salesforce', src: 'https://placehold.co/120x60/333333/fff?text=Salesforce' },
    { name: 'SAP', src: 'https://placehold.co/120x60/333333/fff?text=SAP' },
    // Duplicate the logos to create a seamless infinite loop
    { name: 'Google-2', src: 'https://placehold.co/120x60/333333/fff?text=Google' },
    { name: 'Microsoft-2', src: 'https://placehold.co/120x60/333333/fff?text=MSFT' },
    { name: 'Amazon-2', src: 'https://placehold.co/120x60/333333/fff?text=Amazon' },
    { name: 'IBM-2', src: 'https://placehold.co/120x60/333333/fff?text=IBM' },
];

// --- LogoScroller Component (Local Helper) ---
const LogoScroller = () => {
    return (
        <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <motion.div 
                className="flex"
                animate={{
                    x: ['0%', '-50%'], // Scrolls half the content length
                    transition: {
                        x: {
                            repeat: Infinity,
                            ease: 'linear',
                            duration: 30, // Adjust for desired speed
                        },
                    },
                }}
            >
                {logoPlaceholders.map((logo, index) => (
                    <div key={index} className="flex-shrink-0 mx-8 opacity-60">
                        <img 
                            src={logo.src} 
                            alt={logo.name} 
                            className="h-10 w-auto object-contain filter invert" // 'invert' to make logos white on dark bg
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};


// --- Main FounderStorySection Component ---
const FounderStorySection = React.forwardRef((props, ref) => (
    <>
        <FullPageSection 
            id="founder-story" 
            ref={ref} 
            // Dark background for this section
            bgClass="text-white bg-[#0a0a0a]" 
        >
            <div className="container mx-auto px-4 py-16 w-full h-full flex flex-col justify-center">

                {/* === LOGO SCROLLER (Desktop-only on top) === */}
                <div className="mb-12 hidden md:block">
                    <LogoScroller />
                </div>
                
                <motion.h2
                    className={`text-3xl md:text-5xl font-extrabold mb-12 text-center`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    OUR FOUNDER'S <span style={{ color: colors.primary }}>AXIS</span>
                </motion.h2>

                {/* === MAIN CONTENT: 2-Column Layout === */}
                <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
                    
                    {/* === LEFT SIDE: STORY TEXT === */}
                    <div className="md:w-1/2 md:text-left text-center">
                        <motion.h3
                            className="text-2xl md:text-3xl font-bold mb-4"
                            style={{ color: colors.secondary }}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            "I build what lasts, and lead what scales."
                        </motion.h3>
                        
                        <motion.p
                            className="text-lg text-gray-300 mb-6"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            Recursive Axis was founded by **Asit Deva**, a deep technical expert with a decade of experience across both high-velocity startups and Fortune 50 enterprises. His journey, marked by senior engineering and architect roles, instilled a philosophy: **Innovation must be technically rigorous and strategically sound.**
                        </motion.p>
                        
                        <motion.p
                            className="text-lg text-gray-300 mb-8 italic"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            We bring the discipline of enterprise architecture and the agility of a startup to every project, ensuring your technology isn't just a solution, but a competitive axis.
                        </motion.p>
                        
                    </div>
                    
                    {/* === RIGHT SIDE: FOUNDER IMAGE === */}
                    <div className="md:w-1/2 flex justify-center md:justify-end">
                        <motion.div
                            className="w-full max-w-md h-auto p-4 bg-white/5 border border-white/10 rounded-2xl shadow-xl backdrop-blur-sm relative overflow-hidden"
                            initial={{ rotateY: -10, scale: 0.9 }}
                            whileInView={{ rotateY: 0, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,234,255,0.2),transparent_70%)] rounded-full"
                                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            ></motion.div>
                            <img src="https://placehold.co/800x600/1a1a1a/fff?text=ASIT+DEVA" alt="Asit Deva" className="w-full h-full object-cover rounded-xl relative z-10" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </FullPageSection>
    </>
));

export default FounderStorySection;