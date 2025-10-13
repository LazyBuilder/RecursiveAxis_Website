// src/ProjectsPage.jsx (NEW MASONRY GRID LAYOUT)

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Link } from 'react-router-dom';
import { colors } from './components/UIMain'; 
import { FaArrowLeft, FaSearch, FaTimes } from 'react-icons/fa';

// SHARED COMPONENTS
import Header from './components/Header';
import Footer from './components/Footer'; 

// CRITICAL: LOCAL IMAGE IMPORTS 
import MSHImage from './photos/mshcg-dugapuja.png';   
import VerveImage from './photos/verve-photography.png';  

// --- PROJECT DATA (Full List with varying content/type) ---
const projectData = [
    // IMPORTANT AI/ML PROJECT (Large focus)
    { id: 1, title: "AI Image Classifier Model", description: "Trained and deployed a high-accuracy Convolutional Neural Network (CNN) for medical image classification using TensorFlow/Keras. Achieved 98.5% accuracy, significantly improving diagnostic speed for three key conditions. This was a complex, data-intensive ML project.", tags: ['AI', 'Machine Learning', 'TensorFlow', 'Python', 'Healthcare'], imageSrc: MSHImage, link: '#', color: colors.primary, type: 'Large', },
    // Standard Web Project
    { id: 2, title: "FinTech Dashboard", description: "Built a secure, real-time analytics dashboard for wealth management clients using Node.js, PostgreSQL, and React. Focused on data visualization and robust authentication.", tags: ['Web', 'FinTech', 'Dashboard', 'Security'], imageSrc: VerveImage, link: '#', color: colors.secondary, type: 'Medium', },
    // Short DevOps Project
    { id: 3, title: "Kubernetes Deployment Pipeline", description: "Automated E2E CI/CD pipeline using Jenkins and Kubernetes for zero-downtime deployment.", tags: ['DevOps', 'Kubernetes', 'CI/CD', 'AWS'], imageSrc: null, link: '#', color: colors.secondary, type: 'Small', },
    // Medium Web Platform
    { id: 4, title: "MSH Cultural Group Platform", description: "Delivered a full-featured, multi-language ticketing and information platform emphasizing ultra-low-cost deployment (under $25/year operational cost) using React and AWS Amplify.", tags: ['Web', 'Ticketing', 'Non-profit', 'React'], imageSrc: MSHImage, link: 'https://www.mshculturalgroup.com/', color: colors.primary, type: 'Medium', },
    // Short Design Project
    { id: 5, title: "Verve Photography Portfolio", description: "A high-impact portfolio site optimized for speed and retina displays using React and Tailwind CSS.", tags: ['Web', 'Design', 'Portfolio'], imageSrc: null, link: 'https://verve.photography/', color: colors.primary, type: 'Small', },
    // Long E-commerce Project
    { id: 6, title: "E-commerce Microservices Backend", description: "Designed and implemented a scalable microservices architecture for a mid-sized e-commerce platform handling 10k+ daily transactions. Utilized RabbitMQ for message queuing and Docker for containerization, ensuring high availability and fault tolerance across all core services.", tags: ['Backend', 'E-commerce', 'Scaling', 'Microservices', 'Node.js'], imageSrc: VerveImage, link: '#', color: colors.secondary, type: 'Large', },
    // Medium Mobile/Community Project
    { id: 7, title: "EcoConnect Community Tracker", description: "Mobile-first web app using Firebase and React Native Web for real-time tracking of community recycling efforts, resulting in a 20% increase in volume.", tags: ['Mobile', 'Tracker', 'Community', 'Firebase'], imageSrc: MSHImage, link: '#', color: colors.primary, type: 'Medium', },
    // Short Security/Compliance Project
    { id: 8, title: "Healthcare Portal Compliance", description: "Designed and implemented a HIPAA-compliant patient communication portal on AWS.", tags: ['Web', 'Healthcare', 'Security', 'HIPAA'], imageSrc: null, link: '#', color: colors.secondary, type: 'Small', },
    // Standard AI Project
    { id: 9, title: "Real-Time NLP Chatbot", description: "Developed a natural language processing model using Hugging Face transformers for a customer service chatbot, reducing ticket escalation by 40%.", tags: ['AI', 'NLP', 'Python', 'Deep Learning'], imageSrc: MSHImage, link: '#', color: colors.primary, type: 'Medium', },
    // Small Backend Project
    { id: 10, title: "High-Speed Caching Service", description: "Implemented a Redis-based caching layer that reduced database load times by 75% for key endpoints.", tags: ['Backend', 'Performance', 'Redis'], imageSrc: null, link: '#', color: colors.secondary, type: 'Small', },
];

// ==========================================================
// --- NEW: PROJECT CARD COMPONENT (Dynamic Size) ---
// ==========================================================
const ProjectCard = ({ project }) => {
    // Dynamically set class for layout based on project type
    // This is where you control the card's visual weight and size
    const cardClass = useMemo(() => {
        switch (project.type) {
            case 'Large':
                return 'col-span-1 sm:col-span-2 lg:col-span-2 shadow-2xl ring-2 ring-black/10'; // Wide Card
            case 'Medium':
                return 'col-span-1 lg:col-span-1 shadow-lg'; // Standard Card
            case 'Small':
            default:
                return 'col-span-1 lg:col-span-1 shadow-md opacity-85'; // Small/Compact Card
        }
    }, [project.type]);

    return (
        <motion.a
            href={project.link === '#' ? undefined : project.link}
            target={project.link === '#' ? undefined : "_blank"}
            rel={project.link === '#' ? undefined : "noopener noreferrer"}
            className={`flex flex-col p-4 md:p-6 bg-white rounded-xl border border-gray-100 transition-all duration-300 transform hover:shadow-xl hover:scale-[1.01] cursor-pointer ${cardClass}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ 
                borderTop: `8px solid ${project.color}`, // Signature color stripe
                backgroundColor: project.type === 'Large' ? colors.light : 'white'
            }}
        >
            <h3 className="text-xl md:text-2xl font-extrabold mb-2" style={{ color: colors.dark }}>
                {project.title}
            </h3>

            {project.imageSrc && (
                <div className="w-full aspect-[16/9] overflow-hidden rounded-lg my-3">
                    <img 
                        src={project.imageSrc} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            
            <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-grow">
                {project.description}
            </p>
            
            <div className="mt-auto flex flex-wrap gap-2">
                {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs font-semibold text-white rounded-full" style={{ backgroundColor: project.color }}>
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
    const [activeTag, setActiveTag] = useState(null); 

    // Extract All Unique Tags
    const allTags = useMemo(() => {
        const tagCounts = projectData.reduce((acc, project) => {
            project.tags.forEach(tag => {
                acc[tag] = (acc[tag] || 0) + 1;
            });
            return acc;
        }, {});
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
        
        if (activeTag) {
            results = results.filter(project => project.tags.includes(activeTag));
        }
        
        return results;
    }, [searchTerm, activeTag]);

    const handleTagClick = (tag) => {
        setActiveTag(activeTag === tag ? null : tag); // Toggle logic
    };

    const MotionLink = motion(Link);

    return (
        // 1. Root Container: h-screen flex flex-col overflow-hidden 
        <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: colors.light, color: colors.dark }}>
            
            <Header />

            {/* 2. Content Wrapper: Scrollable Main Content */}
            <div className="flex-grow flex flex-col overflow-y-auto"> 
                
                {/* ---------------------------------------------------- */}
                {/* === TOP FILTER BAR (Fixed at the top of scroll) === */}
                {/* ---------------------------------------------------- */}
                <div className="w-full flex-shrink-0 pt-[80px] p-6 bg-white shadow-md sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4"> 
                        
                        {/* Title and Back Link */}
                        <div className="flex items-center justify-between relative mb-6">
                            <MotionLink
                                to="/" 
                                className="flex items-center text-lg font-semibold text-gray-700 hover:text-black transition-colors duration-300 flex-shrink-0"
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <FaArrowLeft className="mr-3" /> Back to Home
                            </MotionLink>

                            <h1 className="text-4xl md:text-5xl font-extrabold animated-gradient absolute inset-0 flex items-center justify-center pointer-events-none">
                                Project Portfolio
                            </h1>
                            
                            {/* Desktop Search Bar (Right Side) */}
                            <div className="relative w-full max-w-xs ml-auto hidden lg:block flex-shrink-0">
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-full focus:ring-2 focus:ring-black focus:border-black transition-all"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                {searchTerm && (
                                    <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                        <FaTimes />
                                    </button>
                                )}
                            </div>
                        </div> 
                        
                        {/* Mobile Search Bar & Tag Cloud */}
                        <div className="relative mb-4 lg:hidden">
                             <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-3 pl-10 border border-gray-300 rounded-full focus:ring-2 focus:ring-black focus:border-black transition-all"
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                    <FaTimes />
                                </button>
                            )}
                        </div>

                        {/* Tag Filter Cloud (Below Search) */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t mt-4">
                            <h4 className="text-sm font-bold text-gray-700 mr-2 flex-shrink-0 hidden sm:block">Filter by Skill:</h4>
                            <button
                                onClick={() => handleTagClick(null)}
                                className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 flex-shrink-0 ${activeTag === null ? 'bg-black text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                All ({projectData.length})
                            </button>
                            {allTags.map(({ tag }) => (
                                <button
                                    key={tag}
                                    onClick={() => handleTagClick(tag)}
                                    className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 hover:scale-[1.02] flex-shrink-0 ${activeTag === tag ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div> 
                </div> 

                {/* ---------------------------------------------------- */}
                {/* === MASONRY STYLE PROJECT GRID === */}
                {/* ---------------------------------------------------- */}
                <main className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 flex-grow"> 
                    
                    <AnimatePresence>
                        {filteredProjects.length > 0 ? (
                            // Grid Container: Responsive columns for masonry effect
                            <motion.div 
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-min"
                                layout // Framer Motion layout transition for smooth filtering
                            >
                                {filteredProjects.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </motion.div>
                        ) : (
                             <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-center w-full min-h-[300px] text-gray-500 text-xl"
                            >
                                No projects found matching your filters.
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