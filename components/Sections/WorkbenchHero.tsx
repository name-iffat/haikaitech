import React from 'react';
import { track } from '../track';

interface Props {
  websiteSrc: string;
  fuzzfloorSrc: string;
  dashboardSrc: string;
  tapeSrc: string;
  pinSrc: string;
}

export default function WorkbenchHero({ websiteSrc, fuzzfloorSrc, dashboardSrc, tapeSrc, pinSrc }: Props) {
  return (
    <header id="home" className="workbench wb-hero">
      <div className="wb-copy">
        <p className="wb-eyebrow">Founder-led digital engineering studio</p>
        <h1><span>Built around</span> <span>your business.</span></h1>
        <p className="wb-description">Websites, business systems and digital products for Malaysian businesses.</p>
        <div className="wb-actions">
          <a className="wb-button wb-primary" href="https://wa.me/60147533499?text=Hi%20HaikaiTech!%20I%20would%20love%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" onClick={() => track('cta_clicked', 'chat_whatsapp_hero')}>Start a project</a>
          <a className="wb-button wb-secondary" href="#projects" onClick={() => track('cta_clicked', 'view_work_hero')}>Explore work</a>
        </div>
      </div>
      <div className="wb-projects" aria-label="From the HaikaiTech workshop">
        <a href="https://wirelesscctv.com.my/" target="_blank" rel="noopener noreferrer" className="wb-print wb-print-website" aria-label="View HSS Wireless CCTV website (opens in a new tab)">
          <img className="wb-tape" src={tapeSrc} width={360} height={120} loading="eager" alt="" />
          <img src={websiteSrc} width={1280} height={960} fetchPriority="high" alt="HSS Wireless CCTV desktop website" />
          <span className="wb-project-label">HSS Wireless CCTV / Website</span>
        </a>
        <a href="https://mzdemo.haikaitech.my/" target="_blank" rel="noopener noreferrer" className="wb-print wb-print-dashboard" aria-label="Explore the workforce management demo (opens in a new tab)">
          <img className="wb-hero-pin" src={pinSrc} width={120} height={100} loading="eager" alt="" />
          <img src={dashboardSrc} width={1440} height={900} loading="eager" alt="MZE Worker System demo dashboard with workforce summaries and permit status" />
          <span className="wb-project-label">Workforce management / Demo</span>
        </a>
        <a href="/projects/fuzzfloor/" className="wb-print wb-print-fuzz" aria-label="View Fuzzfloor project">
          <img src={fuzzfloorSrc} width={430} height={860} loading="eager" alt="Fuzzfloor mobile website with its flooring services and project enquiry actions" />
          <span className="wb-project-label">Fuzzfloor / Mobile</span>
        </a>
        <span className="wb-note">built for<br />real work.<svg aria-hidden="true" viewBox="0 0 70 70" fill="none"><path d="M52 5C57 32 30 48 12 56m0 0 5-17m-5 17 20-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
      </div>
      <p className="wb-location"><span>Founder-led studio</span><span>Penang, Malaysia</span><span><i aria-hidden="true" />Accepting projects</span></p>
    </header>
  );
}
