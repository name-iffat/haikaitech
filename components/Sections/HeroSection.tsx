import React from 'react';
import { ArrowSketch, StylizedCorner, Tape, Sticker, HandCircle } from '../Decorations';
import { Calendar, Terminal } from 'lucide-react';
import { track } from '../track';

interface Props {
  avatarSrc?: string;
}

const HeroSection: React.FC<Props> = ({ avatarSrc }) => {
  return (
    <header id="home" className="mb-32 relative pt-10">
      <div className="absolute -top-16 -left-16 text-slate-200/50 font-mono text-9xl font-bold select-none pointer-events-none animate-float">
        DEV
      </div>

      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-10 md:gap-16">
        <div className="flex-1 mt-8 md:mt-0 text-center md:text-left relative">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 mb-8 relative">
            <span className="text-lg md:text-xl font-hand font-bold text-slate-800 -rotate-2 bg-yellow-100 px-4 py-1.5 shadow-sm border border-yellow-200 transform hover:scale-105 transition-transform cursor-default">
              Builder & Architect
            </span>
            <div className="flex items-baseline gap-2">
              <span className="hidden md:inline text-slate-400 font-ascii text-2xl relative top-1">@</span>
              <h2 className="text-5xl md:text-6xl font-ascii text-slate-800 tracking-tight leading-none">
                HaikaiTech<span className="text-blue-600 animate-pulse">_</span>
              </h2>
            </div>
          </div>

          <h1 className="text-slate-900 font-bold tracking-tight mb-8 text-5xl md:text-7xl leading-[1.1]">
            Freelance software engineer <br className="hidden md:block" />
            building clarity from complexity.
          </h1>

          <div className="relative inline-block max-w-2xl mb-12">
            <p className="text-slate-600 leading-relaxed text-xl md:text-2xl font-light">
              I build dashboards, visual tools, and production systems that feel
              <span className="relative inline-block mx-2 font-medium text-slate-900 font-hand text-3xl">
                human.
                <HandCircle className="text-blue-500/30 -top-2 -left-4 w-[140%] h-[150%]" />
              </span>
            </p>
            <ArrowSketch className="hidden md:block text-slate-300 absolute -bottom-10 -right-10 rotate-[20deg]" />
          </div>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href="#booking" onClick={() => track('cta_clicked', 'book_call_hero')} className="group relative inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-all hover:-translate-y-1 hover:shadow-lg">
              <Calendar className="w-4 h-4 group-hover:animate-bounce" />
              <span className="font-hand text-xl">Book a Free Call</span>
              <StylizedCorner className="text-white/20 bottom-1 right-1 w-3 h-3" />
            </a>
            <a href="#projects" onClick={() => track('cta_clicked', 'view_work_hero')} className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-slate-200 text-slate-700 font-medium rounded-md hover:border-slate-400 hover:bg-white transition-all bg-white/50 backdrop-blur-sm">
              <Terminal className="w-4 h-4 text-slate-400 group-hover:text-slate-800" />
              <span className="font-mono text-sm">./view_work.sh</span>
            </a>
          </div>
        </div>

        <div className="relative group w-48 h-64 md:w-72 md:h-[26rem] flex-shrink-0 mx-auto md:mx-0 perspective-1000">
          <Sticker className="-top-6 -right-6 w-24 h-24 rotate-12 bg-yellow-300 border-slate-900 text-center text-sm leading-tight p-2 z-40 animate-wiggle-slow">
            Open for <br /> Cool Stuff
          </Sticker>
          <Tape className="-top-3 left-1/2 -translate-x-1/2 w-32 z-30" />
          <div className="absolute inset-0 bg-yellow-200 rounded-sm transform rotate-6 transition-transform duration-500 group-hover:rotate-12 shadow-md"></div>
          <div className="absolute inset-0 bg-white border-2 border-slate-800 rounded-sm transform -rotate-3 transition-transform duration-500 group-hover:-rotate-6 z-10 shadow-lg"></div>
          <div className="absolute inset-2 z-20 overflow-hidden rounded-sm bg-slate-100 border border-slate-200">
            <img
              src={avatarSrc}
              alt="Iffat Haikal 3D Avatar with IH Cap"
              className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
