// src/components/FullPageSection.jsx (ADAPTIVE STRUCTURE AND COMMENTS)

import React, { useRef, forwardRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Full-page section component using forwardRef to pass down the ref from the parent (Home.jsx).
// The 'style' prop is now explicitly included to allow custom background colors.
const FullPageSection = forwardRef(({ id, children, bgClass = '', alwaysVisible = false, style, ...props }, ref) => {
  const inViewRef = useRef(null);
  // useInView is a Framer Motion hook for triggering animations when the component enters the viewport.
  const isInView = useInView(inViewRef, { once: true, amount: 0.5 }); 
  const isVisible = alwaysVisible || isInView;

  return (
    <section
      id={id}
      ref={ref}
      // ADAPTIVE CLASSES: Default (mobile) uses min-h-screen for traditional scroll.
      // lg: (desktop) activates h-screen and snap-scrolling.
      className={`relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden ${bgClass} 
                  lg:h-screen lg:snap-start lg:snap-always`}
      style={style} // 🚨 CRITICAL: Applies the background color passed from children (e.g., ServicesSection)
      {...props}
    >
      
      {/* Wrapper to handle in-view animation and z-index positioning for content */}
      <div ref={inViewRef} className="w-full h-full flex flex-col items-center justify-center relative z-10">
        <AnimatePresence>
          {/* Content is wrapped in motion.div for entry animation */}
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full flex flex-col items-center justify-center relative z-10" 
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
    </section>
  );
});

export default FullPageSection;