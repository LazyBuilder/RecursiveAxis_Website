'use client';
import React, { useState } from 'react';
import { User, Link } from 'lucide-react';
import { PARTNER_DATA, TRUSTED_COMPANIES, HERO_BG_PATH, DARK_BACKGROUND, FOUNDER_IMAGE_PATH } from '../data/constants';

const TrustedCompaniesMarquee = () => (
  <div className="relative w-full overflow-hidden whitespace-nowrap py-4 border-y border-gray-700 bg-white mt-8">
      <style jsx="true">{`
          @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
          }
          .marquee {
              display: flex;
              width: 200%;
              animation: marquee 45s linear infinite;
          }
          .marquee-item {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 0 2rem;
              min-width: fit-content;
          }
          .company-logo {
              height: 2rem;
              width: auto;
              object-fit: contain;
              opacity: 0.9;
              transition: opacity 0.1s, transform 0.3s;
          }
          .company-logo:hover {
              opacity: 1;
              transform: scale(1.05);
          }
      `}</style>
      <div className="marquee">
          {[...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES].map((company, index) => {
              const content = company.logo ? (
                  <img
                      src={company.logo}
                      alt={`${company.name} Logo`}
                      className="company-logo"
                  />
              ) : (
                  <span className="text-2xl font-bold text-gray-500 hover:text-white transition-colors cursor-default select-none tracking-wider">
                      {company.name}
                  </span>
              );
              return (
                  <div key={index} className="marquee-item">
                      {company.url ? (
                          <a
                              href={company.url}
                              target="_blank" rel="noopener noreferrer"
                              aria-label={`Visit ${company.name}'s website`}
                              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                          >
                              {content}
                          </a>
                      ) : (
                          content
                      )}
                  </div>
              );
          })}
      </div>
  </div>
);

const TeamSection = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
      <section className={`py-20 md:py-32 ${DARK_BACKGROUND} border-t border-b border-gray-800 relative overflow-hidden`}>
      <div
        className="absolute inset-0 z-0 bg-opacity-10"
        style={{
          backgroundImage: `url(${HERO_BG_PATH})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(1px)',
        }}
      />
      <div className="absolute inset-0 bg-gray-950/75"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {PARTNER_DATA.map((partner, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-12 items-center p-10 rounded-xl">
                    <div className="md:order-1">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                            Meet The {partner.isFounder ? 'Founder' : 'Partner'}: {partner.name}
                        </h2>
                        <p className={`text-lg mb-8 text-cyan-700`}>{partner.title}</p>
                        <p className="text-gray-300 text-lg mb-8">{partner.copy}</p>
                        <a
                            href={partner.linkedin}
                            target="_blank" rel="noopener noreferrer"
                            className={`inline-flex items-center font-bold text-lg text-pink-600 hover:text-white transition-colors`}
                        >
                            Connect with {partner.name.split(' ')[0]} on LinkedIn <Link className="ml-2" size={20} />
                        </a>
                        <h3 className="text-lg font-bold text-white mb-4">
                          Has worked with:
                        </h3>
                    </div>
                    <div className="md:order-2 flex justify-center">
                        <div className={`w-64 h-64 rounded-full bg-gray-800 border-4 border-pink-500 flex items-center justify-center shadow-2xl shadow-pink-500/20 overflow-hidden`}>
                            <img
                                src={partner.isFounder ? FOUNDER_IMAGE_PATH : ""} // Use constant for consistency
                                alt={`Headshot of ${partner.name}`}
                                loading="lazy"
                                className={`w-full h-full object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                onLoad={() => setIsImageLoaded(true)}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    setIsImageLoaded(false);
                                }}
                            />
                            {!isImageLoaded && <User className='text-gray-400' size={64}/>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <TrustedCompaniesMarquee />
    </section>
    );
}

export default TeamSection;
