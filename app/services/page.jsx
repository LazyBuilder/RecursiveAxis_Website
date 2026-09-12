'use client';
import React from 'react';
import { HardHat, ShieldCheck, Building, ArrowRight } from 'lucide-react';
import { SERVICE_DATA, PRIMARY_ACCENT, SECONDARY_ACCENT, LIGHT_BACKGROUND, LIGHT_TEXT } from '../../src/data/constants';
import { useModals } from '../../components/ModalProvider';

export default function ServicesPage() {
  const { openServiceModal } = useModals();

  return (
    <section id="services" className={`py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${LIGHT_BACKGROUND} ${LIGHT_TEXT}`}>
      <div className="text-center mb-16">
        <div className={`text-sm tracking-widest uppercase font-bold mb-3 ${SECONDARY_ACCENT}`}>Our Focus</div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Services & Offerings</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {SERVICE_DATA.map((service) => (
          <div
              key={service.segment}
              className="relative group overflow-hidden rounded-xl border border-gray-200 shadow-xl bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-100 cursor-pointer transform hover:-translate-y-1"
              onClick={() => openServiceModal(service)}
          >
              <div className="p-8">
                  <div className="flex items-center mb-6">
                      <div className={`h-12 w-12 flex items-center justify-center rounded-xl ${PRIMARY_ACCENT} bg-pink-50 mr-4 border border-pink-200 transition-transform group-hover:scale-110`}>
                          <service.icon size={24} />
                      </div>
                      <p className={`text-lg font-bold uppercase tracking-wider ${SECONDARY_ACCENT}`}>{service.segment}</p>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-pink-700 transition-colors">{service.headline}</h3>
                  <p className="text-gray-600 mb-6">{service.body}</p>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                      <p className={`text-sm font-semibold mb-3 text-pink-700`}>{service.tagline}</p>
                      <button
                          onClick={(e) => { e.stopPropagation(); openServiceModal(service); }}
                          className={`inline-flex items-center px-4 py-1.5 text-xs font-semibold rounded-full bg-cyan-600/10 text-cyan-600 border border-cyan-300 transition-all duration-300 hover:bg-cyan-600 hover:text-white hover:border-cyan-600 shadow-sm`}
                          aria-label={`Read More about ${service.segment} services`}
                      >
                          Read More <ArrowRight className="ml-1" size={12} />
                      </button>
                  </div>
              </div>
              <div className="absolute inset-0 border-4 border-transparent rounded-xl pointer-events-none group-hover:border-cyan-400/50 transition-all duration-300"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
