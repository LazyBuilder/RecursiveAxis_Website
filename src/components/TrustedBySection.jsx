// src/components/TrustedBySegment.jsx (TWO-COLUMN TRUST & PORTFOLIO)

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

// --- Logo Data (Placeholder boxes for now) ---
const logoData = [
  { id: 1, name: "Company A" },
  { id: 2, name: "Company B" },
  { id: 3, name: "Company C" },
  { id: 4, name: "Company D" },
  { id: 5, name: "Company E" },
  { id: 6, name: "Company F" },
];

// --- Project Data (Including your examples) ---
const projectData = [
  {
    id: 1,
    title: "MSH Cultural Group",
    description: "A comprehensive digital platform for a cultural management group, focusing on elegant content presentation and event booking.",
    imageSrc: 'url-to-msh-cultural-group-image.jpg', // Replace with actual image path
    link: 'https://www.mshculturalgroup.com/',
  },
  {
    id: 2,
    title: "Verve Photography",
    description: "High-impact portfolio site showcasing professional photography, optimized for fast loading and immersive full-screen viewing.",
    imageSrc: 'url-to-verve-photography-image.jpg', // Replace with actual image path
    link: 'https://verve.photography/',
  },
  {
    id: 3,
    title: "Project Alpha",
    description: "Bespoke SaaS solution for real-time data analysis and visualization, built with React and advanced charting libraries.",
    imageSrc: 'url-to-project-alpha-image.jpg', // Placeholder
    link: null, // No hyperlink
  },
  {
    id: 4,
    title: "Project Beta",
    description: "E-commerce platform redesign focused on improving mobile conversion rates and streamlining the checkout process.",
    imageSrc: 'url-to-project-beta-image.jpg', // Placeholder
    link: 'https://example-beta.com/',
  },
];

// Framer Motion carousel variants
const carouselVariants = {
  enter: (direction) => ({
    opacity: 0,
    y: direction > 0 ? 50 : -50,
  }),
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  },
  exit: (direction) => ({
    opacity: 0,
    y: direction < 0 ? 50 : -50,
    transition: { duration: 0.5 }
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
            newIndex = totalProjects - 1; // Wrap around to the end
        } else if (newIndex >= totalProjects) {
            newIndex = 0; // Wrap around to the start
        }
        setCurrentIndex(newIndex);
    };

    const currentProject = projectData[currentIndex];

    return (
        <FullPageSection 
            id="trusted-by" 
            ref={ref} 
            style={{ backgroundColor: BACKGROUND_DARK }}
            bgClass="text-white"
        >
            <div className="w-full relative z-10 grid grid-cols-1 md:grid-cols-2 h-full">
                
                {/* === LEFT COLUMN: TRUST/LOGO GRID === */}
                <div className="flex flex-col justify-center p-8 md:p-16 border-r border-gray-800">
                    <motion.h2
                        // Use the consistent global animated gradient class
                        className={`text-4xl md:text-5xl font-extrabold mb-12 global-animated-title`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Trusted By
                    </motion.h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {logoData.map((logo, index) => (
                            <motion.div
                                key={logo.id}
                                className={`h-24 flex items-center justify-center p-4 rounded-lg`}
                                style={{ backgroundColor: CARD_DARK, border: `2px solid ${index % 2 === 0 ? PRIMARY_COLOR : SECONDARY_COLOR}` }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                                viewport={{ once: true }}
                            >
                                {/* Placeholder for Logo Image */}
                                <span className="text-sm font-bold text-gray-400">{logo.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* === RIGHT COLUMN: PROJECT CAROUSEL === */}
                <div className="relative flex flex-col justify-center items-center p-8 md:p-16">
                    <motion.h2
                        // Use the consistent global animated gradient class
                        className={`text-4xl md:text-5xl font-extrabold mb-12 global-animated-title`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Recent Projects
                    </motion.h2>

                    <div className="relative w-full max-w-lg h-96 flex items-center justify-center">
                        <AnimatePresence initial={false} custom={direction} exitBeforeEnter>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={carouselVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute w-full h-full p-6 flex flex-col items-center text-center rounded-xl glowing-card border-none"
                                style={{ backgroundColor: CARD_DARK, border: 'none' }}
                            >
                                {/* Project Image Area */}
                                <a 
                                    href={currentProject.link || '#'} 
                                    target={currentProject.link ? '_blank' : '_self'}
                                    rel="noopener noreferrer"
                                    className={`relative w-full h-48 mb-6 overflow-hidden rounded-lg block group transition-all duration-300 ${currentProject.link ? 'cursor-pointer' : 'cursor-default'}`}
                                >
                                    <img 
                                        src={currentProject.imageSrc} 
                                        alt={currentProject.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Link Icon/Overlay */}
                                    {currentProject.link && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-white text-lg font-bold">View Project →</span>
                                        </div>
                                    )}
                                </a>

                                {/* Project Details */}
                                <h3 className="text-2xl font-bold mb-2 tracking-widest" style={{ color: currentProject.color || PRIMARY_COLOR }}>
                                    {currentProject.title}
                                </h3>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    {currentProject.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Carousel Navigation */}
                        <motion.div 
                            className="absolute z-20 top-1/2 left-0 transform -translate-y-1/2 cursor-pointer p-3 rounded-full bg-black bg-opacity-30 hover:bg-opacity-70 transition-colors"
                            onClick={() => paginate(-1)}
                        >
                            <FaChevronLeft size={20} color={LIGHT_TEXT} />
                        </motion.div>
                        <motion.div 
                            className="absolute z-20 top-1/2 right-0 transform -translate-y-1/2 cursor-pointer p-3 rounded-full bg-black bg-opacity-30 hover:bg-opacity-70 transition-colors"
                            onClick={() => paginate(1)}
                        >
                            <FaChevronRight size={20} color={LIGHT_TEXT} />
                        </motion.div>
                    </div>
                </div>
            </div>
        </FullPageSection>
    );
});

export default TrustedBySegment;