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
    { name: 'Salesforce', src: 'https://placehold.co/120x60/333333/fff?text=SFDC' },
    { name: 'Tesla', src: 'https://placehold.co/120x60/333333/fff?text=Tesla' },
    { name: 'Oracle', src: 'https://placehold.co/120x60/333333/fff?text=Oracle' },
    { name: 'HP', src: 'https://placehold.co/120x60/333333/fff?text=HP' },
];

// Combine the logos and duplicate them for the seamless loop
const allLogos = [...logoPlaceholders, ...logoPlaceholders]; 
// --- END PLACEHOLDER LOGO DATA ---


const FounderStorySection = React.forwardRef((props, ref) => (
    <>
        {/* === CRITICAL CSS FOR AUTO-SCROLL === */}
        <style>
            {`
                /* Defines the keyframes for the continuous horizontal scroll */
                @keyframes logo-scroll {
                    /* Scroll 50% of the total content width (which is one full set of logos) */
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); } 
                }

                /* Class to apply the animation */
                .logo-scroll-strip {
                    display: flex;
                    /* Total scroll duration. Adjust time based on number of logos */
                    animation: logo-scroll 45s linear infinite; 
                    /* Prevents images from shrinking */
                    width: max-content; 
                }
                
                /* Optional: Pause animation on hover */
                .logo-scroll-container:hover .logo-scroll-strip {
                    animation-play-state: paused;
                }
                
                /* Ensure logos don't get squished */
                .logo-item {
                    flex-shrink: 0;
                    margin: 0 1.5rem; /* Space between logos */
                    height: 50px; /* Uniform height for all logos */
                    width: 120px; /* Width for placeholder images */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* Styling for the container to hide the repeating effect */
                .logo-scroll-container {
                    overflow: hidden;
                    mask-image: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
                    max-width: 100%;
                }
            `}
        </style>

        <FullPageSection id="founder-story" ref={ref} bgClass="bg-[#0a0a0a] text-white">
            <div className="w-full relative z-10 flex flex-col items-center justify-center pt-24 pb-20 px-4">
                <motion.h2 
                    className={`text-3xl md:text-5xl font-extrabold mb-6 animated-gradient`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    MEET THE FOUNDER
                </motion.h2>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-5xl">
                    {/* === LEFT SIDE: STORY & LOGO SCROLLER (Replaces Metrics) === */}
                    <div className="md:w-1/2 flex flex-col items-center text-center max-w-lg leading-relaxed text-base md:text-lg lg:text-xl text-gray-400">
                        <p className="mb-8">
                            Asit Deva is a seasoned expert dedicated to helping businesses navigate the complexities of technology and innovation. With a passion for building, advising, and strategizing, he transforms ideas into tangible, successful products.
                        </p>
                        
                        {/* === START: LOGO SCROLLER CONTAINER === */}
                        <div className="w-full mt-8 md:mt-12">
                            <h3 className="text-sm font-semibold tracking-widest uppercase mb-4 text-white/50">
                                Trusted By Experience From:
                            </h3>
                            <div className="logo-scroll-container bg-white/5 border border-white/10 rounded-xl py-4 shadow-inner">
                                <div className="logo-scroll-strip">
                                    {/* Map through the duplicated logos for infinite scroll */}
                                    {allLogos.map((logo, index) => (
                                        <div key={index} className="logo-item">
                                            {/* Logo image placeholder. Use actual imported components/paths here. */}
                                            <img 
                                                src={logo.src} 
                                                alt={logo.name} 
                                                className="h-full w-auto opacity-70 hover:opacity-100 transition-opacity duration-300 object-contain"
                                                style={{ filter: 'grayscale(100%)' }} // Optional: grayscale for sleekness
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* === END: LOGO SCROLLER CONTAINER === */}
                        
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