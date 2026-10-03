import React from 'react';
import { track } from '../track';
import { bmHome } from '../../src/data/locales/bm-home';
import type { SiteLocale } from '../../src/utils/i18n';

interface Props {
  websiteSrc: string;
  fuzzfloorSrc: string;
  dashboardSrc: string;
  tapeSrc: string;
  pinSrc: string;
  locale?: SiteLocale;
}

export default function WorkbenchHero({ websiteSrc, fuzzfloorSrc, dashboardSrc, tapeSrc, pinSrc, locale = 'en' }: Props) {
  const bm = locale === 'bm';
  const copy = bm ? bmHome.hero : null;
  return (
    <header id="home" className={`workbench wb-hero ${bm ? 'wb-hero--bm' : ''}`}>
      <div className="wb-copy">
        <p className="wb-eyebrow">{copy?.eyebrow ?? 'Founder-led digital engineering studio'}</p>
        <h1><span>{copy?.headline[0] ?? 'Built around'}</span> <span>{copy?.headline[1] ?? 'your business.'}</span></h1>
        <p className="wb-description">{copy?.description ?? 'Websites, business systems and digital products for Malaysian businesses.'}</p>
        <div className="wb-actions">
          <a className="wb-button wb-primary" href={bm ? 'https://wa.me/60147533499?text=Salam%20HaikaiTech%2C%20saya%20ingin%20berbincang%20tentang%20projek.' : 'https://wa.me/60147533499?text=Hi%20HaikaiTech!%20I%20would%20love%20to%20discuss%20a%20project.'} target="_blank" rel="noopener noreferrer" onClick={() => track('cta_clicked', 'chat_whatsapp_hero')}>{copy?.start ?? 'Start a project'}</a>
          <a className="wb-button wb-secondary" href="#projects" onClick={() => track('cta_clicked', 'view_work_hero')}>{copy?.work ?? 'Explore work'}</a>
        </div>
      </div>
      <div className="wb-projects" aria-label={copy?.collage ?? 'From the HaikaiTech workshop'}>
        <a href="https://wirelesscctv.com.my/" target="_blank" rel="noopener noreferrer" className="wb-print wb-print-website" aria-label={bm ? 'Lihat laman web HSS Wireless CCTV (dibuka di tab baharu)' : 'View HSS Wireless CCTV website (opens in a new tab)'}>
          <img className="wb-tape" src={tapeSrc} width={360} height={120} loading="eager" alt="" />
          <img src={websiteSrc} width={1280} height={960} fetchPriority="high" alt={copy?.hssAlt ?? 'HSS Wireless CCTV desktop website'} />
          <span className="wb-project-label">HSS Wireless CCTV / {bm ? 'Laman web' : 'Website'}</span>
        </a>
        <a href="https://mzdemo.haikaitech.my/" target="_blank" rel="noopener noreferrer" className="wb-print wb-print-dashboard" aria-label={bm ? 'Teroka demo sistem pengurusan tenaga kerja (dibuka di tab baharu)' : 'Explore the workforce management demo (opens in a new tab)'}>
          <img className="wb-hero-pin" src={pinSrc} width={120} height={100} loading="eager" alt="" />
          <img src={dashboardSrc} width={1440} height={900} loading="eager" alt={copy?.workforceAlt ?? 'MZE Worker System demo dashboard with workforce summaries and permit status'} />
          <span className="wb-project-label">{bm ? 'Pengurusan tenaga kerja' : 'Workforce management'} / Demo</span>
        </a>
        <a href="/projects/fuzzfloor/" className="wb-print wb-print-fuzz" aria-label={bm ? 'Lihat projek Fuzzfloor; butiran projek dalam Bahasa Inggeris' : 'View Fuzzfloor project'}>
          <img src={fuzzfloorSrc} width={430} height={860} loading="eager" alt={bm ? 'Laman web mudah alih Fuzzfloor dengan servis lantai dan pilihan pertanyaan projek' : 'Fuzzfloor mobile website with its flooring services and project enquiry actions'} />
          <span className="wb-project-label">Fuzzfloor / {bm ? 'Mudah alih · EN' : 'Mobile'}</span>
        </a>
        <span className="wb-note">{copy?.workNote[0] ?? 'built for'}<br />{copy?.workNote[1] ?? 'real work.'}<svg aria-hidden="true" viewBox="0 0 70 70" fill="none"><path d="M52 5C57 32 30 48 12 56m0 0 5-17m-5 17 20-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
      </div>
      <p className="wb-location"><span>{copy?.studio ?? 'Founder-led studio'}</span><span>{copy?.location ?? 'Penang, Malaysia'}</span><span><i aria-hidden="true" />{copy?.status ?? 'Accepting projects'}</span></p>
    </header>
  );
}
