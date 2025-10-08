// src/ProjectsPage.jsx (New Dedicated Page Refactored for Inbox Layout & Search)

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { colors } from './components/UIMain'; 
import { FaArrowLeft, FaSearch, FaTimes } from 'react-icons/fa';

// 💡 NEW IMPORTS: Shared Header and Footer (ContactCTA)
import Header from './components/Header';
// Assuming ContactCTA is in src/components/ and contains the footer content
import ContactCTA from './components/ContactCTA'; 

// ==========================================================
// CRITICAL: LOCAL IMAGE IMPORTS 
import MSHImage from './photos/mshcg-dugapuja.png';    
import VerveImage from './photos/verve-photography.png';  
// ==========================================================

// --- PROJECT DATA (Full List) ---
const projectData = [
    { id: 1, title: "MSH Cultural Group Platform", description: "Successfully delivered a full-featured, multi-language ticketing and information platform emphasizing ultra-low-cost deployment (under $25/year operational cost) and simplified content management for non-technical users. Key technologies: React, AWS Amplify.", tags: ['Web', 'Ticketing', 'Non-profit'], imageSrc: MSHImage, link: 'https://www.mshculturalgroup.com/', color: colors.primary, },
    { id: 2, title: "Verve Photography Portfolio", description: "A high-impact, high-resolution portfolio site optimized for speed and retina displays. Developed rapidly (2 days) using React and Tailwind CSS, demonstrating expertise in modern, rapid full-stack development. Key technologies: React, Tailwind, Performance.", tags: ['Web', 'Design', 'Portfolio'], imageSrc: VerveImage, link: 'https://verve.photography/', color: colors.secondary, },
    { id: 3, title: "EcoConnect Community Tracker", description: "Developed a mobile-first web app using Firebase and React Native Web for real-time tracking of community recycling efforts. This gamified approach resulted in a 20% increase in monthly recycling volume. Key technologies: React Native Web, Firebase, Gamification.", tags: ['Mobile', 'Tracker', 'Community'], imageSrc: MSHImage, link: '#', color: colors.primary, },
    { id: 4, title: "FinTech Dashboard", description: "Built a secure, real-time analytics dashboard for wealth management clients using Node.js and PostgreSQL. Key technologies: Node.js, PostgreSQL, Security.", tags: ['Web', 'FinTech', 'Dashboard'], imageSrc: VerveImage, link: '#', color: colors.secondary, },
    { id: 5, title: "Healthcare Portal", description: "Designed and implemented a HIPAA-compliant patient communication portal. Key technologies: HIPAA, AWS, UX.", tags: ['Web', 'Healthcare', 'Security'], imageSrc: MSHImage, link: '#', color: colors.primary, },
    { id: 6, title: "E-commerce Backend", description: "Scalable microservices architecture for a mid-sized e-commerce platform handling 10k+ daily transactions. Key technologies: Microservices, E-commerce, Scaling.", tags: ['Backend', 'E-commerce', 'Scaling'], imageSrc: VerveImage, link: '#', color: colors.secondary, },
];


// ==========================================================
// --- PROJECT LIST ITEM COMPONENT ---
// ==========================================================
const ProjectListItem = ({ project, selected, onClick }) => (
    <motion.div
        className={`w-full p-4 border-b transition-all duration-200 cursor-pointer ${selected ? 'bg-gray-100 border-l-4 border-l-black' : 'bg-white hover:bg-gray-50'}`}
        onClick={() => onClick(project)}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
    >
        <h3 className="text-lg font-bold truncate" style={{ color: project.color }}>
            {project.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
            {project.description.substring(0, 80)}...
        </p>
    </motion.div>
);


// ==========================================================
// --- PROJECT DETAIL PANEL COMPONENT (Replaces Modal) ---
// ==========================================================
const ProjectDetailPanel = ({ project, onClose }) => {
    
    if (!project) return null;

    return (
        <motion.div
            className="w-full h-full p-6 md:p-10 bg-white shadow-2xl overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "tween", duration: 0.3 }}
        >
            <div className="sticky top-0 bg-white pb-4 z-10 flex items-center justify-between border-b mb-6">
                <h2 className="text-3xl font-extrabold text-gray-800" style={{ color: project.color }}>
                    {project.title}
                </h2>
                <button
                    className="text-gray-500 hover:text-black transition-colors"
                    onClick={onClose}
                >
                    <FaTimes size={24} />
                </button>
            </div>
            
            <div className="w-full aspect-[16/9] overflow-hidden rounded-lg mb-6 shadow-md">
                <img src={project.imageSrc} alt={project.title} className="w-full h-full object-cover"/>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {project.description}
            </p>
            
            <div className="mb-8 flex flex-wrap gap-2">
                {project.tags && project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-200 text-sm font-semibold text-gray-700 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>

            {project.link && (
                <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 text-base rounded-full font-semibold transition-all duration-300 shadow-xl hover:scale-[1.02] text-black"
                    style={{ backgroundColor: project.color }}
                >
                    Visit Live Project &rarr;
                </a>
            )}
            
        </motion.div>
    );
};


// ==========================================================
// --- MAIN PROJECTS PAGE COMPONENT ---
// ==========================================================
const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState(null); 
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

    const handleSelectProject = (project) => setSelectedProject(project);
    const handleCloseDetail = () => setSelectedProject(null);

    // Use motion(Link) for the Back button animation
    const MotionLink = motion(Link);

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.light, color: colors.dark }}>
            
            {/* 💡 HEADER INTEGRATION */}
            <Header />

            {/* Main Content Area: Padding top to clear fixed header */}
            <main className="flex-grow pt-[80px] flex overflow-hidden"> 
                
                {/* === PROJECT LIST / INBOX PANEL === */}
                <div 
                    className={`h-full overflow-y-auto transition-all duration-300 ${selectedProject ? 'w-1/3 min-w-[350px] max-w-sm border-r' : 'w-full max-w-4xl mx-auto'}`}
                    style={{ backgroundColor: colors.light }}
                >
                    
                    <div className="p-4 pt-8 sticky top-0 bg-white z-20 shadow-sm">
                        {/* Title & Back Button */}
                        <MotionLink
                            to="/" 
                            className="flex items-center text-lg font-semibold text-gray-700 hover:text-black transition-colors duration-300 mb-6"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <FaArrowLeft className="mr-3" /> Back to Home
                        </MotionLink>

                        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 animated-gradient">
                            Project Portfolio
                        </h1>
                        <p className="text-md text-gray-600 mb-6">
                            A comprehensive look at our work. ({filteredProjects.length} results)
                        </p>

                        {/* Search Bar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by title, keyword, or tag..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                    <FaTimes />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Project List */}
                    <div className="mt-4 pb-4">
                        {filteredProjects.map((project) => (
                            <ProjectListItem 
                                key={project.id} 
                                project={project} 
                                selected={selectedProject && selectedProject.id === project.id}
                                onClick={handleSelectProject} 
                            />
                        ))}
                        {filteredProjects.length === 0 && (
                            <p className="text-center text-gray-500 p-10">No projects found matching "{searchTerm}".</p>
                        )}
                    </div>
                </div>

                {/* === DETAIL PANEL AREA (Inbox Slide-In) === */}
                <motion.div 
                    className={`h-full ${selectedProject ? 'w-2/3' : 'w-0'}`}
                >
                    <AnimatePresence mode="wait">
                        {selectedProject && (
                            <ProjectDetailPanel 
                                key={selectedProject.id}
                                project={selectedProject} 
                                onClose={handleCloseDetail} 
                            />
                        )}
                    </AnimatePresence>
                    
                    {/* Placeholder when no project is selected */}
                    {!selectedProject && (
                        <div className="flex items-center justify-center w-full h-full bg-gray-50 text-gray-400 text-xl">
                            Select a project to view details.
                        </div>
                    )}
                </motion.div>
            </main>

            {/* 💡 FOOTER INTEGRATION (Assuming ContactCTA renders the footer content) */}
            {/* Note: In a dedicated page, you might just include the footer component directly, 
               but ContactCTA is used here based on your description. */}
            <ContactCTA />

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