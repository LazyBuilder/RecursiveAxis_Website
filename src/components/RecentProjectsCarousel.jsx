// src/components/RecentProjectsCarousel.jsx (Vertical Scroll List Showcase)

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

// --- PROJECT DATA (Unchanged) ---
const projectData = [
  {
    id: 1,
    title: "MSH Cultural Group Platform", 
    description: "Successfully delivered a full-featured, multi-language ticketing and information platform emphasizing ultra-low-cost deployment (under $25/year operational cost) and simplified content management for non-technical users.", 
    imageSrc: MSHImage, 
    link: 'https://www.mshculturalgroup.com/',
    color: PRIMARY_COLOR,
  },
  {
    id: 2,
    title: "Verve Photography Portfolio", 
    description: "A high-impact, high-resolution portfolio site optimized for speed and retina displays. Developed rapidly (2 days) using React and Tailwind CSS, demonstrating expertise in modern, rapid full-stack development.", 
    imageSrc: VerveImage, 
    link: 'https://verve.photography/',
    color: SECONDARY_COLOR,
  },
    {
    id: 3,
    title: "EcoConnect Community Tracker",
    description: "Developed a mobile-first web app using Firebase and React Native Web for real-time tracking of community recycling efforts. This gamified approach resulted in a 20% increase in monthly recycling volume.",
    imageSrc: MSHImage,
    link: '#',
    color: PRIMARY_COLOR,
  },
    // Adding more duplicates to ensure the vertical scroll is visible and testable
    { id: 4, title: "FinTech Dashboard", description: "Built a secure, real-time analytics dashboard for wealth management clients using Node.js and PostgreSQL.", imageSrc: VerveImage, link: '#', color: SECONDARY_COLOR, },
    { id: 5, title: "Healthcare Portal", description: "Designed and implemented a HIPAA-compliant patient communication portal.", imageSrc: MSHImage, link: '#', color: PRIMARY_COLOR, },
    { id: 6, title: "E-commerce Backend", description: "Scalable microservices architecture for a mid-sized e-commerce platform handling 10k+ daily transactions.", imageSrc: VerveImage, link: '#', color: PRIMARY_COLOR, },
];


// ==========================================================
// --- PROJECT DETAIL MODAL COMPONENT (Unchanged) ---
// ==========================================================
const ProjectModal = ({ project, onClose }) => {
    // ... (Modal logic is unchanged) ...
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
                <button
                    className="absolute top-4 right-4 text-3xl font-bold text-gray-700 hover:text-gray-900 z-20"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-t-xl">
                    <img src={project.imageSrc} alt={project.title} className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                            {project.title}
                        </h2>
                    </div>
                </div>
                <div className="p-6 md:p-10">
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
// --- PROJECT LIST ITEM COMPONENT ---
// Reusing ProjectCard but adjusting styling for vertical list
// ==========================================================
const ProjectListItem = ({ project, onClick }) => (
    <motion.div
        className="w-full flex items-center p-4 md:p-6 bg-white border border-gray-200 rounded-xl shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:bg-gray-50"
        whileHover={{ x: 5 }} // Subtle horizontal shift on hover
        onClick={() => onClick(project)}
    >
        {/* Project Thumbnail (Left) */}
        <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-20 aspect-[4/3] overflow-hidden rounded-lg mr-6 shadow-inner">
            <img 
                src={project.imageSrc} 
                alt={project.title} 
                className="w-full h-full object-cover"
            />
        </div>
        
        {/* Project Title and Description Snippet (Right) */}
        <div className="flex-grow">
            <h3 className="text-xl sm:text-2xl font-extrabold mb-1 text-gray-800" style={{ color: project.color }}>
                {project.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
                {project.description.substring(0, 100)}...
            </p>
        </div>
    </motion.div>
);


// ==========================================================
// --- MAIN COMPONENT ---
// ==========================================================
const RecentProjectsCarousel = React.forwardRef((props, ref) => {
    const [selectedProject, setSelectedProject] = useState(null); 

    const openModal = (project) => setSelectedProject(project);
    const closeModal = () => setSelectedProject(null);

    return (
        <>
            {/* CSS STYLES (Removed horizontal scroll styles, kept gradient) */}
            <style>
            {`
                /* Title Gradient (Unchanged) */
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
            `}
            </style>

            <FullPageSection 
                id="projects" 
                ref={ref} 
                style={{ backgroundColor: BACKGROUND_LIGHT, color: TEXT_DARK }}
                bgClass="text-dark" 
            >
                <div className="w-full relative z-10 flex flex-col items-center justify-start pt-24 pb-20 px-4 h-full">
                    
                    <div className="w-full flex flex-col items-center">
                        {/* === MAIN TITLE === */}
                        <motion.h2
                            className={`text-3xl md:text-5xl font-extrabold mb-8 global-animated-title`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                        >
                            FEATURED PROJECTS
                        </motion.h2>
                    </div>

                    {/* === VERTICAL SCROLL CONTAINER === */}
                    <div 
                        // 💡 KEY CHANGE: Fixed max height and vertical scroll
                        className="w-full max-w-4xl max-h-[70vh] overflow-y-scroll space-y-4 p-4 md:p-6 rounded-xl bg-white/50 shadow-inner"
                    >
                        {projectData.map((project) => (
                            <ProjectListItem 
                                key={project.id} 
                                project={project} 
                                onClick={openModal} 
                            />
                        ))}
                    </div>
                    
                    <p className="mt-8 text-gray-500 text-sm italic">
                        Scroll down to see the complete list. Click any item for details.
                    </p>
                </div>
            </FullPageSection>
            
            {/* === MODAL WINDOW (Unchanged) === */}
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