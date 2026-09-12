'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import projectsData from '../data/projects';
import { PROJECT_COLORS, LOGO_PATH } from '../data/constants';

const ProjectsShowcase = () => {
  const shuffledProjects = [...projectsData].sort(() => 0.5 - Math.random());
  const showcaseProjects = shuffledProjects.slice(0, 3);

  return (
      <section id="projects" className={`py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white text-gray-900`}>
          <div className="text-center mb-16">
              <div className={`text-sm tracking-widest uppercase font-bold mb-3 text-pink-600`}>Social Proof</div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Recent Projects: Evidence of Our Impact</h2>
              <p className="text-gray-600 mt-4 max-w-3xl mx-auto">See how we've partnered with leaders to turn complex challenges into elegant, scalable outcomes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {showcaseProjects.map((project) => {
                  const colorKey = project.color || 'default';
                  const FALLBACK_COLORS = { border: 'border-gray-400', shadow: 'shadow-gray-200' };
                  const colors = PROJECT_COLORS[colorKey] ?? FALLBACK_COLORS;
                  const projectVisual = project.imageSrc || LOGO_PATH;
                  const imageClass = project.imageSrc ? "w-full h-full object-cover" : "w-full h-full object-contain p-8 bg-gray-100";

                  return (
                      <div
                          key={project.id}
                          className={`bg-white p-6 rounded-xl border ${colors.border} shadow-lg transition-all duration-300 hover:shadow-xl hover:${colors.shadow} cursor-pointer`}
                      >
                          <div className="mb-4 h-48 w-full overflow-hidden rounded-lg relative">
                              <img
                                  src={projectVisual}
                                  alt={`Visual for ${project.title}`}
                                  className={imageClass} loading="lazy"
                              />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {project.description.substring(0, 90)}...
                          </p>
                          <div className="flex flex-wrap gap-2">
                              {project.tags.map(tag => (
                                  <span key={tag} className={`text-xs font-medium px-2 py-0.5 rounded-full border border-gray-300 text-gray-600 bg-gray-50`}>
                                      {tag}
                                  </span>
                              ))}
                          </div>
                      </div>
                  );
              })}
          </div>
          <div className="text-center mt-12">
              <Link
                  href="/projects"
                  className={`inline-flex items-center font-bold text-lg px-6 py-3 rounded-lg text-white bg-cyan-700 transition-all duration-300 hover:bg-cyan-800 shadow-md shadow-cyan-500/30 transform hover:scale-[1.03]`}
              >
                  Explore All Projects & Case Studies <ArrowRight className="ml-2" size={20} />
              </Link>
          </div>
      </section>
  );
}

export default ProjectsShowcase;
