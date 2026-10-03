import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { track } from './track';

interface Props {
  source?: 'footer' | 'blog' | 'toolkit';
  variant?: 'legacy' | 'workbench';
  locale?: 'en' | 'bm';
}

const NewsletterForm: React.FC<Props> = ({ source = 'footer', variant = 'legacy', locale = 'en' }) => {
  const bm = locale === 'bm';
  const fieldId = React.useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return;
    setStatus('sending');

    try {
      const res = await fetch('https://invoice.haikaitech.my/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source }),
      });
      if (res.ok) track('newsletter_subscribe', source);
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (variant === 'workbench') return (
    <div className="wb-newsletter">
      {status !== 'success' && <form onSubmit={handleSubmit} aria-busy={status === 'sending'}>
        <label htmlFor={fieldId}>{bm ? 'Alamat e-mel' : 'Email address'} <span>({bm ? 'wajib' : 'required'})</span></label>
        <div className="wb-newsletter-fields">
          <input id={fieldId} name="email" type="email" autoComplete="email" spellCheck={false} placeholder="you@company.my" required value={email} onChange={e => setEmail(e.target.value)} aria-describedby={status === 'error' ? `${fieldId}-status` : undefined} />
          <button type="submit" className="wb-button wb-primary wb-button--painted" disabled={status === 'sending'}><span>{status === 'sending' ? bm ? 'Menghantar…' : 'Sending…' : bm ? 'Langgan' : 'Subscribe'}</span></button>
        </div>
      </form>}
      <p id={`${fieldId}-status`} role="status" className="wb-newsletter-status">{status === 'success' ? bm ? 'Langganan berjaya — terima kasih!' : 'Subscribed — thank you!' : status === 'error' ? bm ? 'Tidak dapat melanggan. Sila cuba lagi; alamat e-mel anda masih di sini.' : 'Could not subscribe. Please try again; your email is still here.' : ''}</p>
    </div>
  );

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
