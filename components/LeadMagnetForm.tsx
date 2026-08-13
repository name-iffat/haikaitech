import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { track } from './track';

const LeadMagnetForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return;
    setStatus('sending');

    try {
      const res = await fetch('https://invoice.haikaitech.my/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'lead_magnet', magnet: 'guide-2026' }),
      });
      if (res.ok) track('lead_magnet_request', 'guide-2026');
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center">
        <p className="font-mono text-sm text-emerald-600">Check your inbox — your guide is on its way!</p>
        <p className="mt-2 text-xs text-slate-500">Also check your spam folder if it doesn't arrive within a few minutes.</p>
      </div>
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
          <Download className="w-3.5 h-3.5" />
        )}
        Get the guide
      </button>
      {status === 'error' && (
        <p className="absolute -bottom-5 left-0 font-mono text-[10px] text-red-500">Something went wrong — try again.</p>
      )}
    </form>
  );
};

export default LeadMagnetForm;