// src/ProjectsPage.jsx (INNOVATIVE AI KNOWLEDGE GRAPH LAYOUT)

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Link } from 'react-router-dom';
import { colors } from './components/UIMain'; 
import { FaArrowLeft, FaSearch, FaTimes, FaChevronDown } from 'react-icons/fa';

// SHARED COMPONENTS
import Header from './components/Header';
import Footer from './components/Footer'; 

// CRITICAL: LOCAL IMAGE IMPORTS 
import MSHImage from './photos/mshcg-dugapuja.png';   
import VerveImage from './photos/verve-photography.png';  

// --- PROJECT DATA (Full List) ---
const projectData = [
    { id: 1, title: "MSH Cultural Group Platform", description: "Successfully delivered a full-featured, multi-language ticketing and information platform emphasizing ultra-low-cost deployment (under $25/year operational cost) and simplified content management for non-technical users. Key technologies: React, AWS Amplify.", tags: ['Web', 'Ticketing', 'Non-profit', 'React'], imageSrc: MSHImage, link: 'https://www.mshculturalgroup.com/', color: colors.primary, },
    { id: 2, title: "Verve Photography Portfolio", description: "A high-impact, high-resolution portfolio site optimized for speed and retina displays. Developed rapidly (2 days) using React and Tailwind CSS, demonstrating expertise in modern, rapid full-stack development. Key technologies: React, Tailwind, Performance.", tags: ['Web', 'Design', 'Portfolio', 'React'], imageSrc: VerveImage, link: 'https://verve.photography/', color: colors.secondary, },
    { id: 3, title: "EcoConnect Community Tracker", description: "Developed a mobile-first web app using Firebase and React Native Web for real-time tracking of community recycling efforts. This gamified approach resulted in a 20% increase in monthly recycling volume. Key technologies: React Native Web, Firebase, Gamification.", tags: ['Mobile', 'Tracker', 'Community', 'Firebase'], imageSrc: MSHImage, link: '#', color: colors.primary, },
    { id: 4, title: "FinTech Dashboard", description: "Built a secure, real-time analytics dashboard for wealth management clients using Node.js and PostgreSQL. Key technologies: Node.js, PostgreSQL, Security.", tags: ['Web', 'FinTech', 'Dashboard', 'Node.js', 'Security'], imageSrc: VerveImage, link: '#', color: colors.secondary, },
    { id: 5, title: "Healthcare Portal", description: "Designed and implemented a HIPAA-compliant patient communication portal. Key technologies: HIPAA, AWS, UX.", tags: ['Web', 'Healthcare', 'Security', 'AWS'], imageSrc: MSHImage, link: '#', color: colors.primary, },
    { id: 6, title: "E-commerce Backend", description: "Scalable microservices architecture for a mid-sized e-commerce platform handling 10k+ daily transactions. Key technologies: Microservices, E-commerce, Scaling.", tags: ['Backend', 'E-commerce', 'Scaling', 'Microservices'], imageSrc: VerveImage, link: '#', color: colors.secondary, },
    { id: 7, title: "AI Image Classifier Model", description: "Trained and deployed a high-accuracy convolutional neural network (CNN) for medical image classification using TensorFlow. Improved diagnostic speed by 35%.", tags: ['AI', 'Machine Learning', 'TensorFlow', 'Python'], imageSrc: MSHImage, link: '#', color: colors.primary, },
    { id: 8, title: "Kubernetes Deployment Pipeline", description: "Automated end-to-end CI/CD pipeline using Jenkins and Kubernetes for zero-downtime deployment across multiple environments.", tags: ['DevOps', 'Kubernetes', 'CI/CD', 'AWS'], imageSrc: VerveImage, link: '#', color: colors.secondary, },
];

// ==========================================================
// --- MOBILE/COLLAPSIBLE DETAIL COMPONENT ---
// ==========================================================
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
// --- MOBILE/SMALL SCREEN LIST ITEM (Enhanced) ---
// ==========================================================
const MobileProjectListItem = ({ project, selected, onClick }) => (
    <>
        <motion.div
            className={`w-full p-4 border-b transition-all duration-200 cursor-pointer flex justify-between items-start ${selected ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`} 
            onClick={() => onClick(project)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-start w-full"> 
                
                {/* 1. Small Thumbnail */}
                <div className="w-16 h-12 flex-shrink-0 mr-4 overflow-hidden rounded-md shadow-sm">
                    <img src={project.imageSrc} alt={project.title} className="w-full h-full object-cover"/>
                </div>

                {/* 2. Text Content */}
                <div className="flex-grow min-w-0">
                    <h3 className="text-lg font-bold truncate" style={{ color: project.color }}>
                        {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                        {project.description.substring(0, 80)}...
                    </p>
                </div>
            </div>
            
            {/* 3. Dropdown Icon */}
            <FaChevronDown className={`ml-4 mt-2 flex-shrink-0 transition-transform duration-300 ${selected ? 'rotate-180' : 'rotate-0'}`} />
        </motion.div>
        
        <AnimatePresence>
            {selected && <MobileProjectDetail project={project} />}
        </AnimatePresence>
    </>
);


// ==========================================================
// --- NEW: LARGE SCREEN PROJECT GRID ITEM ---
// ==========================================================
const DesktopProjectGridItem = ({ project, selected, onClick }) => (
    <motion.div
        className={`w-full p-4 border rounded-xl transition-all duration-300 cursor-pointer flex flex-col hover:shadow-lg ${selected ? 'bg-white shadow-2xl ring-4 ring-offset-2 ring-black' : 'bg-white hover:bg-gray-50'}`}
        onClick={() => onClick(project)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
    >
        <div className="w-full aspect-[4/3] overflow-hidden rounded-lg mb-3">
            <img src={project.imageSrc} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.05]"/>
        </div>
        <h3 className="text-xl font-extrabold mb-1 truncate" style={{ color: project.color }}>
            {project.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-3 mb-3 flex-grow">
            {project.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-auto">
            {project.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 text-xs font-medium text-white rounded-full" style={{ backgroundColor: project.color }}>
                    {tag}
                </span>
            ))}
        </div>
    </motion.div>
);


// ==========================================================
// --- PROJECT DETAIL PANEL COMPONENT (Right Pane for Desktop) ---
// ==========================================================
const ProjectDetailPanel = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <motion.div
            key={project.id} // Added key for AnimatePresence
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
    // State and Memoized logic
    const [selectedProjectId, setSelectedProjectId] = useState(null); 
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTag, setActiveTag] = useState(null); // NEW: Active tag state

    // NEW: Extract All Unique Tags
    const allTags = useMemo(() => {
        const tagCounts = projectData.reduce((acc, project) => {
            project.tags.forEach(tag => {
                acc[tag] = (acc[tag] || 0) + 1;
            });
            return acc;
        }, {});
        // Sort tags by count
        return Object.entries(tagCounts)
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => b.count - a.count); 
    }, []);


    const filteredProjects = useMemo(() => {
        let results = projectData.filter(project => 
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
        );
        
        // NEW: Apply Tag Filter
        if (activeTag) {
            results = results.filter(project => project.tags.includes(activeTag));
        }
        
        return results;
    }, [searchTerm, activeTag]);

    const selectedProject = projectData.find(p => p.id === selectedProjectId);

    const handleSelectProject = (project) => {
        setSelectedProjectId(project.id === selectedProjectId ? null : project.id);
    };

    const handleCloseDetail = () => setSelectedProjectId(null);
    const MotionLink = motion(Link);
    
    // NEW: Tag click handler
    const handleTagClick = (tag) => {
        setActiveTag(activeTag === tag ? null : tag); // Toggle logic
        setSelectedProjectId(null); // Deselect any open project for clean transition
    };

    return (
        // 1. Root Container: h-screen flex flex-col overflow-hidden (static page)
        <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: colors.light, color: colors.dark }}>
            
            <Header />

            {/* 2. Content Wrapper: Takes space between Header and Footer. */}
            <div className="flex-grow flex flex-col h-full overflow-hidden"> 
                
                {/* ---------------------------------------------------- */}
                {/* === TOP HEADER/SEARCH BAR (Fixed & Centered) === */}
                {/* ---------------------------------------------------- */}
                <div className="w-full flex-shrink-0 pt-[80px] p-6 bg-white shadow-md z-20">
                    
                    {/* Max-width container for content alignment */}
                    <div className="max-w-7xl mx-auto px-4"> 
                        
                        {/* 1. NEW ROW STRUCTURE: Link, Title, Search */}
                        <div className="flex items-center justify-between relative mb-4">
                            
                            {/* 1. Back to Home Link (Left Side, Always Visible) */}
                            <MotionLink
                                to="/" 
                                className="flex items-center text-lg font-semibold text-gray-700 hover:text-black transition-colors duration-300 flex-shrink-0"
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <FaArrowLeft className="mr-3" /> Back to Home
                            </MotionLink>

                            {/* 2. Centered Title (Takes Center Stage) */}
                            <h1 className="text-4xl md:text-5xl font-extrabold animated-gradient absolute inset-0 flex items-center justify-center pointer-events-none">
                                Project Portfolio
                            </h1>
                            
                            {/* 3. Search Bar (Right Side, HIDDEN ON SMALL SCREENS) */}
                            <div className="relative w-full max-w-xs ml-auto hidden lg:block flex-shrink-0">
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
                        
                        {/* Responsive Search Bar (VISIBLE ON MOBILE ONLY, below main row) */}
                        <div className="relative mb-2 lg:hidden">
                            <input
                                type="text"
                                placeholder="Search projects..."
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

                        <p className="text-md text-gray-600 text-center mt-2">
                            A comprehensive look at our work. ({filteredProjects.length} results)
                        </p>
                    </div> 
                </div> 

                {/* ---------------------------------------------------- */}
                {/* === INBOX LAYOUT (List + Detail Pane) === */}
                {/* ---------------------------------------------------- */}
                {/* flex-grow ensures this area fills the remaining height below the header/search bar */}
                <main className="w-full max-w-7xl flex flex-grow mx-auto overflow-hidden"> 
                    
                    {/* === LEFT PANEL: PROJECT LIST (Scrollable) === */}
                    <div 
                        className={`h-full flex flex-col transition-all duration-300 flex-shrink-0 border-r w-full lg:w-1/3 lg:min-w-[350px] lg:max-w-sm`}
                        style={{ backgroundColor: colors.light }}
                    >
                        
                        {/* Dynamic Tag Cloud Filter (Desktop Only) */}
                        <div className="hidden lg:flex flex-wrap gap-2 p-4 border-b bg-gray-50 flex-shrink-0">
                            <h4 className="w-full text-sm font-bold text-gray-700 mb-1">Filter by Skill/Area:</h4>
                            <button
                                onClick={() => handleTagClick(null)}
                                className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${activeTag === null ? 'bg-black text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                All Projects ({projectData.length})
                            </button>
                            {allTags.map(({ tag, count }) => (
                                <button
                                    key={tag}
                                    onClick={() => handleTagClick(tag)}
                                    className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 hover:scale-[1.03] ${activeTag === tag ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                                >
                                    {tag} ({count})
                                </button>
                            ))}
                        </div>
                        
                        {/* Project List (SCROLLABLE AREA: flex-grow overflow-y-auto) */}
                        <div className="overflow-y-auto pb-4 flex-grow">
                            
                            {/* Desktop Project Grid Rendering */}
                            <div className="hidden lg:grid grid-cols-1 gap-4 p-4">
                                {filteredProjects.map((project) => (
                                    <DesktopProjectGridItem 
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
                                <p className="text-center text-gray-500 p-10">
                                    No projects found matching "{(searchTerm || activeTag)}"
                                </p>
                            )}
                        </div>
                    </div>

                    {/* === RIGHT PANEL: PROJECT DETAILS (Scrollable) === */}
                    <motion.div 
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
                            <div className="flex items-center justify-center w-full h-full bg-gray-50 text-gray-400 text-xl p-8 text-center">
                                Select a project card from the list to view its full details, key technologies, and live demo.
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