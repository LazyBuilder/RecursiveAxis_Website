'use client';
import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import TagPill from '../ui/TagPill';
import { SIMPLE_LOGO_PATH, PRIMARY_ACCENT, DARK_BACKGROUND } from '../data/constants';

export const FullDescriptionModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
      <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/90 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto"
          aria-modal="true"
          role="dialog"
          onClick={onClose}
      >
          <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-gray-900 shadow-2xl transform transition-transform duration-300 scale-100 border border-gray-700"
              onClick={(e) => e.stopPropagation()}
          >
              <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-md bg-white border border-cyan-600 flex-shrink-0 aspect-square w-8">
                              <img
                                  src={SIMPLE_LOGO_PATH}
                                  alt="Recursive Axis Logo"
                                  className={`h-full w-full object-contain opacity-80`}
                              />
                          </div>
                          <h2 className="text-3xl font-extrabold text-pink-400 border-b border-pink-600 pb-2">
                              {project.title}
                          </h2>
                      </div>
                      <button
                          onClick={onClose}
                          className="text-gray-400 hover:text-white transition duration-200 p-2 rounded-full hover:bg-gray-800 flex-shrink-0"
                          aria-label="Close modal"
                      >
                          <X className="w-6 h-6" />
                      </button>
                  </div>
                  <div className="flex flex-wrap mb-4">
                      {project.tags.map((tag, index) => (
                          <TagPill key={index} text={tag} />
                      ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{project.description}</p>
                  {project.link && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center px-6 py-3 rounded-lg text-lg font-bold transition-all duration-300 bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/30`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-7-3l-4 4m0 0l4 4m-4-4h13"></path></svg>
                        <span className="ml-2">View Project</span>
                    </a>
                  )}
                  {project.imageSrc && (
                      <img
                          src={project.imageSrc}
                          alt={project.title}
                          className="mt-6 w-full h-auto object-cover rounded-lg shadow-lg"
                          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/555/eee?text=${project.title.replace(/\s/g, '+')}`; }}
                      />
                  )}
              </div>
          </div>
      </div>
  );
};

export const ServiceModal = ({ isOpen, onClose, content }) => {
  if (!isOpen || !content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/90 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto">
      <div
            className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl max-w-xl w-full p-8 transition-transform duration-300 scale-100 transform-gpu animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
             <div className="p-2 rounded-md bg-white border border-cyan-600 flex-shrink-0 aspect-square w-12">
              <img
                src={SIMPLE_LOGO_PATH}
                alt="Recursive Axis Logo"
                className={`h-full w-full object-contain opacity-80`}
              />
            </div>
             <h3 className={`text-2xl font-bold ${PRIMARY_ACCENT}`}>{content.modalTitle}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        <ul className="list-disc list-inside space-y-3 text-gray-300 mb-6 pl-4">
            {content.modalBulletPoints.map((item, index) => (
                <li key={index} className="text-sm md:text-base">
                    {item}
                </li>
            ))}
        </ul>
        <p className="text-gray-500 italic text-sm mb-8">... and more custom solutions tailored to your unique challenges.</p>
        <a href={content.ctaLink} target="_blank" rel="noopener noreferrer" onClick={onClose} className={`w-full block text-center font-bold py-3 px-6 rounded-lg ${DARK_BACKGROUND} border border-pink-500 text-white transition-all duration-300 hover:bg-pink-500 hover:text-gray-950`}>
          {content.modalCta} <ArrowRight className="inline ml-2" size={16} />
        </a>
      </div>
    </div>
  );
};

export const TextModal = ({ isOpen, onClose, content }) => {
  if (!isOpen || !content) return null;

  return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/90 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto"
      >
          <div
              className="bg-white border border-pink-300/50 rounded-xl shadow-2xl max-w-xl w-full p-8 transition-transform duration-300 scale-100 transform-gpu animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
          >
              <div
                  className="flex justify-between items-start mb-6 border-b border-pink-100 pb-4"
              >
                  <div className="flex items-center space-x-3">
                       <div className="p-2 rounded-md bg-gray-950 border border-cyan-600 flex-shrink-0 aspect-square w-12">
                          <img
                            src={SIMPLE_LOGO_PATH}
                            alt="Recursive Axis Logo"
                            className={`h-full w-full object-contain opacity-80`}
                          />
                        </div>
                      <h3 className={`text-2xl font-bold ${PRIMARY_ACCENT}`}>{content.title}</h3>
                  </div>
                  <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition-colors">
                      <X size={24} />
                  </button>
              </div>
              {typeof content.body === 'string' ? (
                  <p className={`text-gray-700 mb-4`}>{content.body}</p>
              ) : (
                  content.body.map((paragraph, index) => (
                      <p key={index} className={`text-gray-700 mb-4`}>{paragraph}</p>
                  ))
              )}
          </div>
      </div>
  );
};
