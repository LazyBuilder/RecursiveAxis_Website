// src/ProjectsPage.jsx (FIXED-WIDTH MASONRY/KEEP LAYOUT)

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Link } from 'react-router-dom';
import { colors } from './components/UIMain'; 
import { FaArrowLeft, FaSearch, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Added FaChevronUp

// SHARED COMPONENTS
import Header from './components/Header';
import Footer from './components/Footer'; 

// CRITICAL: LOCAL IMAGE IMPORTS 
import MSHImage from './photos/mshcg-dugapuja.png';   
import VerveImage from './photos/verve-photography.png';  

// --- PROJECT DATA (Full List with varying content/type) ---
const projectData = [
    // Long Text, Image
    { id: 1, title: "AI Image Classifier Model", description: "Trained and deployed a high-accuracy Convolutional Neural Network (CNN) for medical image classification using TensorFlow/Keras. Achieved 98.5% accuracy, significantly improving diagnostic speed for three key conditions. This was a complex, data-intensive ML project that involved extensive data preprocessing, model tuning, and cloud deployment on AWS SageMaker.", tags: ['AI', 'Machine Learning', 'TensorFlow', 'Python', 'Healthcare', 'AWS'], imageSrc: MSHImage, link: '#', color: colors.primary, },
    // Medium Text, Image
    { id: 2, title: "FinTech Dashboard", description: "Built a secure, real-time analytics dashboard for wealth management clients using Node.js, PostgreSQL, and React. Focused on data visualization and robust authentication.", tags: ['Web', 'FinTech', 'Dashboard', 'Security', 'React', 'Node.js'], imageSrc: VerveImage, link: '#', color: colors.secondary, },
    // Short Text, No Image
    { id: 3, title: "Kubernetes Deployment Pipeline", description: "Automated E2E CI/CD pipeline using Jenkins and Kubernetes for zero-downtime deployment.", tags: ['DevOps', 'Kubernetes', 'CI/CD', 'AWS'], imageSrc: null, link: '#', color: colors.secondary, },
    // Long Text, Image
    { id: 4, title: "MSH Cultural Group Platform", description: "Delivered a full-featured, multi-language ticketing and information platform emphasizing ultra-low-cost deployment (under $25/year operational cost) using React and AWS Amplify. The platform handles thousands of ticket transactions annually and significantly reduced manual overhead.", tags: ['Web', 'Ticketing', 'Non-profit', 'React', 'Amplify', 'Low-Cost'], imageSrc: MSHImage, link: 'https://www.mshculturalgroup.com/', color: colors.primary, },
    // Short Text, No Image
    { id: 5, title: "Verve Photography Portfolio", description: "A high-impact portfolio site optimized for speed and retina displays using React and Tailwind CSS.", tags: ['Web', 'Design', 'Portfolio', 'Performance'], imageSrc: null, link: 'https://verve.photography/', color: colors.primary, },
    // Very Long Text, Image
    { id: 6, title: "E-commerce Microservices Backend", description: "Designed and implemented a scalable microservices architecture for a mid-sized e-commerce platform handling 10k+ daily transactions. Utilized RabbitMQ for message queuing, Docker for containerization, and implemented circuit breakers for resilience, ensuring high availability and fault tolerance across all core services including inventory, payments, and fulfillment.", tags: ['Backend', 'E-commerce', 'Scaling', 'Microservices', 'Node.js', 'Docker', 'RabbitMQ'], imageSrc: VerveImage, link: '#', color: colors.secondary, },
    // Medium Text, Image
    { id: 7, title: "EcoConnect Community Tracker", description: "Mobile-first web app using Firebase and React Native Web for real-time tracking of community recycling efforts, resulting in a 20% increase in volume.", tags: ['Mobile', 'Tracker', 'Community', 'Firebase', 'React Native'], imageSrc: MSHImage, link: '#', color: colors.primary, },
    // Short Text, No Image
    { id: 8, title: "Healthcare Portal Compliance", description: "Designed and implemented a HIPAA-compliant patient communication portal on AWS.", tags: ['Web', 'Healthcare', 'Security', 'HIPAA', 'AWS'], imageSrc: null, link: '#', color: colors.secondary, },
];

// ==========================================================
// --- NEW: PROJECT CARD COMPONENT (Dynamic Height, Collapsible Tags) ---
// ==========================================================
const ProjectCard = ({ project }) => {
    const [tagsExpanded, setTagsExpanded] = useState(false);
    const descriptionRef = useRef(null);
    const [isDescriptionScrollable, setIsDescriptionScrollable] = useState(false);

    // Check if the description content overflows its container
    useEffect(() => {
        if (descriptionRef.current) {
            const { offsetHeight, scrollHeight } = descriptionRef.current;
            setIsDescriptionScrollable(scrollHeight > offsetHeight);
        }
    }, [project.description, project.imageSrc]); // Rerun when content changes

    // Get the first line of tags for the initial view
    const visibleTags = tagsExpanded ? project.tags : project.tags.slice(0, 4);
    const showMoreButton = project.tags.length > 4;

    return (
        <motion.a
            href={project.link === '#' ? undefined : project.link}
            target={project.link === '#' ? undefined : "_blank"}
            rel={project.link === '#' ? undefined : "noopener noreferrer"}
            className={`flex flex-col w-full p-4 bg-white rounded-xl border border-gray-200 transition-all duration-300 transform hover:shadow-xl hover:scale-[1.01] cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ 
                borderTop: `6px solid ${project.color}`, 
                minHeight: '200px', // Minimum height
                maxHeight: '550px', // Maximum height
                overflow: 'hidden', // Contain content
            }}
        >
            <h3 className="text-xl md:text-2xl font-extrabold mb-2" style={{ color: colors.dark }}>
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
            
            {/* Description Section with conditional scroll */}
            <div 
                ref={descriptionRef}
                className={`text-sm text-gray-700 leading-relaxed mb-4 ${project.imageSrc ? 'mt-0' : 'mt-2'} ${isDescriptionScrollable ? 'overflow-y-auto pr-2' : ''}`}
                style={{ maxHeight: project.imageSrc ? '150px' : '220px' }} // Tighter max-height if image is present
            >
                {project.description}
            </div>
            
            {/* Tags Section (Collapsible) */}
            <div className="mt-auto pt-2 border-t border-gray-100">
                <motion.div
                    className="flex flex-wrap gap-2"
                    initial={false}
                    animate={{ height: tagsExpanded ? 'auto' : '24px' }} // Fixed height for one row of tags
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                >
                    {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs font-semibold text-white rounded-full flex-shrink-0" style={{ backgroundColor: project.color }}>
                            {tag}
                        </span>
                    ))}
                </motion.div>

                {/* Show More/Less Button */}
                {showMoreButton && (
                    <button
                        onClick={(e) => { e.preventDefault(); setTagsExpanded(!tagsExpanded); }}
                        className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                        aria-expanded={tagsExpanded}
                    >
                        {tagsExpanded ? 'Show Less' : 'Show More'} 
                        {tagsExpanded ? <FaChevronUp className="ml-1 text-blue-600" size={10} /> : <FaChevronDown className="ml-1 text-blue-600" size={10} />}
                    </button>
                )}
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
        setActiveTag(activeTag === tag ? null : tag); 
    };

    const MotionLink = motion(Link);

    return (
        // 1. Root Container: h-screen flex flex-col overflow-hidden 
        <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: colors.light, color: colors.dark }}>
            
            <Header />

            {/* 2. Content Wrapper: Scrollable Main Content */}
            <div className="flex-grow flex flex-col overflow-y-auto"> 
                
                {/* ---------------------------------------------------- */}
                {/* === TOP FILTER BAR (Thin and Responsive) === */}
                {/* ---------------------------------------------------- */}
                <div className="w-full flex-shrink-0 pt-[80px] px-4 py-3 bg-white shadow-md sticky top-0 z-10 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto"> 
                        
                        {/* Title, Back Link, and Search in a compact row */}
                        <div className="flex items-center justify-between relative mb-2">
                            
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

                            {/* Centered Title (Hidden on small screens to save space) */}
                            <h1 className="text-xl md:text-3xl font-extrabold animated-gradient hidden lg:flex items-center justify-center pointer-events-none absolute inset-0">
                                Project Portfolio
                            </h1>
                            
                            {/* Search Bar (Right) */}
                            <div className="relative w-full max-w-sm ml-auto">
                                <input
                                    type="text"
                                    placeholder="Search projects..."
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
                        
                        {/* Tag Filter Cloud (Below Search, takes full width) */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                            <h4 className="text-sm font-bold text-gray-700 mr-2 flex-shrink-0 hidden sm:block">Filter:</h4>
                            <button
                                onClick={() => handleTagClick(null)}
                                className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 flex-shrink-0 ${activeTag === null ? 'bg-black text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                All ({projectData.length})
                            </button>
                            {allTags.map(({ tag }) => (
                                <button
                                    key={tag}
                                    onClick={() => handleTagClick(tag)}
                                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 hover:scale-[1.02] flex-shrink-0 ${activeTag === tag ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div> 
                </div> 

                {/* ---------------------------------------------------- */}
                {/* === FIXED-WIDTH MASONRY STYLE PROJECT GRID === */}
                {/* ---------------------------------------------------- */}
                <main className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 flex-grow"> 
                    
                    <AnimatePresence>
                        {filteredProjects.length > 0 ? (
                            // Grid Container: Responsive columns, fixed width (no auto-rows-min needed for this style)
                            <motion.div 
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                                layout
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