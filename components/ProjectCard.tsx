import React from 'react';
import { Project } from '../types';
import { ExternalLink, Hash, Pin, Calendar } from 'lucide-react';
import { Tape } from './Decorations';

declare global {
  interface Window { dataLayer: unknown[]; }
}

const track = (action: string, label?: string) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, { event_label: label });
  }
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="relative group flex flex-col h-full bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:rotate-1">
      {/* Tape Effect at Top Center */}
      <Tape className="-top-4 left-1/2 -translate-x-1/2 w-32 rotate-1 opacity-90" />

      {/* Image / Header Area */}
      <div className="relative h-48 overflow-hidden bg-slate-100 border-b border-slate-200 group-hover:border-slate-300 transition-colors">
        <div className={`absolute inset-0 opacity-80 mix-blend-multiply ${project.accentColor.split(' ')[0]} bg-slate-50 transition-opacity duration-500 group-hover:opacity-100`}>
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 grayscale hover:grayscale-0"
          />
        </div>

        {/* Handwritten Fig Number */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 text-sm font-hand font-bold border border-slate-200 -rotate-2 shadow-sm transform group-hover:rotate-0 transition-transform">
          Fig. {project.id}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow relative">
        {/* Decorative corner doodles on hover */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-slate-300 transform rotate-12">
          <Pin className="w-5 h-5 fill-slate-200" />
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-slate-900 mb-1 font-sans group-hover:text-blue-600 transition-colors">{project.name}</h3>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-medium font-hand text-lg">{project.purpose}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-xs font-mono bg-slate-50 border border-slate-200 text-slate-500 rounded-sm group-hover:border-slate-300 group-hover:text-slate-700 transition-colors">
              <Hash className="w-3 h-3 inline mr-1 opacity-40" />
              {tag}
            </span>
          ))}
        </div>

        {/* Auto-mapped Skills Context */}
        <div className="mt-auto pt-5 border-t border-dashed border-slate-200">
          <h4 className="text-sm font-bold text-slate-500 font-hand -ml-2 mb-3 transform -rotate-1">
            Tools & Toys
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="inline-block bg-slate-100/50 border border-slate-200 rounded-md px-2 py-1 text-xs font-medium text-slate-600 hover:bg-white hover:shadow-sm transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-20 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a
          href="#booking"
          onClick={(e) => { e.stopPropagation(); track('cta_clicked', 'project_to_booking', project.id); }}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Calendar className="w-3 h-3" />
          Need something like this? Let's talk.
        </a>
      </div>

      {/* View Project Overlay Link */}
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" aria-label={`View project ${project.name}`}></a>
    </div>
  );
};

export default ProjectCard;