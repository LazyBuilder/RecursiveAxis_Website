// src/components/IntroOverlay.jsx (CORRECTED)

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { colors } from './UIMain'; 

const IntroOverlay = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);
  const messages = [
    { text: 'Hello.', delay: 0.5, duration: 2 },
    { text: 'Its your story... What are you waiting for?', delay: 1, duration: 3.5 },
    { text: 'Your vision is ready to become reality.', delay: 1, duration: 3.5 },
    { text: 'This new chapter starts now.', delay: 1, duration: 3.5 },
  ];

  const currentMessage = messages[step];
  
  const charVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.05 } },
  };

  useEffect(() => {
    if (isSkipped) return;

    if (currentMessage) {
      // If a message exists, schedule the next step
      const timeout = setTimeout(() => {
        setStep(step + 1);
      }, currentMessage.delay * 1000 + currentMessage.duration * 1000);
      return () => clearTimeout(timeout);
    } else {
      // If no message exists (step has finished the array), run onComplete
      const finalDelay = setTimeout(() => {
        onComplete();
      }, 1000); 
      return () => clearTimeout(finalDelay);
    }
  }, [step, isSkipped, currentMessage, onComplete]);

  const handleSkip = () => {
    setIsSkipped(true);
    onComplete();
  };

  // ⬅️ CRITICAL FIX: Guard clause to prevent rendering when currentMessage is undefined
  if (!currentMessage) {
    return null; 
  }

  const textArray = Array.from(currentMessage.text);

  return (
    <motion.div
      key="intro"
      // Tailwind fix applied: using hardcoded hex for guaranteed compilation
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] p-8`} 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 0.2 }}
    >
      <div className="relative z-10 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight text-white"
          key={step} 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          // Now safe because of the 'if (!currentMessage)' guard
          transition={{ delay: currentMessage.delay, duration: 0.5 }} 
        >
          {/* Typing effect */}
          {textArray.map((char, index) => (
            <motion.span 
              key={index} 
              variants={charVariants}
              initial="hidden"
              animate="visible"
              transition={{ 
                // Now safe because of the 'if (!currentMessage)' guard
                delay: currentMessage.delay + index * 0.05, 
                duration: 0.01 
              }}
              className={char === '?' ? `text-[${colors.primary}]` : ''}
            >
              {char}
            </motion.span>
          ))}
          {/* Cursor */}
          {/* Check against messages.length is fine here */}
          {step < messages.length && (
            <motion.span
              className={`inline-block w-1 h-10 md:h-14 ml-1 bg-[${colors.primary}]`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
            />
          )}
        </motion.h1>
      </div>

      <motion.button
        onClick={handleSkip}
        className={`absolute bottom-8 right-8 px-6 py-2 bg-white/10 text-white/80 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-white/20`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Skip Intro
      </motion.button>
    </motion.div>
  );
};

export default IntroOverlay;