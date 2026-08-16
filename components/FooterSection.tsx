import React from 'react';
import NewsletterForm from './NewsletterForm';

const FooterSection: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 py-12">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <p className="font-hand text-2xl text-slate-700">Practical notes for Malaysian SMEs</p>
        <p className="mt-1 text-sm text-slate-500 mb-4">Website pricing, lead-gen tactics & free tools — no spam, unsubscribe anytime.</p>
        <div className="max-w-sm mx-auto">
          <NewsletterForm source="footer" />
        </div>
        <p className="mt-6 text-xs text-slate-400 font-mono">We'll only send updates you asked for. See our <a href="/privacy-policy/" className="underline underline-offset-2 hover:text-slate-600">privacy policy</a>.</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm font-mono gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          &copy; {new Date().getFullYear()} HaikaiTech
        </div>
        <div className="flex items-center gap-2 text-xs" aria-label="Last updated">
          <span>Last updated</span>
          <time dateTime="2026-08-06">2026-08-06</time>
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
          className="inline-flex items-center gap-1.5 hover:text-slate-600 transition-colors py-2"
        >
          🔖 SSM: 202603149868 (CA0422517-K)
        </a>
        <a
          href="https://stripe.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-slate-600 transition-colors py-2"
        >
          🔒 Secure payments powered by Stripe
        </a>
        <span className="inline-flex items-center gap-1.5">🌍 Serving clients worldwide</span>
        <a href="/toolkit/" className="inline-flex items-center gap-1.5 font-medium text-slate-500 hover:text-slate-600 transition-colors py-2">🧰 Business Toolkit</a>
        <a href="/guide/" className="inline-flex items-center gap-1.5 font-medium text-slate-500 hover:text-slate-600 transition-colors py-2">📖 2026 Lead Generation Guide</a>
        <a href="/privacy-policy/" className="hover:text-slate-600 transition-colors py-2">Privacy Policy</a>
        <a href="/terms-of-service/" className="hover:text-slate-600 transition-colors py-2">Terms of Service</a>
        <a href="/refund-cancellation-policy/" className="hover:text-slate-600 transition-colors py-2">Refund Policy</a>
        <a
          href="mailto:hq@haikaitech.my"
          className="inline-flex items-center gap-1.5 hover:text-slate-600 transition-colors py-2"
        >
          ✉️ hq@haikaitech.my
        </a>
      </div>
    </footer>
  );
};

export default FooterSection;
