// src/ProjectsPage.jsx (FINAL, MOBILE-READY VERSION)

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Link } from 'react-router-dom';
import { colors } from './components/UIMain'; 
import { FaArrowLeft, FaSearch, FaTimes, FaChevronDown } from 'react-icons/fa';

// SHARED COMPONENTS
import Header from './components/Header';
import Footer from './components/Footer'; 

// ==========================================================
// CRITICAL: LOCAL IMAGE IMPORTS 
import MSHImage from './photos/mshcg-dugapuja.png';    
import VerveImage from './photos/verve-photography.png';  
// ==========================================================

// --- PROJECT DATA (Full List) ---
const projectData = [
    // Ensure all projectData is defined here or imported...
    { id: 1, title: "MSH Cultural Group Platform", description: "Successfully delivered a full-featured, multi-language ticketing and information platform emphasizing ultra-low-cost deployment (under $25/year operational cost) and simplified content management for non-technical users. Key technologies: React, AWS Amplify.", tags: ['Web', 'Ticketing', 'Non-profit'], imageSrc: MSHImage, link: 'https://www.mshculturalgroup.com/', color: colors.primary, },
    { id: 2, title: "Verve Photography Portfolio", description: "A high-impact, high-resolution portfolio site optimized for speed and retina displays. Developed rapidly (2 days) using React and Tailwind CSS, demonstrating expertise in modern, rapid full-stack development. Key technologies: React, Tailwind, Performance.", tags: ['Web', 'Design', 'Portfolio'], imageSrc: VerveImage, link: 'https://verve.photography/', color: colors.secondary, },
    { id: 3, title: "EcoConnect Community Tracker", description: "Developed a mobile-first web app using Firebase and React Native Web for real-time tracking of community recycling efforts. This gamified approach resulted in a 20% increase in monthly recycling volume. Key technologies: React Native Web, Firebase, Gamification.", tags: ['Mobile', 'Tracker', 'Community'], imageSrc: MSHImage, link: '#', color: colors.primary, },
    { id: 4, title: "FinTech Dashboard", description: "Built a secure, real-time analytics dashboard for wealth management clients using Node.js and PostgreSQL. Key technologies: Node.js, PostgreSQL, Security.", tags: ['Web', 'FinTech', 'Dashboard'], imageSrc: VerveImage, link: '#', color: colors.secondary, },
    { id: 5, title: "Healthcare Portal", description: "Designed and implemented a HIPAA-compliant patient communication portal. Key technologies: HIPAA, AWS, UX.", tags: ['Web', 'Healthcare', 'Security'], imageSrc: MSHImage, link: '#', color: colors.primary, },
    { id: 6, title: "E-commerce Backend", description: "Scalable microservices architecture for a mid-sized e-commerce platform handling 10k+ daily transactions. Key technologies: Microservices, E-commerce, Scaling.", tags: ['Backend', 'E-commerce', 'Scaling'], imageSrc: VerveImage, link: '#', color: colors.secondary, },
];


// ==========================================================
// --- MOBILE/COLLAPSIBLE DETAIL COMPONENT ---
// ==========================================================
// This replaces the right pane's content for mobile screens.
const MobileProjectDetail = ({ project }) => (
    <motion.div
        className="w-full p-4 bg-white border-b"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
    >
        <div className="w-full aspect-[16/9] overflow-hidden rounded-lg mb-4 shadow-md">
            <img src={project.imageSrc} alt={project.title} className="w-full h-full object-cover"/>
        </div>
        <p className="text-md text-gray-700 leading-relaxed mb-4">
            {project.description}
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
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
                className="inline-block px-6 py-2 text-sm rounded-full font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02] text-black"
                style={{ backgroundColor: project.color }}
            >
                Visit Live Project &rarr;
            </a>
        )}
    </motion.div>
);


// ==========================================================
// --- MOBILE/SMALL SCREEN LIST ITEM ---
// ==========================================================
const MobileProjectListItem = ({ project, selected, onClick }) => (
    <>
        <motion.div
            className={`w-full p-4 border-b transition-all duration-200 cursor-pointer flex justify-between items-center ${selected ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
            onClick={() => onClick(project)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div>
                <h3 className="text-lg font-bold truncate" style={{ color: project.color }}>
                    {project.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {project.description.substring(0, 80)}...
                </p>
            </div>
            <FaChevronDown className={`ml-4 transition-transform duration-300 ${selected ? 'rotate-180' : 'rotate-0'}`} />
        </motion.div>
        
        <AnimatePresence>
            {selected && <MobileProjectDetail project={project} />}
        </AnimatePresence>
    </>
);


// ==========================================================
// --- LARGE SCREEN PROJECT LIST ITEM (Remains the same as before) ---
// ==========================================================
const DesktopProjectListItem = ({ project, selected, onClick }) => (
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
// --- PROJECT DETAIL PANEL COMPONENT (Right Pane for Desktop) ---
// ==========================================================
const ProjectDetailPanel = ({ project, onClose }) => {
    // ... (This component remains the same as the previous response) ...
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
// --- MAIN PROJECTS PAGE COMPONENT (Unified) ---
// ==========================================================
const ProjectsPage = () => {
    // For Desktop (Two-Pane) and Mobile (Collapsible List)
    const [selectedProjectId, setSelectedProjectId] = useState(null); 
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

    const selectedProject = projectData.find(p => p.id === selectedProjectId);

    const handleSelectProject = (project) => {
        setSelectedProjectId(project.id === selectedProjectId ? null : project.id);
    };

    const handleCloseDetail = () => setSelectedProjectId(null);
    const MotionLink = motion(Link);

    // Determines which list item component to use
    const ListItem = MobileProjectListItem; // Default to mobile behavior
    const ListComponent = ({ project }) => (
        <ListItem 
            key={project.id} 
            project={project} 
            selected={selectedProjectId === project.id}
            onClick={handleSelectProject} 
        />
    );


    return (
        // Root Container: h-screen flex flex-col overflow-hidden (static page)
        <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: colors.light, color: colors.dark }}>
            
            <Header />

            {/* Content Wrapper: flex-grow for space between Header and Footer */}
            <div className="flex-grow flex justify-center **h-full overflow-hidden**"> 
                
                {/* Central Content Area: Max width, centered. Defaults to single column on mobile. */}
                <main className="w-full max-w-7xl flex pt-[80px] overflow-hidden **h-full**"> 
                    
                    {/* ---------------------------------------------------- */}
                    {/* === LEFT/MAIN PANEL (Mobile: Full Width, Desktop: List) === */}
                    {/* ---------------------------------------------------- */}
                    <div 
                        // Mobile: w-full. Desktop: w-1/3 min-w-[350px] max-w-sm border-r
                        className={`h-full flex flex-col transition-all duration-300 flex-shrink-0 w-full lg:w-1/3 lg:min-w-[350px] lg:max-w-sm lg:border-r 
                            ${selectedProject ? 'lg:w-1/3' : 'lg:w-full lg:max-w-4xl lg:mx-auto'}`}
                        style={{ backgroundColor: colors.light }}
                    >
                        
                        {/* List Header/Search (Sticky and NOT scrollable) */}
                        <div className="p-4 pt-8 bg-white z-20 shadow-sm flex-shrink-0">
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
                            <div className="relative mb-4">
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

                        {/* Project List (Scrollable Area) */}
                        <div className="overflow-y-auto pb-4 flex-grow">
                            {/* Desktop List Rendering */}
                            <div className="hidden lg:block">
                                {filteredProjects.map((project) => (
                                    <DesktopProjectListItem 
                                        key={project.id} 
                                        project={project} 
                                        selected={selectedProjectId === project.id}
                                        onClick={handleSelectProject} 
                                    />
                                ))}
                            </div>
                            
                            {/* Mobile/Collapsible List Rendering */}
                            <div className="lg:hidden">
                                {filteredProjects.map((project) => (
                                    <MobileProjectListItem 
                                        key={project.id} 
                                        project={project} 
                                        selected={selectedProjectId === project.id}
                                        onClick={handleSelectProject} 
                                    />
                                ))}
                            </div>

                            {filteredProjects.length === 0 && (
                                <p className="text-center text-gray-500 p-10">No projects found matching "{searchTerm}".</p>
                            )}
                        </div>
                    </div>

                    {/* ---------------------------------------------------- */}
                    {/* === RIGHT PANEL (Desktop Only) === */}
                    {/* ---------------------------------------------------- */}
                    <motion.div 
                        // Mobile: hidden. Desktop: flex-grow w-2/3 (when open)
                        className={`h-full hidden lg:block lg:flex-grow transition-all duration-300 ${selectedProject ? 'lg:w-2/3' : 'lg:w-0'}`}
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