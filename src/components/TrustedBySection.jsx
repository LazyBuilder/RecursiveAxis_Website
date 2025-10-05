// src/components/TrustedBySegment.jsx (FINAL - UNIFIED IMPACT & INNOVATION)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FullPageSection from './FullPageSection';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Define colors (ensure these are globally consistent)
const PRIMARY_COLOR = '#00EAFF'; // Cyan
const SECONDARY_COLOR = '#FF00EA'; // Magenta
const BACKGROUND_DARK = '#0a0a0a'; // Deep background color
const CARD_DARK = '#1f1f1f'; // Dark card color
const LIGHT_TEXT = '#ffffff'; // White text

// --- LOGO DATA ---
// IMPORTANT: Replace 'path/to/your-logo.png' with actual paths to your company logos.
const logoData = [
  { id: 1, name: "Google", src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png' }, // Placeholder URL
  { id: 2, name: "Meta", src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png' }, // Placeholder URL
  { id: 3, name: "Amazon", src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png' }, // Placeholder URL
  { id: 4, name: "Microsoft", src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1200px-Microsoft_logo_%282012%29.svg.png' }, // Placeholder URL
  { id: 5, name: "Apple", src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png' }, // Placeholder URL
  { id: 6, name: "Netflix", src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png' }, // Placeholder URL
];

// --- PROJECT DATA ---
const projectData = [
  {
    id: 1,
    title: "MSH Cultural Group",
    description: "Elegant digital platform for cultural event management and content showcase.",
    imageSrc: 'https://i.ibb.co/L6V7R0k/mshculturalgroup.png', // Placeholder (replace with actual image of mshculturalgroup.com)
    link: 'https://www.mshculturalgroup.com/',
    color: PRIMARY_COLOR,
  },
  {
    id: 2,
    title: "Verve Photography",
    description: "High-impact portfolio site showcasing professional photography and immersive visuals.",
    imageSrc: 'https://i.ibb.co/S68Jg2S/vervephotography.png', // Placeholder (replace with actual image of verve.photography)
    link: 'https://verve.photography/',
    color: SECONDARY_COLOR,
  },
  {
    id: 3,
    title: "Project Alpha SaaS",
    description: "Bespoke SaaS solution for real-time data analysis and visualization dashboard.",
    imageSrc: 'https://via.placeholder.com/800x600/1e1e1e/888888?text=Project+Alpha+SaaS', // Generic Placeholder
    link: null, 
    color: PRIMARY_COLOR,
  },
  {
    id: 4,
    title: "Eco-Friendly E-commerce",
    description: "E-commerce platform redesign focused on sustainable products and seamless user experience.",
    imageSrc: 'https://via.placeholder.com/800x600/1e1e1e/888888?text=Eco-Commerce', // Generic Placeholder
    link: 'https://example-ecocommerce.com/',
    color: SECONDARY_COLOR,
  },
];

// Framer Motion carousel variants for smooth transitions
const carouselVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 300 : -300,
    scale: 0.8
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.17, 0.67, 0.83, 0.99] }
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction < 0 ? 300 : -300,
    scale: 0.8,
    transition: { duration: 0.6, ease: [0.17, 0.67, 0.83, 0.99] }
  })
};

const TrustedBySegment = React.forwardRef((props, ref) => {
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
            {/* CENTRALIZED CSS STYLES for Global Title & Glowing Cards */}
            {/* NOTE: In a real app, move these styles to a global CSS file or App.jsx */}
            <style>
            {`
                /* Global Title Style (Defined here for example, ideally in App.jsx or global.css) */
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
                
                /* Glowing Card Base Style */
                .glowing-card {
                    position: relative;
                    background: ${CARD_DARK};
                    border: 2px solid transparent; /* Base transparent border */
                    background-clip: padding-box, border-box;
                    background-origin: padding-box, border-box;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); 
                    transition: all 0.4s ease;
                }
                /* Glowing Card Hover Primary */
                .glowing-card-hover-primary:hover {
                    box-shadow: 0 0 30px rgba(0, 234, 255, 0.5); /* Cyan glow */
                    border-image: linear-gradient(45deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR}) 1;
                }
                /* Glowing Card Hover Secondary */
                .glowing-card-hover-secondary:hover {
                    box-shadow: 0 0 30px rgba(255, 0, 234, 0.5); /* Magenta glow */
                    border-image: linear-gradient(45deg, ${SECONDARY_COLOR}, ${PRIMARY_COLOR}) 1;
                }

                /* Logo grayscale and hover effect */
                .logo-grayscale {
                    filter: grayscale(100%) brightness(0.8);
                    transition: all 0.3s ease-in-out;
                    max-height: 50px; /* Adjust as needed */
                    width: auto;
                    object-fit: contain;
                }
                .logo-grayscale:hover {
                    filter: grayscale(0%) brightness(1);
                    transform: scale(1.05);
                }
            `}
            </style>

            <FullPageSection 
                id="trusted-by" 
                ref={ref} 
                style={{ backgroundColor: BACKGROUND_DARK }}
                bgClass="text-white"
            >
                <div className="w-full relative z-10 flex flex-col pt-20 pb-20 px-4 h-full">
                    
                    {/* === UNIFIED MAIN TITLE === */}
                    <motion.h2
                        className={`text-4xl md:text-6xl font-extrabold text-center mb-16 global-animated-title`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Our Impact & Innovation
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl mx-auto h-full items-center">
                        
                        {/* === LEFT COLUMN: TRUSTED BY (LOGOS) === */}
                        <div className="flex flex-col justify-center p-4 md:p-8">
                            <motion.h3
                                className="text-3xl font-bold text-center md:text-left mb-10"
                                style={{ color: PRIMARY_COLOR, textShadow: `0 0 10px rgba(0, 234, 255, 0.3)` }}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                Trusted by Industry Leaders
                            </motion.h3>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                                {logoData.map((logo, index) => (
                                    <motion.div
                                        key={logo.id}
                                        className={`flex items-center justify-center p-3 h-20 rounded-lg glowing-card glowing-card-hover-primary`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
                                        viewport={{ once: true }}
                                    >
                                        <img 
                                            src={logo.src} 
                                            alt={logo.name} 
                                            className="logo-grayscale"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* === RIGHT COLUMN: PROJECT CAROUSEL === */}
                        <div className="relative flex flex-col justify-center items-center p-4 md:p-8 min-h-[400px]">
                            <motion.h3
                                className="text-3xl font-bold text-center md:text-left mb-10"
                                style={{ color: SECONDARY_COLOR, textShadow: `0 0 10px rgba(255, 0, 234, 0.3)` }}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                Our Recent Innovations
                            </motion.h3>

                            <div className="relative w-full max-w-xl h-96 flex items-center justify-center">
                                <AnimatePresence initial={false} custom={direction}>
                                    <motion.div
                                        key={currentIndex}
                                        custom={direction}
                                        variants={carouselVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="absolute w-full h-full p-0 flex flex-col rounded-xl glowing-card border-none" // No padding, image takes full space
                                        style={{ backgroundColor: CARD_DARK }}
                                    >
                                        {/* Project Image takes up most of the space */}
                                        <a 
                                            href={currentProject.link || '#'} 
                                            target={currentProject.link ? '_blank' : '_self'}
                                            rel="noopener noreferrer"
                                            className={`relative w-full h-3/4 overflow-hidden rounded-t-xl block group transition-all duration-300 ${currentProject.link ? 'cursor-pointer' : 'cursor-default'}`}
                                        >
                                            <img 
                                                src={currentProject.imageSrc} 
                                                alt={currentProject.title} 
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            {/* Optional Link Icon/Overlay on Hover */}
                                            {currentProject.link && (
                                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-white text-lg font-bold">View Project →</span>
                                                </div>
                                            )}
                                        </a>

                                        {/* Project Details Overlayed / Below Image */}
                                        <div className="p-4 flex flex-col justify-center items-center h-1/4 rounded-b-xl" style={{ borderTop: `2px solid ${currentProject.color}` }}>
                                            <h3 className="text-xl font-bold tracking-widest mb-1" style={{ color: currentProject.color }}>
                                                {currentProject.title}
                                            </h3>
                                            <p className="text-sm text-gray-400 leading-tight">
                                                {currentProject.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Carousel Navigation */}
                                <motion.div 
                                    className="absolute z-20 top-1/2 -left-8 transform -translate-y-1/2 cursor-pointer p-3 rounded-full bg-black bg-opacity-30 hover:bg-opacity-70 transition-colors"
                                    onClick={() => paginate(-1)}
                                >
                                    <FaChevronLeft size={20} color={LIGHT_TEXT} />
                                </motion.div>
                                <motion.div 
                                    className="absolute z-20 top-1/2 -right-8 transform -translate-y-1/2 cursor-pointer p-3 rounded-full bg-black bg-opacity-30 hover:bg-opacity-70 transition-colors"
                                    onClick={() => paginate(1)}
                                >
                                    <FaChevronRight size={20} color={LIGHT_TEXT} />
                                </motion.div>
                                
                                {/* Pagination Dots */}
                                <div className="absolute bottom-4 z-30 flex space-x-2">
                                    {projectData.map((_, index) => (
                                        <div 
                                            key={index}
                                            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                                                currentIndex === index ? 'bg-white scale-125' : 'bg-white opacity-40 hover:opacity-80'
                                            }`}
                                            onClick={() => setCurrentIndex(index)}
                                        />
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </FullPageSection>
        </>
    );
});

export default TrustedBySegment;