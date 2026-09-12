import React from 'react';
import { LIGHT_BACKGROUND } from '../data/constants';

const FinalCTASection = () => (
  <section id="booking" className={`py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${LIGHT_BACKGROUND}`}>
    <div className="text-center p-12 md:p-20 rounded-2xl bg-gradient-to-br from-pink-600 to-cyan-500 shadow-2xl shadow-pink-500/50 transform-gpu animate-in fade-in zoom-in-95">
      <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
        LET'S DISCUSS YOUR VISION. <span className="block sm:inline-block">LIMITED SPOTS AVAILABLE.</span>
      </h2>
      <p className="text-xl text-white/90 mb-10 max-w-4xl mx-auto">
        Take the first step toward product-market fit, de-risked investment, or structured innovation. Let's see the results, together.
      </p>
      <a
        href="https://cal.com/asitdeva"
        target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center px-10 py-4 rounded-lg text-xl font-extrabold transition-all duration-300 bg-gray-950 hover:bg-gray-800 text-white shadow-xl shadow-gray-950/50 transform hover:scale-[1.05]"
      >
        Reserve Your Free Discovery Session Now
      </a>
    </div>
  </section>
);

export default FinalCTASection;
