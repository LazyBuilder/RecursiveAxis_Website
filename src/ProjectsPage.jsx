// src/ProjectsPage.jsx (New Dedicated Page for All Projects)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from './components/UIMain'; 
import { FaArrowLeft } from 'react-icons/fa';

// ==========================================================
// 🚨 CRITICAL: LOCAL IMAGE IMPORTS - You must define all projects here or import them from a shared file.
// Assuming images are imported here for the sake of a working component
import MSHImage from './photos/mshcg-dugapuja.png';    
import VerveImage from './photos/verve-photography.png';  
// ==========================================================

// --- PROJECT DATA (Full List) ---
// This list should contain ALL your projects, including the ones used for the teaser.
const projectData = [
    { id: 1, title: "MSH Cultural Group Platform", description: "Successfully delivered a full-featured, multi-language ticketing and information platform emphasizing ultra-low-cost deployment (under $25/year operational cost) and simplified content management for non-technical users.", imageSrc: MSHImage, link: 'https://www.mshculturalgroup.com/', color: colors.primary, },
    { id: 2, title: "Verve Photography Portfolio", description: "A high-impact, high-resolution portfolio site optimized for speed and retina displays. Developed rapidly (2 days) using React and Tailwind CSS, demonstrating expertise in modern, rapid full-stack development.", imageSrc: VerveImage, link: 'https://verve.photography/', color: colors.secondary, },
    { id: 3, title: "EcoConnect Community Tracker", description: "Developed a mobile-first web app using Firebase and React Native Web for real-time tracking of community recycling efforts. This gamified approach resulted in a 20% increase in monthly recycling volume.", imageSrc: MSHImage, link: '#', color: colors.primary, },
    // Add additional projects here to fill out the list
    { id: 4, title: "FinTech Dashboard", description: "Built a secure, real-time analytics dashboard for wealth management clients using Node.js and PostgreSQL.", imageSrc: VerveImage, link: '#', color: colors.secondary, },
    { id: 5, title: "Healthcare Portal", description: "Designed and implemented a HIPAA-compliant patient communication portal.", imageSrc: MSHImage, link: '#', color: colors.primary, },
    { id: 6, title: "E-commerce Backend", description: "Scalable microservices architecture for a mid-sized e-commerce platform handling 10k+ daily transactions.", imageSrc: VerveImage, link: '#', color: colors.secondary, },
];


// ==========================================================
// --- PROJECT LIST ITEM COMPONENT (Reused from previous iteration) ---
// ==========================================================
const ProjectListItem = ({ project, onClick }) => (
    <motion.div
        className="w-full flex items-center p-4 md:p-6 bg-white border border-gray-200 rounded-xl shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:bg-gray-50"
        whileHover={{ x: 5 }}
        onClick={() => onClick(project)}
    >
        <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-20 aspect-[4/3] overflow-hidden rounded-lg mr-6 shadow-inner">
            <img src={project.imageSrc} alt={project.title} className="w-full h-full object-cover"/>
        </div>
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
// --- PROJECT DETAIL MODAL COMPONENT (Copied over) ---
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
// --- MAIN PROJECTS PAGE COMPONENT ---
// ==========================================================
const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState(null); 

    const openModal = (project) => setSelectedProject(project);
    const closeModal = () => setSelectedProject(null);

    return (
        <>
            <div className="min-h-screen pt-32 pb-16 px-4" style={{ backgroundColor: colors.light, color: colors.dark }}>
                
                {/* Back to Home Button */}
                <motion.a
                    href="/" // Link back to the home route
                    className="flex items-center text-lg font-semibold text-gray-700 hover:text-black transition-colors duration-300 mb-8 max-w-5xl mx-auto"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <FaArrowLeft className="mr-3" /> Back to Home
                </motion.a>

                {/* Page Title */}
                <motion.h1
                    className="text-5xl md:text-6xl font-extrabold text-center mb-4 animated-gradient"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Project Portfolio
                </motion.h1>
                <p className="text-xl text-center text-gray-600 mb-12">
                    A comprehensive look at our development, design, and strategy work.
                </p>

                {/* Full Vertical Scroll List - No Max-Height Constraint */}
                <div className="w-full max-w-5xl mx-auto space-y-6">
                    {projectData.map((project) => (
                        <ProjectListItem 
                            key={project.id} 
                            project={project} 
                            onClick={openModal} 
                        />
                    ))}
                </div>
            </div>
            
            {/* Modal for project details */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal 
                        project={selectedProject} 
                        onClose={closeModal} 
                    />
                )}
            </AnimatePresence>
            
            {/* CSS for gradient on this page's title */}
            <style>
            {`
                /* Title Gradient (Copied from Home.jsx for consistency) */
                .animated-gradient {
                    background: linear-gradient(45deg, ${colors.primary}, ${colors.secondary}, ${colors.primary});
                    background-size: 400% 400%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradient-animation 15s ease infinite;
                }
                @keyframes gradient-animation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}
            </style>
        </>
    );
};

export default ProjectsPage;