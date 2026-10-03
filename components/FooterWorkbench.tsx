import React from 'react';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import NewsletterForm from './NewsletterForm';
import { track } from './track';
import { bmHome } from '../src/data/locales/bm-home';
import { localizeHref, type SiteLocale } from '../src/utils/i18n';

interface Props {
  newsletterSource?: 'footer' | 'blog' | 'toolkit';
  locale?: SiteLocale;
}

export default function FooterWorkbench({ newsletterSource = 'footer', locale = 'en' }: Props) {
  const bm = locale === 'bm';
  const copy = bm ? bmHome.footer : null;
  return <footer className="workbench wb-footer" aria-label="HaikaiTech footer">
    <div className="wb-footer-top">
      <section className="wb-footer-newsletter" aria-labelledby="footer-newsletter-title">
        <h2 id="footer-newsletter-title">{copy ? <>{copy.title[0]}<br />{copy.title[1]}</> : <>Practical notes for<br />Malaysian SMEs</>}</h2>
        <p>{copy?.description ?? 'Website pricing, lead-gen tactics & free tools.'}</p>
        <p className="wb-footer-muted">{copy?.muted ?? 'No spam. Unsubscribe anytime.'}</p>
        <NewsletterForm source={newsletterSource} variant="workbench" locale={locale} />
        <p className="wb-footer-privacy">{copy?.privacy ?? "We'll only send updates you asked for. See our"} <a href="/privacy-policy/">{copy?.privacyLink ?? 'privacy policy'}</a>.</p>
      </section>
      <nav aria-label="Footer explore" className="wb-footer-links">
        <h3>{copy?.explore ?? 'Explore'}</h3>
        <a href={localizeHref('/#projects', locale)}>{copy?.work ?? 'Work'}</a><a href={localizeHref('/services/', locale)}>{copy?.services ?? 'Services'}</a><a href={localizeHref('/#about', locale)}>{copy?.about ?? 'About'}</a><a href="/blog/">{copy?.insights ?? 'Insights'}</a>
      </nav>
      <div className="wb-footer-directory">
        <nav aria-label="Footer resources" className="wb-footer-links">
          <h3>{copy?.resources ?? 'Resources'}</h3><a href="/toolkit/">{copy?.toolkit ?? 'Business Toolkit'}</a><a href="/guide/">{copy?.guide ?? '2026 Lead Generation Guide'}</a>
        </nav>
        <nav aria-label="Footer contact and social links" className="wb-footer-links">
          <h3>{copy?.elsewhere ?? 'Elsewhere'}</h3>
          <a href="https://github.com/name-iffat" target="_blank" rel="noopener noreferrer"><Github aria-hidden="true" />GitHub</a>
          <a href="https://www.linkedin.com/in/iffathaikal/" target="_blank" rel="noopener noreferrer"><Linkedin aria-hidden="true" />LinkedIn</a>
          <a href="https://wa.me/60147533499?text=Hi%20HaikaiTech!%20I'd%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" onClick={() => track('contact_clicked', 'whatsapp')}><MessageCircle aria-hidden="true" />WhatsApp</a>
          <a href="mailto:hq@haikaitech.my" onClick={() => track('contact_clicked', 'email')}><Mail aria-hidden="true" />hq@haikaitech.my</a>
        </nav>
      </div>
    </div>
    <div className="wb-footer-signoff">
      <p className="wb-footer-note">{copy?.note ?? 'Built for real work.'}</p>
      <a href={localizeHref('/#home', locale)} className="wb-footer-wordmark" aria-label={copy?.home ?? 'HaikaiTech home'}>
        <img src="/haikaitech-mark.png" width="86" height="86" alt="" aria-hidden="true" />
        <span>HAIKAITECH_</span>
      </a>
    </div>
    <div className="wb-footer-company">
      <div><p className="wb-footer-company-name">{copy?.company ?? 'HaikaiTech Solutions'}</p><p>{copy?.city ?? 'Penang, Malaysia'}</p><a href="https://www.ssm-einfo.my/" target="_blank" rel="noopener noreferrer">SSM 202603149868 (CA0422517-K)</a></div>
      <div className="wb-footer-payment"><a href="https://stripe.com" target="_blank" rel="noopener noreferrer">{copy?.stripe ?? 'Secure payments powered by Stripe'}</a><p>{copy?.worldwide ?? 'Serving clients worldwide'}</p></div>
    </div>
    <div className="wb-footer-legal"><p>&copy; {new Date().getFullYear()} HaikaiTech</p><nav aria-label={copy?.legal ?? 'Legal'}><a href="/privacy-policy/">{bm ? 'Dasar privasi (EN)' : 'Privacy Policy'}</a><a href="/terms-of-service/">{bm ? 'Terma perkhidmatan (EN)' : 'Terms of Service'}</a><a href="/refund-cancellation-policy/">{bm ? 'Polisi bayaran balik (EN)' : 'Refund Policy'}</a></nav></div>
  </footer>;
}
