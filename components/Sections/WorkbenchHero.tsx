import React from 'react';
import { track } from '../track';
import { bmHome } from '../../src/data/locales/bm-home';
import type { SiteLocale } from '../../src/utils/i18n';

interface Props {
  websiteSrc: string;
  fuzzfloorSrc?: string;
  dashboardSrc?: string;
  tapeSrc?: string;
  pinSrc?: string;
  locale?: SiteLocale;
}

export default function WorkbenchHero({ websiteSrc, locale = 'en' }: Props) {
  const bm = locale === 'bm';
  const copy = bm ? bmHome.hero : null;
  return (
    <header id="home" className={`workbench wb-hero ${bm ? 'wb-hero--bm' : ''}`}>
      <div className="wb-copy">
        <p className="wb-eyebrow">{copy?.eyebrow ?? 'Penang-based • For Malaysian SMEs'}</p>
        <h1><span>{bm ? 'Laman web dan sistem' : 'Websites and systems'}</span> <span>{bm ? 'untuk PKS Malaysia.' : 'for Malaysian SMEs.'}</span></h1>
        <p className="wb-description">{copy?.description ?? 'From RM1,700 websites to RM3,500 stores. Chat on WhatsApp for a fast reply.'}</p>
        <div className="wb-actions">
          <a className="wb-button wb-primary" href={bm ? 'https://wa.me/60147533499?text=Salam%20HaikaiTech%2C%20saya%20datang%20dari%20hero%20laman%20utama%20dan%20ingin%20berbincang%20tentang%20projek.' : 'https://wa.me/60147533499?text=Hi%20HaikaiTech!%20I%20came%20from%20homepage%20hero%20and%20would%20love%20to%20discuss%20a%20project.'} target="_blank" rel="noopener noreferrer" onClick={() => track('cta_clicked', 'chat_whatsapp_hero')}>{copy?.start ?? 'Chat on WhatsApp'}</a>
          <a className="wb-button wb-secondary" href="#pricing" onClick={() => track('cta_clicked', 'view_pricing_hero')}>{bm ? 'Lihat harga' : 'See pricing'}</a>
        </div>
        <p className="wb-hero-proof">SSM Registered (202603149868) • Reply within 12 hours</p>
      </div>
      <div className="wb-projects wb-projects--single" aria-label={copy?.collage ?? 'From the HaikaiTech workshop'}>
        <a href="https://wirelesscctv.com.my/" target="_blank" rel="noopener noreferrer" className="wb-print wb-print-website wb-print--hero-single" aria-label={bm ? 'Lihat laman web HSS Wireless CCTV (dibuka di tab baharu)' : 'View HSS Wireless CCTV website (opens in a new tab)'}>
          <img src={websiteSrc} width={1280} height={960} fetchPriority="high" alt={copy?.hssAlt ?? 'HSS Wireless CCTV desktop website'} />
          <span className="wb-project-label">HSS Wireless CCTV / {bm ? 'Laman web' : 'Website'}</span>
        </a>
      </div>
    </header>
  );
}
