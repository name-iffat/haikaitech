import React from 'react';
import { CONTACTS, getIconForContact } from '../../constants';
import { ChevronRight } from 'lucide-react';
import { track } from '../track';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="mb-32 scroll-mt-28">
      <div className="bg-slate-900 text-slate-100 p-8 md:p-16 rounded-2xl relative overflow-hidden text-center md:text-left">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-yellow-300 font-mono text-xs mb-4 border border-slate-700">
              STATUS: ONLINE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Ready to build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 font-hand italic">real?</span>
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
                  onClick={() => track('contact_clicked', contact.type)}
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
  );
};

export default ContactSection;
