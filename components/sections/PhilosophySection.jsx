'use client';
import React from 'react';
import { useModals } from '../ModalProvider';
import { DIVE_FRAMEWORK, PRIMARY_ACCENT, SECONDARY_ACCENT, LIGHT_TEXT } from '../../src/data/constants';

const PhilosophySection = () => {
  const { openTextModal } = useModals();

  return (
    <section id="philosophy" className={`py-20 md:py-32 bg-gray-50 border-t border-b border-gray-200 ${LIGHT_TEXT}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className={`text-sm tracking-widest uppercase font-bold mb-3 ${SECONDARY_ACCENT}`}>Our Blueprint</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Our Core Philosophy: The D.I.V.E. Framework.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
          {DIVE_FRAMEWORK.map((item) => (
            <button
              key={item.letter}
              onClick={() => openTextModal({title: item.modalTitle, body: item.modalBody})}
              className="text-center p-6 border border-gray-200 rounded-xl shadow-lg bg-white transition-all duration-300 hover:shadow-cyan-200 hover:border-cyan-500 transform hover:-translate-y-0.5 max-w-xs mx-auto"
            >
              <div className={`text-5xl font-extrabold mb-4 ${PRIMARY_ACCENT}`}>{item.letter}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PhilosophySection;
