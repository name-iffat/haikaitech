import React from 'react';
import { Calendar, MessageCircle, ArrowUp } from 'lucide-react';
import { track } from './track';

const WHATSAPP_NUMBER = '60147533499';
const WHATSAPP_TEXT = encodeURIComponent(
  'Hi HaikaiTech! I came across your portfolio (haikaitech.my) and would love to discuss a project.'
);

const StickyBooking: React.FC = () => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('cta_clicked', 'sticky_whatsapp')}
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 px-5 py-3 bg-green-500 text-white font-medium rounded-full shadow-lg hover:bg-green-600 hover:-translate-y-1 transition-all duration-300 font-hand text-lg ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <MessageCircle className="w-5 h-5" />
        WhatsApp
      </a>
      <a
        href="#booking"
        onClick={() => track('cta_clicked', 'sticky_book_call')}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-slate-900 text-white font-medium rounded-full shadow-lg hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 font-hand text-lg ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <Calendar className="w-5 h-5" />
        Book a Call
        <ArrowUp className="w-4 h-4 rotate-45" />
      </a>
    </>
  );
};

export default StickyBooking;
