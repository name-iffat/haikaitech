import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { track } from './track';

interface Props {
  source?: 'footer' | 'blog' | 'toolkit';
}

const NewsletterForm: React.FC<Props> = ({ source = 'footer' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return;
    setStatus('sending');
    track('newsletter_subscribe', source);

    try {
      const res = await fetch('https://invoice.haikaitech.my/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <p className="font-mono text-xs text-emerald-600">Subscribed — thank you!</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@company.my"
        required
        className="flex-1 min-w-0 px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-sm font-mono rounded-md hover:bg-slate-800 disabled:opacity-50 transition-colors"
      >
        {status === 'sending' ? (
          <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        ) : (
          <Send className="w-3.5 h-3.5" />
        )}
        Subscribe
      </button>
      {status === 'error' && (
        <p className="absolute -bottom-5 left-0 font-mono text-[10px] text-red-500">Something went wrong — try again.</p>
      )}
    </form>
  );
};

export default NewsletterForm;
