// src/components/TrustedBySegment.jsx (FINAL - SCROLL FIX & PHONE FRAME)

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FullPageSection from './FullPageSection';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Define colors (ensure these are globally consistent)
const PRIMARY_COLOR = '#00EAFF'; // Cyan
const SECONDARY_COLOR = '#FF00EA'; // Magenta
const BACKGROUND_LIGHT = '#ffffff'; // Clean white background
const TEXT_DARK = '#1a1a1a'; // Dark text color

// --- LOGO DATA (Expanded for randomization) ---
const allLogos = [
    // --- FIXED LOGOS (Always appear) ---
    { id: 100, name: "Amazon", src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png', fixed: true }, 
    { id: 101, name: "Microsoft", src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1200px-Microsoft_logo_%282012%29.svg.png', fixed: true },
    { id: 102, name: "Apple", src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png', fixed: true },

    // --- ROTATING LOGOS (Pool for randomization) ---
    { id: 1, name: "Google", src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png', fixed: false }, 
    { id: 2, name: "Meta", src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png', fixed: false }, 
    { id: 3, name: "Netflix", src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png', fixed: false },
    { id: 4, name: "IBM", src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1280px-IBM_logo.svg.png', fixed: false },
    { id: 5, name: "Salesforce", src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Salesforce_logo.svg/1280px-Salesforce_logo.svg.png', fixed: false },
    { id: 6, name: "Adobe", src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Adobe_logo.svg/1280px-Adobe_logo.svg.png', fixed: false },
    { id: 7, name: "Spotify", src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_logo_2021.svg/1280px-Spotify_logo_2021.svg.png', fixed: false },
    { id: 8, name: "Uber", src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Uber_logo_2018.svg/1280px-Uber_logo_2018.svg.png', fixed: false },
    { id: 9, name: "Airbnb", src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1280px-Airbnb_Logo_B%C3%A9lo.svg.png', fixed: false },
];

// --- PROJECT DATA ---
const projectData = [
  {
    id: 1,
    title: "MSH Cultural Group",
    description: "Elegant digital platform for cultural event management and content showcase.",
    imageSrc: 'https://i.ibb.co/L6V7R0k/mshculturalgroup.png', 
    link: 'https://www.mshculturalgroup.com/',
    color: PRIMARY_COLOR,
  },
  {
    id: 2,
    title: "Verve Photography",
    description: "High-impact portfolio site showcasing professional photography and immersive visuals.",
    imageSrc: 'https://i.ibb.co/S68Jg2S/vervephotography.png', 
    link: 'https://verve.photography/',
    color: SECONDARY_COLOR,
  },
  {
    id: 3,
    title: "Project Alpha SaaS",
    description: "Bespoke SaaS solution for real-time data analysis and visualization dashboard.",
    imageSrc: 'https://via.placeholder.com/800x600/1e1e1e/888888?text=Project+Alpha+SaaS', 
    link: null, 
    color: PRIMARY_COLOR,
  },
];

// Framer Motion carousel variants
const carouselVariants = {
  enter: (direction) => ({
    opacity: 0,
    y: direction > 0 ? 50 : -50,
  }),
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  },
  exit: (direction) => ({
    opacity: 0,
    y: direction < 0 ? 50 : -50,
    transition: { duration: 0.4 }
  })
};

const TrustedBySegment = React.forwardRef((props, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [displayLogos, setDisplayLogos] = useState([]);
    const totalProjects = projectData.length;
    const MAX_LOGOS = 9;

    // Logo Selection Logic (memoized)
    const { fixedLogos, rotatingLogos } = useMemo(() => {
        const fixed = allLogos.filter(logo => logo.fixed);
        const rotating = allLogos.filter(logo => !logo.fixed);
        return { fixedLogos: fixed, rotatingLogos: rotating };
    }, []);

    // Effect to select and arrange the 9 logos on mount
    useEffect(() => {
        const numFixed = fixedLogos.length;
        const numToRotate = Math.max(0, MAX_LOGOS - numFixed);

        if (numToRotate > 0 && rotatingLogos.length > 0) {
            const shuffle = (array) => {
                let currentIndex = array.length, randomIndex;
                while (currentIndex !== 0) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;
                    [array[currentIndex], array[randomIndex]] = [
                        array[randomIndex], array[currentIndex]];
                }
                return array;
            };

            const selectedRotating = shuffle([...rotatingLogos]).slice(0, numToRotate);
            const finalLogos = [...fixedLogos, ...selectedRotating];
            const presentationLogos = shuffle(finalLogos); 
            
            setDisplayLogos(presentationLogos.slice(0, MAX_LOGOS));
        } else {
            setDisplayLogos(fixedLogos.slice(0, MAX_LOGOS));
        }
    }, [fixedLogos, rotatingLogos]); 

    const paginate = (newDirection) => {
        setDirection(newDirection);
        let newIndex = currentIndex + newDirection;
        if (newIndex < 0) {
            newIndex = totalProjects - 1; 
        } else if (newIndex >= totalProjects) {
            newIndex = 0; 
        }
        setCurrentIndex(newIndex);
    };

    const currentProject = projectData[currentIndex];

    return (
        <>
            {/* CSS STYLES (Keep centralized) */}
            <style>
            {`
                /* Global Title Style (Defined here for example) */
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

                .logo-grayscale {
                    filter: grayscale(100%);
                    opacity: 0.4;
                    transition: all 0.3s ease-in-out;
                    max-height: 40px; 
                    width: auto;
                    object-fit: contain;
                }
                .logo-grayscale:hover {
                    filter: grayscale(0%);
                    opacity: 1;
                    transform: scale(1.05);
                }
                .logo-container {
                    border: 1px solid #ddd;
                }

                /* Phone Frame Styling */
                .phone-frame {
                    position: relative;
                    width: 100%;
                    padding-top: 177.77%; /* 9:16 Aspect Ratio (16/9 * 100) */
                    max-width: 300px; /* Max size for phone frame */
                    margin: 0 auto;
                    border: 10px solid ${TEXT_DARK}; /* Black bezel */
                    border-radius: 40px;
                    box-shadow: 0 0 0 1px #eee, 0 10px 20px rgba(0, 0, 0, 0.2);
                    overflow: hidden;
                    background-color: ${TEXT_DARK}; 
                }
                .phone-screen {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    /* Inner bezel border */
                    border: 5px solid ${TEXT_DARK}; 
                    border-radius: 30px;
                    overflow: hidden;
                }
            `}
            </style>

            <FullPageSection 
                id="trusted-by" 
                ref={ref} 
                style={{ backgroundColor: BACKGROUND_LIGHT }}
                bgClass="text-dark" // Ensuring text defaults to dark on light background
            >
                <div className="w-full relative z-10 flex flex-col pt-16 pb-16 px-4 h-full">
                    
                    {/* === UNIFIED MAIN TITLE === */}
                    <motion.h2
                        className={`text-4xl md:text-6xl font-extrabold text-center mb-12 global-animated-title`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Our Impact & Innovation
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto h-full items-center">
                        
                        {/* === LEFT COLUMN: TRUSTED BY (LOGOS) - With Scrolling === */}
                        <div className="flex flex-col h-[50vh] md:h-[70vh] justify-start p-4 md:p-8 overflow-y-auto">
                            <h3 className="text-xl font-bold mb-8 text-center sticky top-0 bg-white py-2" style={{ color: TEXT_DARK }}>
                                Trusted by Industry Leaders
                            </h3>

                            {/* 3x3 Logo Grid */}
                            <div className="grid grid-cols-3 gap-6">
                                {displayLogos.map((logo, index) => (
                                    <motion.div
                                        key={logo.id}
                                        className={`flex items-center justify-center p-4 h-24 rounded-lg logo-container hover:shadow-lg transition-shadow duration-300`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                                        viewport={{ once: true }}
                                    >
                                        <img 
                                            src={logo.src} 
                                            alt={logo.name} 
                                            className="logo-grayscale"
                                        />
                                    </motion.div>
                                ))}
                                {/* Added spacing to ensure the grid scrolls if necessary */}
                                <div className="col-span-3 h-10"></div> 
                            </div>
                        </div>

                        {/* === RIGHT COLUMN: PROJECT CAROUSEL (PHONE FRAME) === */}
                        <div className="relative flex flex-col justify-center items-center p-4 md:p-8 border-t md:border-t-0 md:border-l h-full" style={{ borderColor: PRIMARY_COLOR }}>
                            <h3 className="text-xl font-bold mb-8 text-center" style={{ color: TEXT_DARK }}>
                                Mobile Innovation Showcase
                            </h3>

                            <div className="relative w-full max-w-md flex flex-col items-center">
                                
                                {/* The Phone Frame Display */}
                                <div className="phone-frame mb-8">
                                    <div className="phone-screen">
                                        <AnimatePresence initial={false} custom={direction} exitBeforeEnter>
                                            <motion.a
                                                key={currentIndex}
                                                href={currentProject.link || '#'}
                                                target={currentProject.link ? '_blank' : '_self'}
                                                rel="noopener noreferrer"
                                                custom={direction}
                                                variants={carouselVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                className="absolute inset-0 block"
                                            >
                                                <img 
                                                    src={currentProject.imageSrc} 
                                                    alt={currentProject.title} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </motion.a>
                                        </AnimatePresence>
                                    </div>
                                </div>
                                
                                {/* Project Details Below the Phone Frame */}
                                <div className="text-center w-full max-w-sm">
                                    <h3 className="text-2xl font-bold tracking-widest mb-1" style={{ color: currentProject.color }}>
                                        {currentProject.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-tight mb-4">
                                        {currentProject.description}
                                    </p>
                                </div>

                                {/* Carousel Navigation & Pagination */}
                                <div className="flex justify-center items-center space-x-4">
                                    <motion.div 
                                        className="cursor-pointer p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-md"
                                        onClick={() => paginate(-1)}
                                    >
                                        <FaChevronLeft size={20} color={TEXT_DARK} />
                                    </motion.div>
                                    
                                    {/* Pagination Dots */}
                                    <div className="flex space-x-2">
                                        {projectData.map((_, index) => (
                                            <div 
                                                key={index}
                                                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                                                    currentIndex === index ? 'bg-black scale-125' : 'bg-gray-400 opacity-40 hover:opacity-80'
                                                }`}
                                                onClick={() => setCurrentIndex(index)}
                                            />
                                        ))}
                                    </div>

                                    <motion.div 
                                        className="cursor-pointer p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-md"
                                        onClick={() => paginate(1)}
                                    >
                                        <FaChevronRight size={20} color={TEXT_DARK} />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FullPageSection>
        </>
    );
});

export default TrustedBySegment;