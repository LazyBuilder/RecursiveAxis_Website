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

// --- PROJECT DATA (Top 3 for Teaser) ---
const topThreeProjects = [
  // ... (project data remains the same)
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
    description: "An elegant, high-speed photography portfolio for a premium brand, designed for high-resolution image delivery and smooth, intuitive navigation across all devices, leading to a 40% increase in client inquiries.", 
    imageSrc: VerveImage, 
    link: 'https://www.verve-photography.com/',
    color: SECONDARY_COLOR,
  },
  {
    id: 3,
    title: "Stealth Startup Analytics MVP", 
    description: "Built the core MVP for a next-gen data analytics platform, focusing on real-time data ingestion and visualization. This allowed the client to secure Series A funding based on technical proof of concept.", 
    imageSrc: VerveImage,
    link: 'https://www.example.com/',
    color: PRIMARY_COLOR,
  },
];

// --- Project Teaser Card Component (Used internally) ---
const ProjectTeaserCard = ({ project }) => (
    <motion.div
        className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-start h-full text-left transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
    >
        <img src={project.imageSrc} alt={project.title} className="w-full h-32 object-cover rounded-lg mb-4" />
        <h3 className="text-xl font-bold mb-2" style={{ color: TEXT_DARK }}>{project.title}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-grow">{project.description}</p>
        <Link 
            to={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm font-semibold mt-auto" 
            style={{ color: project.color }}
        >
            View Project &rarr;
        </Link>
    </motion.div>
);

const RecentProjectsCarousel = React.forwardRef((props, ref) => {
    return (
        <>
            <FullPageSection 
                id="projects" 
                ref={ref} 
                // Background is now inherited as light
                bgClass="text-gray-800" // Ensures text is dark on the light background
            >
                <div className="w-full relative z-10 flex flex-col items-center justify-center h-full max-w-7xl px-4 py-20">
                    
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