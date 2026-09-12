'use client';
import React from 'react';
import { BookOpen } from 'lucide-react';
import TagPill from './TagPill';
import { DESCRIPTION_LIMIT } from '../../src/data/constants';

const ProjectCard = ({ project, onReadMore }) => {
    const isLongDescription = project.description.length > DESCRIPTION_LIMIT;
    const displayDescription = isLongDescription
        ? project.description.substring(0, DESCRIPTION_LIMIT) + '...'
        : project.description;

    return (
        <div className="flex flex-col bg-gray-800 rounded-xl shadow-xl hover:shadow-cyan-500/30 transition duration-500 overflow-hidden border border-gray-700/50">
            {/* Project Image (Optional) - Fixed height for uniform card layout */}
            {project.imageSrc && (
                <div className="h-48 overflow-hidden">
                    <img
                        src={project.imageSrc}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/555/eee?text=${project.title.replace(/\s/g, '+')}`; }}
                    />
                </div>
            )}

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">{project.title}</h3>

                {/* Tags - Ensures a minimum height to prevent layout shifts */}
                <div className="flex flex-wrap min-h-[40px] mb-4">
                    {project.tags.map((tag, index) => (
                        <TagPill key={index} text={tag} />
                    ))}
                </div>

                {/* Description - flex-grow ensures this area takes up available space */}
                <p className={`text-gray-300 mb-4 flex-grow ${isLongDescription ? 'line-clamp-4' : ''}`}>
                    {displayDescription}
                </p>

                {/* Read More Button - Only shows if description is truncated */}
                {isLongDescription && (
                    <button
                        onClick={() => onReadMore(project)}
                        className="mt-auto w-full flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-pink-600 rounded-lg hover:bg-pink-500 transition duration-300 shadow-md shadow-pink-500/30"
                    >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Read Full Description
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
