import React from 'react';

const FooterSection: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm font-mono gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          &copy; {new Date().getFullYear()} HaikaiTech
        </div>
        <div className="flex gap-6">
          <a href="https://github.com/name-iffat" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 cursor-pointer transition-colors">Github</a>
          <a href="https://www.linkedin.com/in/iffathaikal/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 cursor-pointer transition-colors">LinkedIn</a>
          <span className="hover:text-slate-600 cursor-pointer transition-colors">Resume</span>
          <a
            href={`https://wa.me/60147533499?text=${encodeURIComponent('Hi HaikaiTech! I came across your portfolio (haikaitech.my) and would love to discuss a project.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-600 cursor-pointer transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="my-6 border-t border-dashed border-slate-200" />

      <div className="flex flex-wrap justify-center gap-x-8 gap-y-1.5 text-xs font-mono text-slate-400">
        <span className="inline-flex items-center gap-1.5 font-medium text-slate-500">🇲🇾 HAIKAITECH SOLUTIONS — Registered in Malaysia</span>
        <a
          href="https://www.ssm-einfo.my/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-slate-600 transition-colors"
        >
          🔖 SSM: 202603149868 (CA0422517-K)
        </a>
        <a
          href="https://stripe.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-slate-600 transition-colors"
        >
          🔒 Secure payments powered by Stripe
        </a>
        <span className="inline-flex items-center gap-1.5">🌍 Serving clients worldwide</span>
        <a href="/privacy-policy/" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
        <a href="/terms-of-service/" className="hover:text-slate-600 transition-colors">Terms of Service</a>
        <a href="/refund-cancellation-policy/" className="hover:text-slate-600 transition-colors">Refund Policy</a>
        <a
          href="mailto:hq@haikaitech.my"
          className="inline-flex items-center gap-1.5 hover:text-slate-600 transition-colors"
        >
          ✉️ hq@haikaitech.my
        </a>
      </div>
    </footer>
  );
};

export default FooterSection;
