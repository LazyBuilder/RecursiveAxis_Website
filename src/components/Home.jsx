import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Inline SVGs for icons and logo
const CodeSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const DesignSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);
const DataSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="12" width="6" height="8" rx="1" /><rect x="9" y="8" width="6" height="12" rx="1" /><rect x="15" y="4" width="6" height="16" rx="1" />
  </svg>
);
const LogoSVG = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Full-page section component using forwardRef to pass down the ref
const FullPageSection = forwardRef(({ id, children, bgClass = '', alwaysVisible = false }, ref) => {
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: true, amount: 0.5 });
  const isVisible = alwaysVisible || isInView;

  return (
    <section
      id={id}
      ref={ref}
      className={`relative w-full h-screen px-4 md:px-8 py-16 md:py-24 snap-start snap-always flex flex-col items-center justify-center overflow-hidden ${bgClass}`}
    >
      <div ref={inViewRef}>
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full flex flex-col items-center justify-center text-center relative z-10"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeScreen, setActiveScreen] = useState(0);
  const [activePillar, setActivePillar] = useState('code');

  // Updated sections array after consolidating philosophy slides
  const sections = ['home', 'trusted', 'services', 'philosophy', 'founder-story', 'contact'];
  const sectionsRef = useRef([]);
  
  const colors = {
    background: '#0a0a0a',
    text: '#ffffff',
    primary: '#00eaff',
    secondary: '#ff00ff',
    cardBg: 'rgba(255, 255, 255, 0.05)',
    cardBorder: 'rgba(255, 255, 255, 0.15)',
    mutedText: '#a0a0a0',
  };

  const serviceData = [
    {
      title: 'FOUNDERS & STARTUPS',
      description: 'Accelerate your vision from an idea to a market-ready product, providing the technical leadership and support you need to succeed.',
      offerings: ['CTO/CPO Office', 'Fundraising', 'Prototyping', 'AI Agents & Automation'],
      icon: <img src="https://placehold.co/100x100/1a1a1a/fff?text=FOUNDER" alt="Founder Icon" className="w-16 h-16" />,
      tagline: 'BRINGING YOUR VISION TO LIFE'
    },
    {
      title: 'INVESTORS & VCS',
      description: 'De-risk your investments and ensure portfolio companies are built on a solid technical foundation with our expert due diligence and strategic guidance.',
      offerings: ['Tech Due-Diligence', 'De-risk Portfolio Growth', 'System Design & Architecture'],
      icon: <img src="https://placehold.co/100x100/1a1a1a/fff?text=INVESTOR" alt="Investor Icon" className="w-16 h-16" />,
      tagline: 'MAPPING YOUR MISSION TO ACTIONS'
    },
    {
      title: 'ENTERPRISE & CORPORATE',
      description: 'Scale innovation and drive digital transformation with bespoke strategies, robust governance models, and hands-on innovation programs.',
      icon: <img src="https://placehold.co/100x100/1a1a1a/fff?text=ENTERPRISE" alt="Enterprise Icon" className="w-16 h-16" />,
      tagline: 'SCALING INNOVATION'
    },
  ];

  const philosophyData = {
    code: { heading: 'Our Core Philosophy', title: 'CODE', description: 'Powerful, efficient, and scalable code that forms the backbone of all innovation.', icon: <CodeSVG />, bgClass: 'bg-black bg-grid-white/[0.05]' },
    design: { heading: 'Our Core Philosophy', title: 'DESIGN', description: 'Intuitive and elegant design that puts the user experience at the forefront of every product.', icon: <DesignSVG />, bgClass: 'bg-black bg-[radial-gradient(ellipse_at_center,rgba(0,234,255,0.1),transparent_70%)]' },
    data: { heading: 'Our Core Philosophy', title: 'DATA', description: 'Insightful, actionable data that informs every decision and drives progress forward.', icon: <DataSVG />, bgClass: 'bg-black bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,0,255,0.1)_10%,transparent_50%)]' },
  };

  const companies = [
    { name: 'Siemens', logoUrl: 'https://placehold.co/180x90/333/fff?text=SIEMENS' },
    { name: 'Equifax', logoUrl: 'https://placehold.co/180x90/333/fff?text=EQUIFAX' },
    { name: 'York University', logoUrl: 'https://placehold.co/180x90/333/fff?text=YORK+U' },
    { name: 'Untrap', logoUrl: 'https://placehold.co/180x90/333/fff?text=UNTRAP' },
    { name: 'Pudo Point', logoUrl: 'https://placehold.co/180x90/333/fff?text=PUDO+POINT' },
    { name: 'Ignite AI', logoUrl: 'https://placehold.co/180x90/333/fff?text=IGNITE+AI' },
    { name: 'Siemens 2', logoUrl: 'https://placehold.co/180x90/333/fff?text=SIEMENS' },
    { name: 'Equifax 2', logoUrl: 'https://placehold.co/180x90/333/fff?text=EQUIFAX' },
    { name: 'York University 2', logoUrl: 'https://placehold.co/180x90/333/fff?text=YORK+U' },
    { name: 'Untrap 2', logoUrl: 'https://placehold.co/180x90/333/fff?text=UNTRAP' },
    { name: 'Pudo Point 2', logoUrl: 'https://placehold.co/180x90/333/fff?text=PUDO+POINT' },
    { name: 'Ignite AI 2', logoUrl: 'https://placehold.co/180x90/333/fff?text=IGNITE+AI' },
  ];

  // Set up refs for each section and manage the loading state
  useEffect(() => {
    sectionsRef.current = sections.map((_, i) => sectionsRef.current[i] ?? React.createRef());
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 2500); // Wait 2.5 seconds to simulate load and show animation
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (index) => {
    if (sectionsRef.current[index]?.current) {
      sectionsRef.current[index].current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Intersection Observer to track active section
  useEffect(() => {
    if (isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target.id);
            setActiveScreen(index);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [isLoading]);

  return (
    <div className={`bg-[${colors.background}] text-[${colors.text}] font-sans antialiased overflow-hidden w-screen h-screen`}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto+Mono:wght@700&display=swap');
          
          body { font-family: 'Poppins', sans-serif; }
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
          .no-scrollbar::-webkit-scrollbar { display: none; }
          
          .bg-grid-white {
            background-image: linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px);
            background-size: 40px 40px;
          }

          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 45s linear infinite;
            width: max-content;
          }

          /* Full-screen slide animations */
          .slide-enter { transform: translateY(100%); opacity: 0; }
          .slide-enter-active { transform: translateY(0); opacity: 1; transition: transform 0.8s ease-out, opacity 0.8s ease-in; }
          .slide-exit { transform: translateY(0); opacity: 1; }
          .slide-exit-active { transform: translateY(-100%); opacity: 0; transition: transform 0.8s ease-in, opacity 0.8s ease-out; }

          .bg-radiant-pulse {
            background: radial-gradient(circle, rgba(0,234,255,0.1), transparent 70%);
            animation: radiant-pulse 6s ease-in-out infinite;
          }

          @keyframes radiant-pulse {
            0% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(0.95); opacity: 0.8; }
          }
        `}
      </style>

      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[${colors.background}]`}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
            >
                <LogoSVG />
                <h1 className="mt-4 text-2xl font-bold">Storyline Digital Services</h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className={`fixed top-0 z-50 w-full bg-[${colors.background}] bg-opacity-90 backdrop-blur-md transition-shadow duration-300 shadow-sm`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold text-lg">
            <LogoSVG />
            <span className="text-[${colors.text}]">Storyline Digital Services</span>
          </div>
          <a href="https://cal.com/asitdeva" target="_blank" rel="noopener noreferrer" className={`px-4 py-2 bg-[${colors.primary}] text-[${colors.background}] rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105`}>
            Book a Call
          </a>
        </div>
      </header>

      {/* Main Content Sections with Snap Scrolling */}
      <main className="w-screen min-h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth relative h-full">
        {/* Vertical Navigation Dots */}
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col space-y-2">
          {sections.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${activeScreen === index ? `bg-[${colors.primary}] scale-125` : 'bg-gray-500 hover:bg-white'}`}
              onClick={() => scrollToSection(index)}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Home Section */}
        <FullPageSection id="home" ref={sectionsRef.current[0]} alwaysVisible={true}>
          <motion.div
            className="text-center w-full relative z-10 p-4"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl max-w-4xl mx-auto leading-tight font-bold animated-gradient"
            >
              Accelerate Your Innovation Story.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`mt-6 md:mt-8 max-w-2xl mx-auto text-base md:text-lg lg:text-xl text-[${colors.mutedText}]`}
            >
              We help founders, investors, and enterprises write their innovation story through powerful code, elegant design, and insightful data.
            </motion.p>
          </motion.div>
        </FullPageSection>

        {/* Trusted By Section */}
        <FullPageSection id="trusted" ref={sectionsRef.current[1]}>
          <div className="w-full relative z-10 flex flex-col items-center justify-center p-4">
            <h2 className={`text-2xl md:text-5xl font-extrabold text-center mb-16 text-[${colors.secondary}]`}>Trusted by Industry Leaders</h2>
            <div className="w-full overflow-hidden relative">
              <div className="flex animate-marquee">
                {companies.concat(companies).map((company, index) => (
                  <div key={index} className="flex-shrink-0 flex justify-center items-center h-24">
                    <img
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                      className="h-16 w-auto object-contain mx-8 md:mx-12 filter grayscale transition-all duration-500 hover:grayscale-0"
                    />
                  </div>
                ))}
              </div>
            </div>
            <p className={`mt-12 text-center text-sm md:text-base text-[${colors.mutedText}] max-w-2xl`}>
              We have a proven track record of working with a diverse range of clients, from agile startups to established corporations, to deliver transformative results.
            </p>
          </div>
        </FullPageSection>

        {/* Services Section */}
        <FullPageSection id="services" ref={sectionsRef.current[2]}>
          <div className="w-full relative z-10 flex flex-col items-center justify-center p-4">
            <motion.h2
              className={`text-3xl md:text-5xl font-extrabold text-center mb-16 animated-gradient`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our Digital Services
            </motion.h2>
            <div className="flex flex-row md:flex-row overflow-x-auto gap-8 max-w-6xl mx-auto no-scrollbar pb-4 md:pb-0">
              {serviceData.map((service, index) => (
                <motion.div
                  key={index}
                  className={`relative p-8 rounded-2xl bg-[${colors.cardBg}] border border-transparent backdrop-blur-sm shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-[${colors.cardBorder}] min-w-[300px]`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className={`mb-6 text-[${colors.primary}]`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{service.title}</h3>
                  <p className={`text-sm text-[${colors.mutedText}] mb-4`}>{service.description}</p>
                  <p className={`text-base font-bold text-[${colors.primary}] mt-auto`}>{service.tagline}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FullPageSection>
        
        {/* Consolidated Philosophy Section */}
        <FullPageSection id="philosophy" ref={sectionsRef.current[3]} bgClass={philosophyData[activePillar].bgClass}>
          <div className="w-full flex flex-col items-center justify-center p-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-8 animated-gradient">Our Core Philosophy</h2>
            <div className="flex space-x-2 md:space-x-4 mb-12">
              {Object.keys(philosophyData).map((key) => (
                <motion.button
                  key={key}
                  onClick={() => setActivePillar(key)}
                  className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${activePillar === key ? `bg-[${colors.primary}] text-[${colors.background}] shadow-xl` : `bg-white/10 text-white/60 hover:text-white`}`}
                >
                  {philosophyData[key].title}
                </motion.button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <div className={`text-[${colors.primary}] mb-8`}>{philosophyData[activePillar].icon}</div>
                <h3 className="text-4xl md:text-5xl font-bold mb-4">{philosophyData[activePillar].title}</h3>
                <p className={`text-lg md:text-xl text-[${colors.mutedText}] text-center max-w-md`}>{philosophyData[activePillar].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </FullPageSection>
        
        {/* Founder Story Section */}
        <FullPageSection id="founder-story" ref={sectionsRef.current[4]}>
          <div className="w-full relative z-10 flex flex-col items-center justify-center p-4">
            <h2 className={`text-3xl md:text-5xl font-extrabold text-center mb-16 animated-gradient`}>Founder Story</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-5xl">
              <div className="md:w-1/2 flex flex-col items-center text-center max-w-lg leading-relaxed text-base md:text-lg lg:text-xl text-[${colors.mutedText}]">
                <p className="mb-8">
                  Asit Deva is a seasoned expert dedicated to helping businesses navigate the complexities of technology and innovation. With a passion for building, advising, and strategizing, he transforms ideas into tangible, successful products.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-auto">
                  <div className="flex flex-col items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                    <CodeSVG />
                    <span className="mt-2 text-2xl md:text-3xl font-bold animated-gradient">12+</span>
                    <p className={`text-xs text-[${colors.mutedText}]`}>Years in Software</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                    <DataSVG />
                    <span className="mt-2 text-2xl md:text-3xl font-bold animated-gradient">8+</span>
                    <p className={`text-xs text-[${colors.mutedText}]`}>Years in Analytics</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                    <DesignSVG />
                    <span className="mt-2 text-2xl md:text-3xl font-bold animated-gradient">5+</span>
                    <p className={`text-xs text-[${colors.mutedText}]`}>Years in Business</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center md:justify-end">
                <motion.div
                  className="w-full max-w-md h-auto p-4 bg-white/5 border border-white/10 rounded-2xl shadow-xl backdrop-blur-sm relative overflow-hidden"
                  initial={{ rotateY: -10, scale: 0.9 }}
                  whileInView={{ rotateY: 0, scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,234,255,0.2),transparent_70%)] rounded-full"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  ></motion.div>
                  <img src="https://placehold.co/800x600/1a1a1a/fff?text=ASIT+DEVA" alt="Asit Deva" className="w-full h-full object-cover rounded-xl relative z-10" />
                </motion.div>
              </div>
            </div>
          </div>
        </FullPageSection>

        {/* Contact Section */}
        <FullPageSection id="contact" ref={sectionsRef.current[5]} bgClass="bg-radiant-pulse">
          <motion.div
            className="w-full relative z-10 flex flex-col items-center justify-center p-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-4 animated-gradient">Ready to write your story?</h2>
            <p className={`text-base md:text-xl text-[${colors.mutedText}] text-center max-w-2xl mx-auto mb-12`}>
              Let's connect and begin shaping your innovation journey.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <a
                href="https://cal.com/asitdeva"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-10 py-4 bg-[${colors.primary}] text-[${colors.background}] text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-opacity-90 transform-gpu`}
              >
                Book a Call Today
              </a>
              <a
                href="mailto:ASITDEVA.TORONTO@GMAIL.COM"
                className={`px-10 py-4 bg-[${colors.secondary}] text-[${colors.background}] text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl transform-gpu`}
              >
                Send an Email
              </a>
            </div>
          </motion.div>
        </FullPageSection>
      </main>
    </div>
  );
};

export default App;
