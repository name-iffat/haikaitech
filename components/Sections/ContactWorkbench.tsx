import React from 'react';
import { Building2, CalendarDays, ListChecks } from 'lucide-react';
import { CONTACTS, getIconForContact } from '../../constants';
import { track } from '../track';
import { bmHome } from '../../src/data/locales/bm-home';
import type { SiteLocale } from '../../src/utils/i18n';

const briefPrompts = [
  { icon: Building2, text: 'Your business and what you do' },
  { icon: ListChecks, text: 'What you’d like to build or improve' },
  { icon: CalendarDays, text: 'Your ideal timeline and budget' },
] as const;

export default function ContactWorkbench({ locale = 'en' }: { locale?: SiteLocale }) {
  const bm = locale === 'bm';
  const copy = bm ? bmHome.contact : null;
  const clayId = React.useId();
  return <section id="contact" className="workbench wb-contact" aria-labelledby="contact-title">
    <div className="wb-contact-inner">
      <div>
        <p className="wb-eyebrow">{copy?.eyebrow ?? 'Your next build'}</p>
        <h2 id="contact-title">{copy?.headline[0] ?? 'Got a'}<br /><span className="wb-idea-cloud"><svg viewBox="0 0 500 250" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <filter id={clayId} x="-15%" y="-20%" width="130%" height="150%" colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="soft" />
              <feOffset in="soft" dx="-5" dy="-8" result="shadeOffset" />
              <feComposite in="SourceAlpha" in2="shadeOffset" operator="out" result="shadeEdge" />
              <feFlood className="wb-clay-shade" floodOpacity=".30" />
              <feComposite in2="shadeEdge" operator="in" result="shade" />
              <feOffset in="soft" dx="4" dy="6" result="lightOffset" />
              <feComposite in="SourceAlpha" in2="lightOffset" operator="out" result="lightEdge" />
              <feFlood className="wb-clay-light" floodOpacity=".65" />
              <feComposite in2="lightEdge" operator="in" result="light" />
              <feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" seed="8" result="noise" />
              <feColorMatrix in="noise" type="saturate" values="0" />
              <feComponentTransfer><feFuncA type="linear" slope=".09" /></feComponentTransfer>
              <feComposite in2="SourceAlpha" operator="in" result="grain" />
              <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="shade" /><feMergeNode in="light" /><feMergeNode in="grain" /></feMerge>
            </filter>
          </defs>
          <path filter={`url(#${clayId})`} d="M77 208C25 218 5 170 36 139C-1 101 37 51 88 65C94 14 158 3 190 38C224-5 292 0 313 43C358 9 417 32 418 75C476 64 506 115 474 150C505 196 459 234 407 218C383 256 327 252 301 221C264 257 206 248 184 222C144 249 95 243 77 208Z" />
        </svg><span>{copy?.headline[1] ?? 'big idea?'}</span></span><br />{copy?.headline[2] ?? 'Let’s build it.'}</h2>
        <p className="wb-contact-description">{copy?.description ?? 'A new website, a smoother workflow, or software built around your business. Tell us what needs to work better.'}</p>
        <p className="wb-contact-note">{copy?.note ?? 'Rough sketches welcome.'}</p>
      </div>
      <div className="wb-contact-sheet">
        <span className="wb-tape" aria-hidden="true" />
        <p className="wb-eyebrow">{copy?.brief ?? 'Project brief / Start here'}</p>
        <h3>{copy?.question ? <>{copy.question[0]}<br />{copy.question[1]}</> : <>What are you<br />working on?</>}</h3>
        <ul className="wb-contact-prompts">
          {briefPrompts.map((prompt, index) => (
            <li key={prompt.text}><span aria-hidden="true"><prompt.icon size={20} strokeWidth={1.75} /></span>{copy?.prompts[index] ?? prompt.text}</li>
          ))}
        </ul>
        <div className="wb-contact-actions">
          {CONTACTS.filter(c => c.type === 'whatsapp' || c.type === 'email').map(contact => (
            <a key={contact.type} href={contact.type === 'whatsapp' && bm ? 'https://wa.me/60147533499?text=Salam%20HaikaiTech%2C%20saya%20ingin%20berbincang%20tentang%20projek.' : contact.href} target={contact.type === 'whatsapp' ? '_blank' : undefined} rel={contact.type === 'whatsapp' ? 'noopener noreferrer' : undefined} onClick={() => track('contact_clicked', contact.type)} className={contact.type === 'whatsapp' ? 'wb-button wb-primary' : 'wb-contact-email'}>
              {contact.type === 'whatsapp' ? copy?.whatsapp ?? 'Talk on WhatsApp' : contact.value}
            </a>
          ))}
        </div>
      </div>
      <nav className="wb-contact-elsewhere" aria-label={copy?.elsewhere ?? 'Find HaikaiTech elsewhere'}>
        <span>{copy?.elsewhere ?? 'Elsewhere on the web'}</span>
        {CONTACTS.filter(c => c.type !== 'whatsapp' && c.type !== 'email').map(contact => (
          <a key={contact.type} href={contact.href} target="_blank" rel="noopener noreferrer" onClick={() => track('contact_clicked', contact.type)}><span className="wb-contact-social-icon" aria-hidden="true">{getIconForContact(contact.type)}</span>{contact.label}</a>
        ))}
      </nav>
    </div>
  </section>;
}
