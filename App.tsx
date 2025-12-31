import React from 'react';
import { PROJECTS, SKILLS, CONTACTS, getIconForCategory, getIconForContact, getSkillIcon } from './constants';
import ProjectCard from './components/ProjectCard';
import Navbar from './components/Navbar';
import CalBooking from './components/CalBooking';
import { ScribbleUnderline, ArrowSketch, StylizedCorner, Tape, Sticker, DoodleStar, HandCircle } from './components/Decorations';
import { ChevronRight, Terminal, User, Sparkles } from 'lucide-react';

const App: React.FC = () => {
    return (
        <div className="min-h-screen relative font-sans bg-paper bg-grid-pattern selection:bg-yellow-200 selection:text-slate-900">

            <Navbar />

            {/* Main Container */}
            <main className="max-w-5xl mx-auto px-6 py-20 md:py-32 relative">

                {/* Decorative Floating Elements in Background */}
                <DoodleStar className="top-20 left-10 text-slate-300 animate-pulse hidden lg:block" />
                <DoodleStar className="top-40 right-20 text-blue-200 hidden lg:block" />
                <DoodleStar className="bottom-20 left-1/4 text-orange-200 hidden lg:block" />

                {/* ================= HERO SECTION ================= */}
                <header id="home" className="mb-32 relative pt-10">
                    <div className="absolute -top-16 -left-16 text-slate-200/50 font-mono text-9xl font-bold select-none pointer-events-none animate-float">
                        DEV
                    </div>

                    <div className="relative z-10 flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-10 md:gap-16">
                        {/* Left Content */}
                        <div className="flex-1 mt-8 md:mt-0 text-center md:text-left relative">

                            {/* Handwritten Role Tag & Brand Name */}
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
                                Building clarity <br className="hidden md:block" />
                                from complexity.
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
                                <a href="#contact" className="group relative inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-all hover:-translate-y-1 hover:shadow-lg">
                                    <User className="w-4 h-4 group-hover:animate-bounce" />
                                    <span className="font-hand text-xl">Say Hello</span>
                                    <StylizedCorner className="text-white/20 bottom-1 right-1 w-3 h-3" />
                                </a>
                                <a href="#projects" className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-slate-200 text-slate-700 font-medium rounded-md hover:border-slate-400 hover:bg-white transition-all bg-white/50 backdrop-blur-sm">
                                    <Terminal className="w-4 h-4 text-slate-400 group-hover:text-slate-800" />
                                    <span className="font-mono text-sm">./view_work.sh</span>
                                </a>
                            </div>
                        </div>

                        {/* Avatar Section - Playful & Interactive */}
                        <div className="relative group w-48 h-64 md:w-72 md:h-[26rem] flex-shrink-0 mx-auto md:mx-0 perspective-1000">

                            {/* Fun Sticker */}
                            <Sticker className="-top-6 -right-6 w-24 h-24 rotate-12 bg-yellow-300 border-slate-900 text-center text-sm leading-tight p-2 z-40 animate-wiggle-slow">
                                Open for <br /> Cool Stuff
                            </Sticker>

                            {/* Tape holding the photo */}
                            <Tape className="-top-3 left-1/2 -translate-x-1/2 w-32 z-30" />

                            {/* Decorative back layers - messy stack effect */}
                            <div className="absolute inset-0 bg-yellow-200 rounded-sm transform rotate-6 transition-transform duration-500 group-hover:rotate-12 shadow-md"></div>
                            <div className="absolute inset-0 bg-white border-2 border-slate-800 rounded-sm transform -rotate-3 transition-transform duration-500 group-hover:-rotate-6 z-10 shadow-lg"></div>

                            {/* Image Container */}
                            <div className="absolute inset-2 z-20 overflow-hidden rounded-sm bg-slate-100 border border-slate-200">
                                <img
                                    src="assets/3D-me.png"
                                    alt="Iffat Haikal 3D Avatar with IH Cap"
                                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* ================= PROJECTS SECTION ================= */}
                <section id="projects" className="mb-32 scroll-mt-28 relative">
                    {/* Section Header with 'Sketch' vibe */}
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

                {/* ================= SKILLS & WORKSHOP WALL ================= */}
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

                                {/* Background Grid inside card */}
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

                                    {/* Description */}
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

                {/* ================= ABOUT SECTION ================= */}
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
                        {/* Visual decoration side */}
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

                {/* ================= CONTACT SECTION ================= */}
                <section id="contact" className="mb-32 scroll-mt-28">
                    <div className="bg-slate-900 text-slate-100 p-8 md:p-16 rounded-2xl relative overflow-hidden text-center md:text-left">
                        {/* Background effects */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1">
                                <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-yellow-300 font-mono text-xs mb-4 border border-slate-700">
                                    STATUS: ONLINE
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                                    Ready to build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 font-hand italic">real? '</span>
                                </h2>
                                <p className="text-slate-400 text-xl max-w-md mx-auto md:mx-0 mb-8 font-light">
                                    Drop me a line for collaborations, freelance work, or just to share your favorite VS Code theme.
                                </p>
                            </div>

                            <div className="flex-1 w-full max-w-md">
                                <div className="grid grid-cols-1 gap-4">
                                    {CONTACTS.map((contact) => (
                                        <a
                                            key={contact.type}
                                            href={contact.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={contact.description}
                                            className="group flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all rounded-xl relative overflow-hidden"
                                        >
                                            <div className="flex items-center gap-4 relative z-10">
                                                <span className="p-2 rounded-lg bg-slate-800 text-slate-300 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                                                    {getIconForContact(contact.type)}
                                                </span>
                                                <div className="text-left">
                                                    <span className="block text-xs font-mono text-slate-400 uppercase tracking-wider">{contact.label}</span>
                                                    <span className="block text-sm font-medium text-slate-200 group-hover:text-white">{contact.value}</span>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= BOOKING SECTION ================= */}
                <section id="booking" className="mb-12 scroll-mt-28">
                    <div className="bg-white p-8 md:p-16 rounded-2xl border border-slate-200 shadow-sm text-center relative">
                        {/* Background Grid */}
                        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

                        {/* Decorative Elements */}
                        <DoodleStar className="top-8 left-8 text-blue-200 hidden lg:block" />
                        <DoodleStar className="top-16 right-16 text-yellow-200 hidden lg:block" />
                        <Tape className="-top-4 right-1/2 translate-x-1/2 w-48 rotate-2" />
                        <Tape className="bottom-4 -left-4 w-32 -rotate-12 hidden md:block" />
                        <Sticker className="top-6 right-6 w-20 h-20 rotate-12 bg-blue-300 border-slate-900 text-center text-xs leading-tight p-2 z-10">
                            Book <br /> Now!
                        </Sticker>
                        <ArrowSketch className="hidden md:block text-slate-300 bottom-8 left-8 transform rotate-45" />

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-sans">Book a Call</h2>
                            <p className="text-slate-600 mb-8 max-w-2xl mx-auto font-hand text-lg">
                                Schedule a 30-minute call to discuss your project ideas, collaboration opportunities, or just chat about tech.
                            </p>
                            <div className="max-w-4xl mx-auto rounded-xl overflow-hidden border-2 border-slate-200 shadow-lg" style={{height: "600px"}}>
                                <CalBooking />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-slate-200 py-12 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm font-mono gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        &copy; {new Date().getFullYear()} HaikaiTech
                    </div>
                </footer>

            </main>
        </div>
    );
};

export default App;