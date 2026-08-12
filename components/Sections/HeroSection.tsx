import React from 'react';
import { ArrowSketch, StylizedCorner, Tape, Sticker } from '../Decorations';
import { MessageCircle, Terminal, Mail } from 'lucide-react';
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
              <h2 className="text-4xl md:text-5xl font-ascii text-slate-800 tracking-tight leading-none">
                HAIKAITECH SOLUTIONS<span className="text-blue-600 animate-pulse">_</span>
              </h2>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-emerald-700 uppercase">Currently accepting projects</span>
          </div>

          <h1 className="text-slate-900 font-bold tracking-tight mb-8 text-5xl md:text-7xl leading-[1.1]">
            Custom web apps and dashboards <br className="hidden md:block" />
            for businesses that outgrew templates.
          </h1>

          <div className="relative inline-block max-w-2xl mb-8">
            <p className="text-slate-600 leading-relaxed text-xl md:text-2xl font-light">
              Full-stack development with React, .NET, and Unity — no agency markup.
            </p>
            <ArrowSketch className="hidden md:block text-slate-300 absolute -bottom-8 left-8 rotate-[-90deg]" />
          </div>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href="https://wa.me/60147533499?text=Hi%20HaikaiTech!%20I%20came%20across%20your%20portfolio%20(haikaitech.my)%20and%20would%20love%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" onClick={() => track('cta_clicked', 'chat_whatsapp_hero')} className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-medium rounded-md hover:bg-[#20b858] transition-all hover:-translate-y-1 hover:shadow-lg">
              <MessageCircle className="w-4 h-4 group-hover:animate-bounce" />
              <span className="font-hand text-xl">Chat on WhatsApp</span>
              <StylizedCorner className="text-white/20 bottom-1 right-1 w-3 h-3" />
            </a>
            <a href="mailto:hq@haikaitech.my?subject=Project%20enquiry" onClick={() => track('cta_clicked', 'email_cta_hero')} className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-slate-200 text-slate-700 font-medium rounded-md hover:border-slate-400 hover:bg-white transition-all bg-white/50 backdrop-blur-sm">
              <Mail className="w-4 h-4 text-slate-400 group-hover:text-slate-800" />
              <span className="font-mono text-sm">Email us</span>
            </a>
            <a href="#projects" onClick={() => track('cta_clicked', 'view_work_hero')} className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-slate-200 text-slate-700 font-medium rounded-md hover:border-slate-400 hover:bg-white transition-all bg-white/50 backdrop-blur-sm">
              <Terminal className="w-4 h-4 text-slate-400 group-hover:text-slate-800" />
              <span className="font-mono text-sm">./view_work.sh</span>
            </a>
          </div>

          {/* Trusted-by strip */}
          <div className="mt-10 pt-6 border-t border-slate-100">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              TRUSTED BY
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-medium text-slate-500">
              <span>Al Murtajiz Travel</span>
              <span>Hijrah Al Haramain HQ</span>
              <span>Dentex Clinic</span>
              <span>Médin Fragrances</span>
              <span className="text-slate-300 font-normal">+ 5 more projects</span>
            </div>
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
