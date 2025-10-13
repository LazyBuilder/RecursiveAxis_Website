// src/ProjectsPage.jsx (FINAL, FIXED VARIABLE HEIGHT)

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Link } from 'react-router-dom';
import { colors } from './components/UIMain'; 
import { FaArrowLeft, FaSearch, FaTimes } from 'react-icons/fa';

// SHARED COMPONENTS (Assuming these exist and are correct)
import Header from './components/Header';
import Footer from './components/Footer'; 

// CRITICAL: LOCAL IMAGE IMPORTS 
import MSHImage from './photos/mshcg-dugapuja.png';   
import VerveImage from './photos/verve-photography.png';  

// --- PROJECT DATA (Using the 3-Tag Structure) ---
const projectData = [
    // Long Text, Image (Should be TALL)
    { id: 1, title: "AI Image Classifier Model", description: "Trained and deployed a high-accuracy Convolutional Neural Network (CNN) for medical image classification using TensorFlow/Keras. Achieved 98.5% accuracy, significantly improving diagnostic speed. This was a complex, data-intensive ML project that involved extensive data preprocessing, model tuning, and cloud deployment on AWS SageMaker.", tags: ['Python', 'Code', 'Healthcare'], imageSrc: MSHImage, link: '#', color: colors.primary, },
    // Medium Text, Image (Should be MEDIUM)
    { id: 2, title: "FinTech Dashboard", description: "Built a secure, real-time analytics dashboard for wealth management clients using Node.js, PostgreSQL, and React. Focused on data visualization and robust authentication.", tags: ['Node.js', 'Website', 'FinTech'], imageSrc: VerveImage, link: '#', color: colors.secondary, },
    // Short Text, No Image (Should be SHORT/SHRUNK)
    { id: 3, title: "Kubernetes Deployment Pipeline", description: "Automated E2E CI/CD pipeline using Jenkins and Kubernetes for zero-downtime deployment.", tags: ['Kubernetes', 'Strategy', 'DevOps'], imageSrc: null, link: '#', color: colors.secondary, },
    // Long Text, Image (Should be TALL)
    { id: 4, title: "MSH Cultural Group Platform", description: "Delivered a full-featured, multi-language ticketing and information platform emphasizing ultra-low-cost deployment using React and AWS Amplify. The platform handles thousands of ticket transactions annually and significantly reduced manual overhead.", tags: ['React', 'Website', 'Non-profit'], imageSrc: MSHImage, link: 'https://www.mshculturalgroup.com/', color: colors.primary, },
    // Short Text, No Image (Should be SHORT/SHRUNK)
    { id: 5, title: "Verve Photography Portfolio", description: "A high-impact portfolio site optimized for speed and retina displays using React and Tailwind CSS.", tags: ['Tailwind', 'Website', 'Design'], imageSrc: null, link: 'https://verve.photography/', color: colors.primary, },
    // Very Long Text, Image (Should be TALL with scrollbar)
    { id: 6, title: "E-commerce Microservices Backend", description: "Designed and implemented a scalable microservices architecture for a mid-sized e-commerce platform handling 10k+ daily transactions. Utilized RabbitMQ for message queuing, Docker for containerization, and implemented circuit breakers for resilience, ensuring high availability and fault tolerance across all core services including inventory, payments, and fulfillment. This was a critical production system upgrade.", tags: ['Microservices', 'Code', 'E-commerce'], imageSrc: VerveImage, link: '#', color: colors.secondary, },
    // Medium Text, Image (Should be MEDIUM)
    { id: 7, title: "EcoConnect Community Tracker", description: "Mobile-first web app using Firebase and React Native Web for real-time tracking of community recycling efforts, resulting in a 20% increase in volume.", tags: ['React Native', 'Website', 'Community'], imageSrc: MSHImage, link: '#', color: colors.primary, },
    // Short Text, No Image (Should be SHORT/SHRUNK)
    { id: 8, title: "Healthcare Portal Compliance", description: "Designed and implemented a HIPAA-compliant patient communication portal on AWS, focusing on security and data privacy.", tags: ['AWS', 'Reports', 'Healthcare'], imageSrc: null, link: '#', color: colors.secondary, },
];

// ==========================================================
// --- PROJECT CARD COMPONENT (Dynamic Height, Fixed) ---
// ==========================================================
const ProjectCard = ({ project }) => {
    
    return (
        <motion.a
            href={project.link === '#' ? undefined : project.link}
            target={project.link === '#' ? undefined : "_blank"}
            rel={project.link === '#' ? undefined : "noopener noreferrer"}
            // Removed fixed minHeight/maxHeight. Card height is now truly 'auto' based on content.
            className={`flex flex-col w-full p-4 bg-white rounded-xl border border-gray-200 transition-all duration-300 transform hover:shadow-xl hover:scale-[1.01] cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ 
                borderTop: `6px solid ${project.color}`, 
            }}
        >
            <h3 className="text-xl font-extrabold mb-2" style={{ color: colors.dark }}>
                {project.title}
            </h3>

            {/* Image Section */}
            {project.imageSrc && (
                <div className="w-full aspect-[16/9] overflow-hidden rounded-lg my-3 shadow-sm">
                    <img 
                        src={project.imageSrc} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            
            {/* Description Section with a controlled maxHeight for scrolling */}
            <div 
                className={`text-sm text-gray-700 leading-relaxed mb-4 flex-grow pr-2`}
                // This is the key: it grows until it hits this limit, then a scrollbar appears.
                style={{ maxHeight: project.imageSrc ? '150px' : '200px', overflowY: 'auto' }}
            >
                {project.description}
            </div>
            
            {/* Tags Section (Only 3 tags, clearly defined) */}
            <div className="mt-auto pt-2 border-t border-gray-100 flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag, index) => (
                    <span 
                        key={tag} 
                        className={`px-3 py-1 text-xs font-semibold text-white rounded-full flex-shrink-0 ${index === 0 ? 'bg-gray-600' : index === 1 ? 'bg-indigo-600' : 'bg-green-600'}`}
                        style={{ opacity: 0.9 }}
                    >
                        {tag}
                    </span>
                ))}
            </div>
            
        </motion.a>
    );
};


// ==========================================================
// --- MAIN PROJECTS PAGE COMPONENT (Masonry Grid) ---
// ==========================================================
const ProjectsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProjects = useMemo(() => {
        if (!searchTerm) return projectData;
        const lowerCaseSearch = searchTerm.toLowerCase();
        
        return projectData.filter(project => 
            project.title.toLowerCase().includes(lowerCaseSearch) ||
            project.description.toLowerCase().includes(lowerCaseSearch) ||
            (project.tags && project.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch)))
        );
    }, [searchTerm]);

    const MotionLink = motion(Link);

    return (
        // 1. Root Container: h-screen flex flex-col overflow-hidden 
        <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: colors.light, color: colors.dark }}>
            
            <Header />

            {/* 2. Content Wrapper: Scrollable Main Content */}
            <div className="flex-grow flex flex-col overflow-y-auto"> 
                
                {/* ---------------------------------------------------- */}
                {/* === TOP HEADER/SEARCH BAR (Thin and Clean) === */}
                {/* ---------------------------------------------------- */}
                <div className="w-full flex-shrink-0 pt-[80px] px-4 py-3 bg-white shadow-md sticky top-0 z-10 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto"> 
                        
                        {/* Title, Back Link, and Search in a compact row */}
                        <div className="flex items-center justify-between relative">
                            
                            {/* Back Link (Left) */}
                            <MotionLink
                                to="/" 
                                className="flex items-center text-sm font-semibold text-gray-700 hover:text-black transition-colors duration-300 flex-shrink-0 mr-4 md:mr-6"
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <FaArrowLeft className="mr-2 hidden sm:inline" /> 
                                <span className="hidden md:inline">Back to Home</span>
                                <span className="md:hidden">Home</span>
                            </MotionLink>

                            {/* Centered Title */}
                            <h1 className="text-xl md:text-3xl font-extrabold animated-gradient hidden lg:flex items-center justify-center pointer-events-none absolute inset-0">
                                Project Portfolio
                            </h1>
                            
                            {/* Search Bar (Right) - The only filtering tool */}
                            <div className="relative w-full max-w-sm ml-auto">
                                <input
                                    type="text"
                                    placeholder="Search technologies, types, or industries..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-2 pl-9 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-black focus:border-black transition-all"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={12} />
                                {searchTerm && (
                                    <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                        <FaTimes size={12} />
                                    </button>
                                )}
                            </div>
                        </div> 
                    </div> 
                </div> 

                {/* ---------------------------------------------------- */}
                {/* === FIXED-WIDTH MASONRY STYLE PROJECT GRID === */}
                {/* ---------------------------------------------------- */}
                <main className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 flex-grow"> 
                    
                    <AnimatePresence mode="wait">
                        {filteredProjects.length > 0 ? (
                            <motion.div 
                                // This grid structure provides the fixed-width columns and flexible vertical spacing
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                                layout
                            >
                                {filteredProjects.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </motion.div>
                        ) : (
                             <motion.div
                                key="no-results"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-center w-full min-h-[300px] text-gray-500 text-xl"
                            >
                                No projects found matching your search term.
                            </motion.div>
                        )}
                    </AnimatePresence>

                </main>
            </div> 

            <Footer />

            {/* CSS for gradient on this page's title */}
            <style>
            {`
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
        </div>
    );
};

export default ProjectsPage;