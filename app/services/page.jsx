'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SERVICE_DATA, PRIMARY_ACCENT, SECONDARY_ACCENT, LIGHT_BACKGROUND, LIGHT_TEXT } from '../../src/data/constants';

export default function ServicesPage() {
  const [selectedPersona, setSelectedPersona] = useState(null);

  const personas = [
    { id: 'founder', label: 'For Founders', data: SERVICE_DATA[0] },
    { id: 'investor', label: 'For Investors', data: SERVICE_DATA[1] },
    { id: 'innovation', label: 'For Builders', data: SERVICE_DATA[2] },
  ];

  return (
    <section className={`py-20 md:py-32 min-h-screen ${LIGHT_BACKGROUND} ${LIGHT_TEXT}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className={`text-sm tracking-widest uppercase font-bold mb-3 ${SECONDARY_ACCENT}`}>Our Expertise</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Strategic Execution for Every Stage</h1>

          {!selectedPersona ? (
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed">
                We leverage the <span className="font-bold text-gray-900">D.I.V.E. Framework</span>—Decision, Iteration, Verification, and Execution—to transform vague ideas into scalable, verified business outcomes.
                Select your profile below to see how we help you eliminate uncertainty.
              </p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{personas.find(p => p.id === selectedPersona)?.label}</h2>
              <p className="text-gray-600 mb-8">{personas.find(p => p.id === selectedPersona)?.data.body}</p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {personas.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPersona(p.id)}
              className={`px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-md ${
                selectedPersona === p.id
                  ? `bg-pink-600 text-white shadow-pink-500/40`
                  : `bg-white text-gray-700 border border-gray-200 hover:border-pink-300 hover:text-pink-600`
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {selectedPersona && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="grid gap-6 mb-16">
              {personas.find(p => p.id === selectedPersona)?.data.serviceItems.map((item, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex items-start space-x-4"
                >
                  <CheckCircle2 className={`w-6 h-6 shrink-0 ${PRIMARY_ACCENT} transition-transform group-hover:scale-110`} />
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-gray-600 italic">{item.question}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href={`/services/${selectedPersona}`}
                className="inline-flex items-center px-10 py-4 rounded-full text-xl font-bold text-white bg-cyan-700 hover:bg-cyan-800 transition-all duration-300 shadow-lg shadow-cyan-500/30 transform hover:scale-105"
              >
                Explore Full Service Details <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
