import React from 'react';
import { Tape } from '../Decorations';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="mb-32 max-w-4xl mx-auto bg-white p-10 rounded-2xl border border-slate-200 shadow-sm relative scroll-mt-28">
      <Tape className="-top-4 right-1/2 translate-x-1/2 w-48 rotate-2" />
      <Tape className="bottom-4 -right-4 w-24 -rotate-45 hidden md:block" />

      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 font-sans">
            Who is this guy?
          </h2>
          <div className="prose prose-slate prose-lg font-light text-slate-600">
            <p>
              I work across frontend, backend, and interactive systems, from React and .NET dashboards to Unity-based visual tools.
              <span className="font-hand text-xl text-slate-800 block my-2 transform -rotate-1">
                "I care about structure, but I also care about how things feel."
              </span>
            </p>
            <p>
              I like turning complex problems into calm interfaces, and serious systems into products people actually enjoy using.
              My approach is grounded in engineering fundamentals but elevated by a visual-first mindset.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 border-4 border-slate-800 rounded-full animate-spin-slow opacity-10 border-dashed"></div>
            <div className="absolute inset-4 border-4 border-slate-800 rounded-full animate-reverse-spin opacity-20 border-dotted"></div>
            <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-slate-300 text-6xl">
              ?
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
