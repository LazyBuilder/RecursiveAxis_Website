import React from 'react';
import { FAQ_DATA, PRIMARY_ACCENT, SECONDARY_ACCENT, LIGHT_BACKGROUND, LIGHT_TEXT } from '../data/constants';

const FAQSection = () => (
  <section id="faq" className={`py-20 md:py-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${LIGHT_BACKGROUND} ${LIGHT_TEXT}`}>
    <div className="text-center mb-16">
      <div className={`text-sm tracking-widest uppercase font-bold mb-3 ${SECONDARY_ACCENT}`}>Knowledge Base</div>
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
      <p className="text-gray-600 mt-4">Clear answers to the most common questions about our advisory and execution services.</p>
    </div>
    <div className="space-y-6">
      {FAQ_DATA.map((faq, index) => (
        <div key={index} className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
            <span className={`mr-3 ${PRIMARY_ACCENT}`}>Q:</span>
            {faq.question}
          </h3>
          <p className="text-gray-600 leading-relaxed pl-7">
            <span className={`font-bold ${SECONDARY_ACCENT} mr-2`}>A:</span>
            {faq.answer}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default FAQSection;
