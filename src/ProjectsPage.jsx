// src/ProjectsPage.jsx (FINAL, TRUE CSS MASONRY LAYOUT)

import React, { useState, useMemo } from 'react';
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
    { 
        id: 1, 
        title: "AI Image Classifier Model", 
        description: "Trained and deployed a high-accuracy Convolutional Neural Network (CNN) for medical image classification using TensorFlow/Keras. Achieved 98.5% accuracy, significantly improving diagnostic speed. This was a complex, data-intensive ML project that involved extensive data preprocessing, model tuning, and cloud deployment on AWS SageMaker.", 
        tags: ['Python', 'Code', 'Healthcare'], 
        imageSrc: MSHImage, 
        link: 'https://github.com/asitdeva/ai-classifier-model', 
        color: colors.primary, 
        heightClass: 'row-span-3', // Taller card for long content
    },
    // Medium Text, Image (Should be MEDIUM)
    { 
        id: 2, 
        title: "FinTech Dashboard", 
        description: "Developed a secure, real-time trading and portfolio management dashboard using React, Redux, and a Node.js backend. Focused on low latency and high data throughput. Key features included interactive charts and a custom risk-scoring algorithm.", 
        tags: ['React', 'Data', 'Finance'], 
        imageSrc: VerveImage, 
        link: '#', 
        color: colors.secondary, 
        heightClass: 'row-span-2', // Standard card height
    },
    // Short Text, No Image
    { 
        id: 3, 
        title: "Decentralized Voting System", 
        description: "A proof-of-concept application built on the Ethereum blockchain using Solidity for smart contracts and Web3.js for the frontend. Demonstrated tamper-proof, transparent voting.", 
        tags: ['Code', 'Blockchain', 'Finance'], 
        imageSrc: null, 
        link: '#', 
        color: colors.primary,
        heightClass: 'row-span-1', // Shortest card height for compact content
    },
    // Medium Text, Image
    { 
        id: 4, 
        title: "E-Commerce Headless CMS", 
        description: "Engineered a high-performance headless commerce solution using Next.js and Strapi CMS, providing unparalleled flexibility for marketing and content teams while maintaining sub-100ms load times.", 
        tags: ['Code', 'React', 'E-Commerce'], 
        imageSrc: MSHImage, 
        link: '#', 
        color: colors.secondary, 
        heightClass: 'row-span-2',
    },
    // Long Text, Image
    { 
        id: 5, 
        title: "Supply Chain Optimization AI", 
        description: "Implemented a complex reinforcement learning model to dynamically optimize warehousing logistics, leading to a 15% reduction in operational costs over six months. The model was deployed via a REST API service written in Python/Flask.", 
        tags: ['Python', 'Data', 'Logistics'], 
        imageSrc: VerveImage, 
        link: '#', 
        color: colors.primary,
        heightClass: 'row-span-3',
    },
    // Short Text, Image
    { 
        id: 6, 
        title: "Startup Pitch Deck Design", 
        description: "Designed a compelling, high-impact pitch deck that successfully secured seed funding, focusing on clear data visualization and a strong brand narrative.", 
        tags: ['Design', 'Strategy'], 
        imageSrc: MSHImage, 
        link: '#', 
        color: colors.secondary,
        heightClass: 'row-span-1',
    },
];

// --- Project Card Component ---
const ProjectCard = ({ project }) => {
    return (
        <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col p-6 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-[1.03] overflow-hidden group h-full ${project.heightClass}`}
            style={{ backgroundColor: colors.dark, border: `1px solid ${project.color}30` }} // Subtle border
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
        >
            {/* Image (if available) */}
            {project.imageSrc && (
                <div className="relative w-full mb-4 overflow-hidden rounded-lg">
                    <img 
                        src={project.imageSrc} 
                        alt={project.title} 
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Dark gradient overlay on image */}
                    <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-10 transition-opacity"></div>
                </div>
            )}

            {/* Title */}
            <h3 className="text-3xl font-extrabold mb-3 leading-tight" style={{ color: project.color }}>
                {project.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 mb-4 flex-grow text-base">
                {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                    <span 
                        key={tag} 
                        className="px-3 py-1 text-xs font-semibold rounded-full"
                        style={{ backgroundColor: project.color, color: colors.dark }}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.a>
    );
};


// --- Projects Page Main Component ---
const ProjectsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProjects = useMemo(() => {
        if (!searchTerm) return projectData;
        const lowerCaseSearch = searchTerm.toLowerCase();

        return projectData.filter(project => 
            project.title.toLowerCase().includes(lowerCaseSearch) ||
            project.description.toLowerCase().includes(lowerCaseSearch) ||
            project.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch))
        );
    }, [searchTerm]);


    return (
        <div className={`min-h-screen flex flex-col pt-[80px] bg-[#f7f7f7] text-[#1a1a1a]`}>
            <Header />

            <div className="container mx-auto px-4 py-12 flex-grow">
                
                {/* Back Link */}
                <Link to="/" className="text-gray-600 hover:text-gray-800 transition-colors flex items-center mb-10">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </Link>

                {/* Title */}
                <h1 className="text-6xl md:text-8xl font-extrabold mb-4 animated-gradient">
                    All Projects
                </h1>
                <p className="text-xl text-gray-700 max-w-4xl mb-12">
                    A curated portfolio showcasing our expertise in full-stack development, technical strategy, and data science across various industries.
                </p>

                {/* Search Bar */}
                <div className="flex items-center w-full max-w-xl mb-12 relative">
                    <FaSearch className="absolute left-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by title, technology, or tag..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-4 pl-12 border-2 border-gray-300 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{ focusRingColor: colors.primary }}
                    />
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm('')}
                            className="absolute right-4 p-2 text-gray-500 hover:text-gray-800 transition-colors"
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>


                {/* Main Project Grid (CSS Grid with `grid-auto-rows` for masonry effect) */}
                <main className="w-full py-8">
                    <AnimatePresence>
                        {filteredProjects.length > 0 ? (
                            <motion.div 
                                className="grid gap-8"
                                // CRITICAL CSS for Masonry-like layout:
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                    gridAutoRows: '70px', // Set a base row height
                                    gridAutoFlow: 'row dense', // Fill gaps
                                }}
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