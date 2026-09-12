'use client';
import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import projectsData from '../data/projects';
import { DARK_BACKGROUND, DARK_TEXT, DESCRIPTION_LIMIT } from '../data/constants';
import ProjectCard from '../components/ui/ProjectCard';
import { useModals } from '../ModalProvider';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { openProjectModal } = useModals();

  const filteredProjects = projectsData.filter(project => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const titleMatch = project.title.toLowerCase().includes(query);
    const tagsMatch = project.tags.some(tag => tag.toLowerCase().includes(query));
    return titleMatch || tagsMatch;
  });

  return (
    <div className={`min-h-[70vh] py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${DARK_BACKGROUND} ${DARK_TEXT}`}>
      <Link href="/" className={`inline-flex items-center mb-10 text-lg text-gray-500 hover:text-pink-500 transition-colors`}>
        <ArrowRight className="rotate-180 mr-2" size={20} /> Back to Home
      </Link>
      <h1 className="text-5xl font-extrabold text-white mb-4">All Projects & Case Studies</h1>
      <p className="text-xl text-cyan-300 mb-10">A deep dive into our most impactful strategic and execution engagements across various sectors.</p>
      <div className="relative mb-12 max-w-xl">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects by title or tag (e.g., 'React', 'Blockchain')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500 transition duration-300 shadow-md"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onReadMore={openProjectModal}
              />
            ))
        ) : (
            <div className="lg:col-span-3 text-center py-20 bg-gray-900 rounded-xl border border-gray-700">
                <h3 className="text-3xl font-bold text-pink-400 mb-4">No Projects Found</h3>
                <p className="text-gray-400 text-lg">Try adjusting your search query, or contact us to discuss a new project!</p>
            </div>
        )}
      </div>
      <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to be the next success story?</h3>
          <Link
              href="/contact"
              className={`inline-flex items-center px-6 py-3 rounded-lg text-lg font-bold transition-all duration-300 bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/30`}
          >
              Reserve Your Session
          </Link>
      </div>
    </div>
  );
}
