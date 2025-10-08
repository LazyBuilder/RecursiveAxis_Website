// src/components/RecentProjectsCarousel.jsx (Teaser Section for Multi-Page Solution)

import React from 'react';
import { motion } from 'framer-motion';
import FullPageSection from './FullPageSection'; 

// ==========================================================
// 🚨 CRITICAL: LOCAL IMAGE IMPORTS - CHECK NAMES IN src/photos/
import MSHImage from '../photos/mshcg-dugapuja.png';    
import VerveImage from '../photos/verve-photography.png';  
// ==========================================================

// Define global constants (assuming these are defined in UIMain.jsx or globally)
const PRIMARY_COLOR = '#00EAFF'; 
const SECONDARY_COLOR = '#FF00EA'; 
const BACKGROUND_LIGHT = '#f7f7f7'; 
const TEXT_DARK = '#1a1a1a'; 

// --- PROJECT DATA (Using top 3 for teaser) ---
const projectData = [
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
    description: "A high-impact, high-resolution portfolio site optimized for speed and retina displays. Developed rapidly (2 days) using React and Tailwind CSS, demonstrating expertise in modern, rapid full-stack development.", 
    imageSrc: VerveImage, 
    link: 'https://verve.photography/',
    color: SECONDARY_COLOR,
  },
    {
    id: 3,
    title: "EcoConnect Community Tracker",
    description: "Developed a mobile-first web app using Firebase and React Native Web for real-time tracking of community recycling efforts. This gamified approach resulted in a 20% increase in monthly recycling volume.",
    imageSrc: MSHImage, 
    link: '#',
    color: PRIMARY_COLOR,
  },
];


// ==========================================================
// --- PROJECT TEASER CARD COMPONENT (Updated) ---
// ==========================================================
const ProjectTeaserCard = ({ project }) => (
    <motion.div
        className="w-full shadow-xl rounded-xl overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
        whileHover={{ y: -5 }}
    >
        <a href="/projects" className="block">
            {/* 💡 CHANGE: Use 16/9 aspect ratio for a wider, shorter card */}
            <div className="relative w-full aspect-[16/9] overflow-hidden">
                <img 
                    src={project.imageSrc} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            {/* Text area is smaller now */}
            <div className="p-4 md:p-5">
                <h3 className="text-lg md:text-xl font-extrabold text-gray-800" style={{ color: project.color }}>
                    {project.title}
                </h3>
            </div>
        </a>
    </motion.div>
);


// ==========================================================
// --- MAIN COMPONENT ---
// ==========================================================
const RecentProjectsCarousel = React.forwardRef((props, ref) => {

    const topThreeProjects = projectData.slice(0, 3);

    return (
        <>
            {/* CSS STYLES (unchanged) */}
            <style>
            {`
                /* Title Gradient (Unchanged) */
                .global-animated-title {
                    background: linear-gradient(45deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR}, ${PRIMARY_COLOR});
                    background-size: 400% 400%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: global-gradient-shift 10s ease infinite;
                }
                @keyframes global-gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}
            </style>

            <FullPageSection 
                id="projects" 
                ref={ref} 
                style={{ backgroundColor: BACKGROUND_LIGHT, color: TEXT_DARK }}
                bgClass="text-dark" 
            >
                <div className="w-full relative z-10 flex flex-col items-center justify-center py-20 px-4">
                    
                    {/* === MAIN TITLE === */}
                    <motion.h2
                        className={`text-3xl md:text-5xl font-extrabold mb-4 global-animated-title`}
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
                    <a
                        href="/projects"
                        className="mt-8 px-10 py-4 text-lg font-bold rounded-full text-black transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl shadow-xl"
                        style={{ backgroundColor: PRIMARY_COLOR }} // Ensure text is black for high contrast
                    >
                        See All 9+ Case Studies &rarr;
                    </a>

                </div>
            </FullPageSection>
        </>
    );
});

export default RecentProjectsCarousel;