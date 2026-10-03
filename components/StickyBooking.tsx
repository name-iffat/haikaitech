import React from 'react';
import { Mail, MessageCircle, Plus, X } from 'lucide-react';
import { track } from './track';

const WHATSAPP_NUMBER = '60147533499';
const WHATSAPP_TEXT = encodeURIComponent(
  'Hi HaikaiTech! I came across your portfolio (haikaitech.my) and would love to discuss a project.'
);

const StickyBooking: React.FC<{ locale?: 'en' | 'bm' }> = ({ locale = 'en' }) => {
  const bm = locale === 'bm';
  const whatsappText = bm
    ? encodeURIComponent('Salam HaikaiTech, saya melihat portfolio anda dan ingin berbincang tentang projek.')
    : WHATSAPP_TEXT;
  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const launcherRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const onScroll = () => {
      const shouldShow = window.scrollY > 500;
      setShow(shouldShow);
      if (!shouldShow) setOpen(false);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!launcherRef.current?.contains(event.target as Node)) setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !open) return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={launcherRef}
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <div
        id="contact-launcher-actions"
        inert={!open}
        className={`flex flex-col items-end gap-2 transition-[opacity,transform,visibility] duration-150 ease-out motion-reduce:transition-none ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0 pointer-events-none'
        }`}
      >
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={open ? 0 : -1}
          onClick={() => track('cta_clicked', 'sticky_whatsapp')}
          className="flex min-h-11 items-center gap-2 rounded-full border border-blueprint/30 bg-paper/90 px-4 font-mono text-sm font-medium text-blueprint shadow-lg backdrop-blur-md transition-[background-color,transform] duration-100 ease-out hover:bg-paper hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blueprint motion-reduce:transition-none"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href="mailto:hq@haikaitech.my?subject=Project%20enquiry"
          tabIndex={open ? 0 : -1}
          onClick={() => track('cta_clicked', 'sticky_email')}
          className="flex min-h-11 items-center gap-2 rounded-full border border-blueprint/30 bg-paper/90 px-4 font-mono text-sm font-medium text-blueprint shadow-lg backdrop-blur-md transition-[background-color,transform] duration-100 ease-out hover:bg-paper hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blueprint motion-reduce:transition-none"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          {bm ? 'E-mel' : 'Email us'}
        </a>
      </div>
      <button
        ref={triggerRef}
        type="button"
        aria-controls="contact-launcher-actions"
        aria-expanded={open}
        aria-label={open ? bm ? 'Tutup pilihan hubungan' : 'Close contact options' : bm ? 'Bincang projek' : 'Start a project'}
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="group flex h-[60px] w-64 items-center justify-center overflow-hidden rounded-full border border-blueprint/30 bg-paper/80 pl-2.5 pr-3 text-left text-charcoal shadow-lg backdrop-blur-xl transition-[background-color,transform,box-shadow] duration-100 ease-out hover:-translate-y-0.5 hover:bg-paper/95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blueprint motion-reduce:transition-none"
      >
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blueprint text-paper transition-transform duration-100 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          aria-hidden="true"
        >
          <MessageCircle className="h-5 w-5" />
        </span>
        <div className="flex flex-1 items-center gap-3 overflow-hidden pl-3">
          <span className="min-w-0 flex-1 whitespace-nowrap">
            <span className="block text-[15px] font-semibold leading-tight">{bm ? 'Bincang projek' : 'Start a project'}</span>
            <span className="mt-0.5 block font-sans text-xs leading-tight text-slate-600">{bm ? 'WhatsApp atau e-mel' : 'WhatsApp or email'}</span>
          </span>
          <span className="h-9 w-px shrink-0 bg-blueprint/20" aria-hidden="true" />
          <span className="flex h-9 w-7 shrink-0 items-center justify-center text-blueprint" aria-hidden="true">
            {open ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </span>
        </div>
      </button>
    </div>
  );
};

export default StickyBooking;
