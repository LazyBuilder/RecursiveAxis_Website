// src/components/RecentProjectsCarousel.jsx (Modern Horizontal Scroll Showcase)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FullPageSection from './FullPageSection'; 

// ==========================================================
// 🚨 CRITICAL: LOCAL IMAGE IMPORTS - CHECK NAMES IN src/photos/
import MSHImage from '../photos/mshcg-dugapuja.png';    
import VerveImage from '../photos/verve-photography.png';  
// ==========================================================

// Define global constants (assuming these are defined in UIMain.jsx or globally)
const PRIMARY_COLOR = '#00EAFF'; 
const SECONDARY_COLOR = '#FF00EA'; 
const BACKGROUND_LIGHT = '#f7f7f7'; 
const TEXT_DARK = '#1a1a1a'; 

// --- PROJECT DATA (Simplified Content) ---
const projectData = [
  {
    id: 1,
    title: "MSH Cultural Group Platform", // Simplified title
    description: "Successfully delivered a full-featured, multi-language ticketing and information platform emphasizing ultra-low-cost deployment (under $25/year operational cost) and simplified content management for non-technical users.", // Combines details
    imageSrc: MSHImage, 
    link: 'https://www.mshculturalgroup.com/',
    color: PRIMARY_COLOR,
  },
  {
    id: 2,
    title: "Verve Photography Portfolio", // Simplified title
    description: "A high-impact, high-resolution portfolio site optimized for speed and retina displays. Developed rapidly (2 days) using React and Tailwind CSS, demonstrating expertise in modern, rapid full-stack development.", // Combines details
    imageSrc: VerveImage, 
    link: 'https://verve.photography/',
    color: SECONDARY_COLOR,
  },
    // Add more projects here easily...
    {
    id: 3,
    title: "EcoConnect Community Tracker",
    description: "Developed a mobile-first web app using Firebase and React Native Web for real-time tracking of community recycling efforts. This gamified approach resulted in a 20% increase in monthly recycling volume.",
    imageSrc: MSHImage, // Use a placeholder image if needed
    link: '#',
    color: PRIMARY_COLOR,
  },
];


// ==========================================================
// --- PROJECT DETAIL MODAL COMPONENT ---
// ==========================================================
const ProjectModal = ({ project, onClose }) => {
    
    if (!project) return null;

    return (
        <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto text-dark"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-3xl font-bold text-gray-700 hover:text-gray-900 z-20"
                    onClick={onClose}
                >
                    &times;
                </button>

                {/* Image and Title Section */}
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-t-xl">
                    <img 
                        src={project.imageSrc} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                            {project.title}
                        </h2>
                    </div>
                </div>

                {/* Details Text Section - SIMPLIFIED */}
                <div className="p-6 md:p-10">
                    
                    {/* The main description is now the primary body text */}
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        {project.description}
                    </p>

                    {project.link && (
                        <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 px-8 py-3 text-base rounded-full font-semibold transition-all duration-300 shadow-xl hover:scale-[1.02] hover:shadow-2xl text-black"
                            style={{ backgroundColor: project.color }}
                        >
                            Visit Live Project &rarr;
                        </a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};


// ==========================================================
// --- PROJECT CARD COMPONENT (for horizontal scroll) ---
// ==========================================================
const ProjectCard = ({ project, onClick }) => (
    <motion.div
        className="flex-shrink-0 w-80 md:w-96 snap-center cursor-pointer shadow-xl rounded-xl overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
        whileHover={{ y: -5 }}
        onClick={() => onClick(project)}
    >
        <div className="relative w-full aspect-[4/3] overflow-hidden">
            <img 
                src={project.imageSrc} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <div className="p-5">
            {/* Displaying only the title */}
            <h3 className="text-xl font-extrabold text-gray-800" style={{ color: project.color }}>
                {project.title}
            </h3>
        </div>
    </motion.div>
);


// ==========================================================
// --- MAIN COMPONENT (remains largely the same) ---
// ==========================================================
const RecentProjectsCarousel = React.forwardRef((props, ref) => {
    const [selectedProject, setSelectedProject] = useState(null); 

    const openModal = (project) => setSelectedProject(project);
    const closeModal = () => setSelectedProject(null);

    return (
        <>
            {/* CSS STYLES (unchanged) */}
            <style>
            {`
                /* Title Gradient */
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

                /* Custom scrollbar styling for modern look */
                .horizontal-scroll-snap {
                    scroll-snap-type: x mandatory;
                    -webkit-overflow-scrolling: touch;
                }
                .horizontal-scroll-snap::-webkit-scrollbar {
                    height: 8px;
                }
                .horizontal-scroll-snap::-webkit-scrollbar-thumb {
                    background-color: #ccc;
                    border-radius: 10px;
                }
                .horizontal-scroll-snap::-webkit-scrollbar-track {
                    background: ${BACKGROUND_LIGHT};
                }
            `}
            </style>

            <FullPageSection 
                id="projects" 
                ref={ref} 
                style={{ backgroundColor: BACKGROUND_LIGHT, color: TEXT_DARK }}
                bgClass="text-dark" 
            >
                <div className="w-full relative z-10 flex flex-col items-center justify-center pt-24 pb-20">
                    
                    <div className="w-full flex flex-col items-center px-4">
                        {/* === MAIN TITLE === */}
                        <motion.h2
                            className={`text-3xl md:text-5xl font-extrabold mb-12 global-animated-title`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                        >
                            RECENT PROJECTS
                        </motion.h2>
                    </div>

                    {/* === HORIZONTAL SCROLL CONTAINER === */}
                    <div 
                        className="horizontal-scroll-snap flex overflow-x-scroll w-full py-6 md:py-10 space-x-8 px-4 md:px-12 lg:px-24"
                    >
                        {projectData.map((project) => (
                            <ProjectCard 
                                key={project.id} 
                                project={project} 
                                onClick={openModal} 
                            />
                        ))}
                        
                        <div className="flex-shrink-0 w-4 md:w-8"></div>
                    </div>
                    
                    <p className="mt-8 text-gray-500 text-sm italic">
                        Click any project thumbnail for details.
                    </p>
                </div>
            </FullPageSection>
            
            {/* === MODAL WINDOW === */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal 
                        project={selectedProject} 
                        onClose={closeModal} 
                    />
                )}
            </AnimatePresence>
        </>
    );
});

export default RecentProjectsCarousel;