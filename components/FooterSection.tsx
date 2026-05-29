import React from 'react';

const FooterSection: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 py-12 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm font-mono gap-4">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        &copy; {new Date().getFullYear()} HaikaiTech
      </div>
      <div className="flex gap-6">
        <a href="https://github.com/name-iffat" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 cursor-pointer transition-colors">Github</a>
        <a href="https://www.linkedin.com/in/iffathaikal/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 cursor-pointer transition-colors">LinkedIn</a>
        <span className="hover:text-slate-600 cursor-pointer transition-colors">Resume</span>
      </div>
    </footer>
  );
};

export default FooterSection;
