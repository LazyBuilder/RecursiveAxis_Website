// src/components/FullPageSection.jsx (FIXED Structure)

import React, { useRef, forwardRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Full-page section component using forwardRef to pass down the ref
const FullPageSection = forwardRef(({ id, children, bgClass = '', alwaysVisible = false }, ref) => {
  const inViewRef = useRef(null);
  // Trigger animation when 50% of the component is in view
  const isInView = useInView(inViewRef, { once: true, amount: 0.5 }); 
  const isVisible = alwaysVisible || isInView;

  return (
    <section
      id={id}
      ref={ref}
      // This is the full-screen parent container (relative and h-screen)
      className={`relative w-full h-screen snap-start snap-always flex flex-col items-center justify-center overflow-hidden ${bgClass}`}
    >
      
      {/* 🚨 FIX: inViewRef placed on the content wrapper */}
      <div ref={inViewRef} className="w-full h-full flex flex-col items-center justify-center relative z-10">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              // We removed the surrounding div, so this motion.div is now the main content holder
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