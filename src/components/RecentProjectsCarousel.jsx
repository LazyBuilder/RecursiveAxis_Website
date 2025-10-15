// src/components/RecentProjectsCarousel.jsx 
// FINAL VERSION: Static 3-Project Teaser with Responsive Cards

import React from 'react';
import { motion } from 'framer-motion';
// Foreign Link: Imports the section wrapper component
import FullPageSection from './FullPageSection'; 
import { Link } from 'react-router-dom'; 

// CRITICAL: Ensure your image paths are correct
import MSHImage from '../photos/mshcg-dugapuja.png';    
import VerveImage from '../photos/verve-photography.png';  
 

// Define global constants (assuming these are defined in UIMain.jsx or globally)
const PRIMARY_COLOR = '#00EAFF'; 
const SECONDARY_COLOR = '#FF00EA'; 
// NOTE: These are local references for styling, the actual background is inherited as light.
const TEXT_DARK = '#1a1a1a'; 
const TEXT_GRAY = '#6b7280';


// --- PROJECT DATA (Top 3 for Teaser) ---
const topThreeProjects = [
  {
    id: 1,
    title: "MSH Cultural Group Platform", 
    description: "Successfully delivered a full-featured, multi-language ticketing and information platform emphasizing ultra-low-cost deployment (under $25/year operational cost) and simplified content management for non-technical users.", 
    imageSrc: MSHImage, 
    link: 'https://www.mshculturalgroup.com/',
    color: PRIMARY_COLOR,
    tags: ['React', 'Full Stack', 'Low-Cost'],
  },
  {
    id: 2,
    title: "Verve Photography Portfolio", 
    description: "An elegant, high-speed photography portfolio built with Next.js and optimized for image delivery and SEO, achieving a 99/100 Lighthouse performance score.", 
    imageSrc: VerveImage, 
    link: '#', 
    color: SECONDARY_COLOR,
    tags: ['Next.js', 'Design', 'Performance'],
  },
  {
    id: 3,
    title: "Financial Planning Tool API", 
    description: "Engineered a robust, scalable backend API using Python (FastAPI) to handle complex financial calculations and real-time data integration for a B2B SaaS platform.", 
    imageSrc: null, // Placeholder for a code-focused project without a visual
    link: '#', 
    color: PRIMARY_COLOR,
    tags: ['Python', 'API', 'Finance'],
  },
];

// --- Project Teaser Card Component (Local Helper) ---
const ProjectTeaserCard = ({ project }) => {
    return (
        <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col rounded-xl shadow-lg border p-6 h-full transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
            style={{ 
                borderColor: `${project.color}50`, 
                backgroundColor: '#ffffff',
                color: TEXT_DARK 
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
        >
            {project.imageSrc && (
                <div className="h-40 overflow-hidden rounded-lg mb-4">
                    <img 
                        src={project.imageSrc} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            
            <h3 className="text-xl font-extrabold mb-2 leading-snug" style={{ color: TEXT_DARK }}>
                {project.title}
            </h3>

            <p className="text-base text-gray-700 mb-4 flex-grow">
                {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {project.tags.map(tag => (
                    <span 
                        key={tag} 
                        className="px-3 py-1 text-xs font-semibold rounded-full"
                        style={{ backgroundColor: project.color, color: TEXT_DARK }}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <span className="mt-3 text-sm font-bold block" style={{ color: project.color }}>
                View Project &rarr;
            </span>
        </motion.a>
    );
};


// --- Main RecentProjectsCarousel Component ---
const RecentProjectsCarousel = React.forwardRef((props, ref) => {
    return (
        <>
            <FullPageSection 
                id="projects" 
                ref={ref} 
                bgClass="text-center bg-[#f7f7f7]" // Light background
            >
                <div className="container mx-auto px-4 py-16">
                    
                    {/* Title: Uses the globally injected 'animated-gradient' class from Home.jsx */}
                    <motion.h2
                        className={`text-3xl md:text-5xl font-extrabold mb-3 animated-gradient`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        RECENT PROJECTS
                    </motion.h2>
                    <p className="mb-12 text-lg text-gray-500 italic">Our three latest featured works.</p>


                    {/* === STATIC 3-COLUMN LAYOUT (Responsive) === */}
                    <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {topThreeProjects.map((project) => (
                            <ProjectTeaserCard 
                                key={project.id} 
                                project={project} 
                            />
                        ))}
                    </div>
                    
                    {/* === CALL TO ACTION === */}
                    <Link
                        to="/projects" // Uses the router to handle the basename prefix
                        className="mt-8 px-10 py-4 text-lg font-bold rounded-full text-black transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl shadow-xl"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                    >
                        Explore all projects &rarr;
                    </Link>

                </div>
            </FullPageSection>
        </>
    );
});

export default RecentProjectsCarousel;