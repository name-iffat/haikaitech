import React from 'react';
import { SKILLS, getIconForCategory, getSkillIcon } from '../../constants';
import { ArrowSketch } from '../Decorations';
import { Sparkles } from 'lucide-react';

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="mb-32 relative scroll-mt-28">
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-3xl font-bold text-slate-900">The Workshop Wall</h2>
        <div className="flex-1 h-px border-t-2 border-dashed border-slate-200"></div>
        <Sparkles className="text-yellow-400 w-6 h-6" />
      </div>

      <div className="masonry-grid grid gap-6 grid-cols-1 md:grid-cols-2">
        {SKILLS.map((group, idx) => (
          <div key={group.category}
            className="relative p-8 bg-white border-2 border-slate-100 shadow-sm hover:shadow-md hover:border-slate-300 transition-all rounded-xl overflow-hidden group">
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

            {idx === 0 && (
              <ArrowSketch className="text-slate-300 -top-4 -right-4 transform rotate-12 hidden lg:block opacity-50" />
            )}

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 group-hover:bg-yellow-50 group-hover:text-yellow-600 transition-colors">
                  {getIconForCategory(group.category)}
                </div>
                <h3 className="text-xl font-bold text-slate-800 font-sans">{group.category}</h3>
              </div>

              <p className="text-base font-hand text-slate-500 mb-6 leading-relaxed text-lg">
                {group.description}
              </p>

              <div className="flex flex-wrap gap-2.5">
                {group.items.map(skill => (
                  <span key={skill} className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center gap-2 transition-all hover:-translate-y-1 hover:shadow-md hover:border-slate-300 select-none cursor-default group/skill">
                    <span className="group-hover/skill:animate-bounce">
                      {getSkillIcon(skill)}
                    </span>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
