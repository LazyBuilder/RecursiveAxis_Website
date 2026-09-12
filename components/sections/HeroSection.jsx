'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SECONDARY_ACCENT, HERO_BG_PATH } from '../data/constants';

const HeroSection = () => (
  <section
    id="hero"
    className="relative py-32 md:py-48 flex items-center justify-center overflow-hidden border-b border-gray-800/50 min-h-[70vh]"
    style={{
      backgroundImage: `url(${HERO_BG_PATH})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#0A0A0A',
      backgroundPosition: 'center',
    }}
  >
    <div className="absolute inset-0 bg-gray-950/75"></div>
    <div className="relative z-10 max-w-4xl text-center px-4">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tighter animate-in fade-in duration-1000">
        Your Strategic Partner for <span className={SECONDARY_ACCENT}>Technology</span>, <span className={SECONDARY_ACCENT}>Analytics</span> & <span className={SECONDARY_ACCENT}>Innovation</span>.
      </h1>
      <h2 className="text-xl sm:text-2xl text-gray-400 mb-10 font-light max-w-3xl mx-auto animate-in fade-in delay-300 duration-1000">
        We provide expert Tech Strategy, Execution, and Advisory services, designed to accelerate innovation for founders, investors, and corporate ventures globally.
      </h2>
      <Link
        href="/services"
        className={`inline-flex items-center px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 bg-pink-600 hover:bg-pink-700 text-white shadow-xl shadow-pink-500/40 transform hover:scale-[1.03] animate-in fade-in delay-500`}
      >
        Explore Our Solutions <ArrowRight className="ml-2" size={20} />
      </Link>
    </div>
  </section>
);

export default HeroSection;
