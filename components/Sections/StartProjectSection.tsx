import React from 'react';
import { MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { track } from '../track';

const WHATSAPP_NUMBER = '60147533499';
const WHATSAPP_TEXT = encodeURIComponent(
  'Hi HaikaiTech! I\'d like to start a project.'
);

const StartProjectSection: React.FC = () => {
  React.useEffect(() => {
    const el = document.getElementById('start');
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        track('section_viewed', 'start');
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const steps = [
    { num: '01', text: 'You message us on WhatsApp or email' },
    { num: '02', text: 'We reply fast — usually within minutes' },
    { num: '03', text: 'You get a fixed quotation, no obligation' },
  ];

  return (
    <section id="start" className="mb-12 scroll-mt-28">
      <div className="bg-slate-900 text-slate-100 p-8 md:p-12 rounded-2xl relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#25D366]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10">
          <h2 className="font-hand text-3xl md:text-4xl text-slate-100">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-[#128C7E] italic">start</span>?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-slate-400 text-lg font-light">
            No obligation, no pressure. We scope your idea and give you a clear fixed price.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('cta_clicked', 'chat_whatsapp_start')}
              className="inline-flex items-center gap-2 bg-[#25D366] text-white rounded-xl px-6 py-3 font-mono text-sm hover:bg-[#20b858] active:scale-[0.98] transition-all shadow-[0_4px_14px_rgba(37,211,102,0.35)]"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <a
              href="mailto:hq@haikaitech.my?subject=Project%20enquiry"
              onClick={() => track('cta_clicked', 'email_cta_start')}
              className="inline-flex items-center gap-2 border border-slate-600 text-slate-300 rounded-xl px-6 py-3 font-mono text-sm hover:border-slate-400 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email us
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {steps.map((step) => (
              <div key={step.num} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#25D366]/20 text-[#25D366] font-mono text-sm flex items-center justify-center font-bold">{step.num}</span>
                <p className="text-sm text-slate-300 text-left">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartProjectSection;
