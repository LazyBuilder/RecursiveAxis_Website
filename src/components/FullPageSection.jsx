// src/components/FullPageSection.jsx (ADAPTIVE STRUCTURE)

import React, { useRef, forwardRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Full-page section component using forwardRef to pass down the ref
const FullPageSection = forwardRef(({ id, children, bgClass = '', alwaysVisible = false, ...props }, ref) => {
  const inViewRef = useRef(null);
  // Trigger animation when 50% of the component is in view
  const isInView = useInView(inViewRef, { once: true, amount: 0.5 }); 
  const isVisible = alwaysVisible || isInView;

  return (
    <section
      id={id}
      ref={ref}
      // ADAPTIVE CLASSES:
      // Default (mobile): min-h-screen (traditional scroll)
      // lg: (desktop): h-screen, snap-start snap-always
      className={`relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden ${bgClass} 
                  lg:h-screen lg:snap-start lg:snap-always`}
      {...props}
    >
      
      {/* 🚨 FIX: inViewRef placed on the content wrapper */}
      {/* This wrapper ensures content is centered but respects the min-h/h sizing */}
      <div ref={inViewRef} className="w-full h-full flex flex-col items-center justify-center relative z-10">
        <AnimatePresence>
          {/* Ensure visibility logic is sound for traditional scroll (alwaysVisible for Hero) */}
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              // Ensure this content wrapper is always relative z-10 to sit above absolute backgrounds
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