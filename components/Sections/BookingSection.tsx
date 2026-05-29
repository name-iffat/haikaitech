import React from 'react';
import CalBooking from '../CalBooking';
import { DoodleStar, Tape, Sticker, ArrowSketch } from '../Decorations';
import { track } from '../track';

const BookingSection: React.FC = () => {
  React.useEffect(() => {
    const el = document.getElementById('booking');
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        track('section_viewed', 'booking');
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="booking" className="mb-12 scroll-mt-28">
      <div className="bg-white p-8 md:p-16 rounded-2xl border border-slate-200 shadow-sm text-center relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

        <DoodleStar className="top-8 left-8 text-blue-200 hidden lg:block" />
        <DoodleStar className="top-16 right-16 text-yellow-200 hidden lg:block" />
        <Tape className="-top-4 right-1/2 translate-x-1/2 w-48 rotate-2" />
        <Tape className="bottom-4 -left-4 w-32 -rotate-12 hidden md:block" />
        <Sticker className="top-6 right-6 w-20 h-20 rotate-12 bg-blue-300 border-slate-900 text-center text-xs leading-tight p-2 z-10">
          Book <br /> Now!
        </Sticker>
        <ArrowSketch className="hidden md:block text-slate-300 bottom-8 left-8 transform rotate-45" />

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 font-sans" onClick={() => track('cta_clicked', 'book_a_call_heading')}>Book a Call</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto font-hand text-lg">
            Schedule a 30-minute call to discuss your project ideas, collaboration opportunities, or just chat about tech.
          </p>
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden border-2 border-slate-200 shadow-lg" style={{height: "600px"}}>
            <CalBooking />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
