// src/components/FullPageSection.jsx

import React, { useRef, forwardRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

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

export default FullPageSection;