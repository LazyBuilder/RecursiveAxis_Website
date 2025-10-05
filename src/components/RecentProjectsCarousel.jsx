// src/components/RecentProjectsCarousel.jsx (FINAL CODE)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FullPageSection from './FullPageSection'; // Assumed to be imported correctly
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// --- IMPORTANT: Update these paths and file names to match your local photos folder ---
import MSHImage from '../photos/mshcg-dugapuja.png';    
import VerveImage from '../photos/verve-photography.png';
// -----------------------------------------------------------------------------------

// Define colors (ensure these are globally consistent)
const PRIMARY_COLOR = '#00EAFF'; // Cyan
const SECONDARY_COLOR = '#FF00EA'; // Magenta
const BACKGROUND_LIGHT = '#ffffff'; // Clean white background
const TEXT_DARK = '#1a1a1a'; // Dark text color

// --- PROJECT DATA ---
const projectData = [
  {
    id: 1,
    title: "MSH Cultural Group",
    uniqueAspect: "Seamless **Multi-Language** Support and **High-Volume Ticketing** integrated into a sleek, cultural platform. Built for global scalability.",
    description: "An elegant digital platform for cultural event management and content showcase, emphasizing accessibility and robust backend logistics.",
    imageSrc: MSHImage, // Local Import Variable
    link: 'https://www.mshculturalgroup.com/',
    color: PRIMARY_COLOR,
  },
  {
    id: 2,
    title: "Verve Photography",
    uniqueAspect: "An **immersive, high-resolution** image delivery system built on a custom CDN, ensuring zero-latency portfolio viewing worldwide.",
    description: "High-impact portfolio site showcasing professional photography and immersive visuals, optimized for retina displays and speed.",
    imageSrc: VerveImage, // Local Import Variable
    link: 'https://verve.photography/',
    color: SECONDARY_COLOR,
  },
];

// Framer Motion carousel variants (Horizontal movement)
const carouselVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 800 : -800, 
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.17, 0.55, 0.55, 1] }
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction < 0 ? 800 : -800, 
    transition: { duration: 0.6, ease: [0.17, 0.55, 0.55, 1] }
  })
};

const RecentProjectsCarousel = React.forwardRef((props, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const totalProjects = projectData.length;

    const paginate = (newDirection) => {
        setDirection(newDirection);
        let newIndex = currentIndex + newDirection;
        if (newIndex < 0) {
            newIndex = totalProjects - 1; 
        } else if (newIndex >= totalProjects) {
            newIndex = 0; 
        }
        setCurrentIndex(newIndex);
    };

    const currentProject = projectData[currentIndex];

    return (
        <>
            {/* CENTRALIZED CSS STYLES for Phone Frame and Gradients */}
            <style>
            {`
                /* Global Title Style */
                .global-animated-title {
                    background: linear-gradient(45deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR}, ${PRIMARY_COLOR});
                    background-size: 400% 400%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: global-gradient-shift 10s ease infinite;
                }
                @keyframes global-gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                /* --- REDESIGNED PHONE FRAME STYLING --- */
                .responsive-phone-frame {
                    position: relative;
                    width: 25vmin; 
                    max-width: 320px; 
                    padding-top: calc(25vmin * 2); 
                    margin: 0 auto;
                    border: 10px solid ${TEXT_DARK}; 
                    border-radius: 40px;
                    box-shadow: 0 0 0 1px #eee, 0 10px 30px rgba(0, 0, 0, 0.3);
                    overflow: hidden;
                    background-color: ${TEXT_DARK}; 
                }
                .responsive-phone-screen {
                    position: absolute;
                    top: 10px; 
                    left: 10px;
                    right: 10px;
                    bottom: 10px;
                    border-radius: 30px; 
                    overflow: hidden;
                    background-color: white; 
                }
                .responsive-phone-frame::before {
                    content: '';
                    position: absolute;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 60px;
                    height: 10px;
                    background-color: ${TEXT_DARK};
                    border-radius: 10px;
                    z-index: 10;
                }
            `}
            </style>

            <FullPageSection 
                id="projects" // ID must match the 'sections' array in Home.jsx
                ref={ref} 
                style={{ backgroundColor: BACKGROUND_LIGHT }}
                bgClass="text-dark" 
            >
                <div className="w-full relative z-10 flex flex-col pt-16 pb-16 px-4 h-full overflow-hidden">
                    
                    {/* === MAIN TITLE === */}
                    <motion.h2
                        className={`text-4xl md:text-6xl font-extrabold text-center mb-16 global-animated-title`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Recent Projects
                    </motion.h2>

                    {/* === CAROUSEL SLIDE CONTAINER === */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <AnimatePresence initial={false} custom={direction} exitBeforeEnter>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={carouselVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto h-full items-center"
                            >
                                
                                {/* === LEFT SIDE: PROJECT TEXT / DESCRIPTION === */}
                                <div className="flex flex-col justify-center p-4 md:p-8 text-center md:text-left">
                                    <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: currentProject.color }}>
                                        {currentProject.title}
                                    </p>
                                    <h3 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ color: TEXT_DARK }}>
                                        The Unique Aspect
                                    </h3>

                                    <div className="mb-8 text-lg text-gray-700 leading-relaxed">
                                        <p dangerouslySetInnerHTML={{ __html: currentProject.uniqueAspect }}></p>
                                    </div>
                                    
                                    <p className="text-base text-gray-500 italic">
                                        {currentProject.description}
                                    </p>
                                    
                                    {/* Link button (Optional) */}
                                    {currentProject.link && (
                                        <a 
                                            href={currentProject.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-6 self-center md:self-start px-6 py-3 text-base rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                                            style={{ backgroundColor: currentProject.color, color: TEXT_DARK }}
                                        >
                                            View Live Project &rarr;
                                        </a>
                                    )}
                                </div>

                                {/* === RIGHT SIDE: PROJECT VISUAL (PHONE FRAME) === */}
                                <div className="relative flex flex-col justify-center items-center p-4 md:p-8 h-full">
                                    <div className="responsive-phone-frame">
                                        <div className="responsive-phone-screen">
                                            <a 
                                                href={currentProject.link || '#'}
                                                target={currentProject.link ? '_blank' : '_self'}
                                                rel="noopener noreferrer"
                                                className="absolute inset-0 block"
                                            >
                                                <img 
                                                    src={currentProject.imageSrc} 
                                                    alt={currentProject.title} 
                                                    className="w-full h-full object-cover" 
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* === CAROUSEL NAVIGATION (Arrows) === */}
                        <motion.div 
                            className="absolute z-20 left-4 md:left-0 cursor-pointer p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-md"
                            onClick={() => paginate(-1)}
                        >
                            <FaChevronLeft size={20} color={TEXT_DARK} />
                        </motion.div>
                        <motion.div 
                            className="absolute z-20 right-4 md:right-0 cursor-pointer p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-md"
                            onClick={() => paginate(1)}
                        >
                            <FaChevronRight size={20} color={TEXT_DARK} />
                        </motion.div>
                        
                        {/* Pagination Dots */}
                        <div className="absolute bottom-4 md:bottom-12 z-30 flex space-x-2">
                            {projectData.map((_, index) => (
                                <div 
                                    key={index}
                                    className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                                        currentIndex === index ? 'bg-black scale-125' : 'bg-gray-400 opacity-40 hover:opacity-80'
                                    }`}
                                    onClick={() => setCurrentIndex(index)}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </FullPageSection>
        </>
    );
});

export default RecentProjectsCarousel;