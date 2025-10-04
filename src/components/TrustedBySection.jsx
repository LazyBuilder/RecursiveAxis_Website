// src/components/TrustedBySection.jsx (REPLACE COMPLETELY)

import React from 'react';
import FullPageSection from './FullPageSection';
import { colors, companies } from './UIMain';

const TrustedBySection = React.forwardRef((props, ref) => (
  // Inherits light body background. Ensure text is dark-ish.
  <FullPageSection id="trusted" ref={ref} bgClass="text-gray-800">
    <div className="w-full relative z-10 flex flex-col items-center justify-center p-4">
      <h2 className={`text-2xl md:text-5xl font-extrabold text-center mb-16 text-[${colors.secondary}]`}>Trusted by Industry Leaders</h2>
      <div className="w-full overflow-hidden relative">
        <div className="flex animate-marquee">
          {companies.concat(companies).map((company, index) => (
            <div key={index} className="flex-shrink-0 flex justify-center items-center h-24">
              <img
                src={company.logoUrl}
                alt={`${company.name} logo`}
                className="h-16 w-auto object-contain mx-8 md:mx-12 filter grayscale transition-all duration-500 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
      <p className={`mt-12 text-center text-sm md:text-base text-gray-500 max-w-2xl`}>
        We have a proven track record of working with a diverse range of clients, from agile startups to established corporations, to deliver transformative results.
      </p>
    </div>
  </FullPageSection>
));

export default TrustedBySection;