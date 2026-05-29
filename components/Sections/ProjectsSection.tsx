import React from 'react';
import { PROJECTS } from '../../constants';
import ProjectCard from '../ProjectCard';
import { ScribbleUnderline } from '../Decorations';

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="mb-32 scroll-mt-28 relative">
      <div className="flex items-end justify-between mb-12 relative">
        <div className="relative">
          <h2 className="text-4xl font-bold text-slate-900 flex items-center gap-3 relative z-10">
            Selected Works
          </h2>
          <ScribbleUnderline className="text-yellow-300 w-48 h-4 -bottom-2 left-0 z-0" />
        </div>
        <div className="hidden md:block text-right">
          <span className="text-sm font-hand text-slate-500 block rotate-3 bg-white px-2 border border-slate-200 shadow-sm">
            Total: {PROJECTS.length} items
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {PROJECTS.map((project, idx) => (
          <div key={project.id} className={idx % 2 === 0 ? 'md:translate-y-4' : ''}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
