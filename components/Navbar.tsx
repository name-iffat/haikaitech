import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, User, Mail, Wrench, Home, Calendar } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Start', href: '#home', icon: Home },
    { name: 'Work', href: '#projects', icon: Terminal },
    { name: 'Workshop', href: '#skills', icon: Wrench },
    { name: 'About', href: '#about', icon: User },
    { name: 'Contact', href: '#contact', icon: Mail },
    { name: 'Book', href: '#booking', icon: Calendar },
  ];

  return (
    <>
      {/* Floating Dock Container */}
      <nav className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-transform duration-300 ${scrolled ? 'translate-y-0' : 'translate-y-2'}`}>
        
        {/* The Navbar Pill */}
        <div className="relative bg-white/90 backdrop-blur-md border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl px-2 py-2 md:px-6 md:py-3 flex items-center justify-between gap-4 md:gap-8 max-w-2xl w-full mx-auto">
           
           {/* Logo / Home Mobile */}
           <a href="#home" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors md:hidden">
              <div className="font-hand font-bold text-xl text-slate-800">IH</div>
           </a>

           {/* Desktop Nav Items */}
           <div className="hidden md:flex items-center gap-1 w-full justify-between">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all group relative overflow-hidden"
                >
                  <item.icon className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  <span className="relative z-10">{item.name}</span>
                  {/* Subtle underline effect */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left opacity-30"></div>
                </a>
              ))}
           </div>

           {/* Mobile Menu Button */}
           <button 
             className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative z-50"
             onClick={() => setIsOpen(!isOpen)}
             aria-label="Toggle menu"
           >
             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
           </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-paper/95 backdrop-blur-sm transition-opacity duration-300 md:hidden flex flex-col items-center justify-center ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-6 text-center">
          {navItems.map((item, idx) => (
            <a 
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold font-sans text-slate-800 hover:text-blue-600 transition-colors flex items-center justify-center gap-3"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
               <item.icon className="w-6 h-6 opacity-50" />
               {item.name}
            </a>
          ))}
          <div className="mt-8">
             <span className="font-hand text-slate-500 text-lg -rotate-3 inline-block bg-yellow-100 px-3 py-1">
               Thanks for visiting!
             </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;