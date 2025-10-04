// src/components/IntroOverlay.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { colors } from './UIMain'; 

const IntroOverlay = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);
  const messages = [
    { text: 'Hello.', delay: 0.5, duration: 2 },
    { text: 'Is your story... why are you waiting?', delay: 1, duration: 3.5 },
    { text: 'Your vision is ready to become reality.', delay: 1, duration: 3.5 },
    { text: 'This new chapter starts now.', delay: 1, duration: 3.5 },
  ];

  const currentMessage = messages[step];
  const charVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.05 } },
  };

  useEffect(() => {
    if (step < messages.length && !isSkipped) {
      const timeout = setTimeout(() => {
        setStep(step + 1);
      }, currentMessage.delay * 1000 + currentMessage.duration * 1000);
      return () => clearTimeout(timeout);
    } else if (step >= messages.length && !isSkipped) {
      // Auto-transition after the last message
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

  const textArray = currentMessage ? Array.from(currentMessage.text) : [];

  return (
    <motion.div
      key="intro"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[${colors.background}] p-8`}
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
                delay: currentMessage.delay + index * 0.05, 
                duration: 0.01 
              }}
              className={char === '?' ? `text-[${colors.primary}]` : ''}
            >
              {char}
            </motion.span>
          ))}
          {/* Cursor */}
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