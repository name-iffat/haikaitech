import React from 'react';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import NewsletterForm from './NewsletterForm';
import { track } from './track';

interface Props {
  newsletterSource?: 'footer' | 'blog' | 'toolkit';
}

export default function FooterWorkbench({ newsletterSource = 'footer' }: Props) {
  return <footer className="workbench wb-footer" aria-label="HaikaiTech footer">
    <div className="wb-footer-top">
      <section className="wb-footer-newsletter" aria-labelledby="footer-newsletter-title">
        <h2 id="footer-newsletter-title">Practical notes for<br />Malaysian SMEs</h2>
        <p>Website pricing, lead-gen tactics &amp; free tools.</p>
        <p className="wb-footer-muted">No spam. Unsubscribe anytime.</p>
        <NewsletterForm source={newsletterSource} variant="workbench" />
        <p className="wb-footer-privacy">We'll only send updates you asked for. See our <a href="/privacy-policy/">privacy policy</a>.</p>
      </section>
      <nav aria-label="Footer explore" className="wb-footer-links">
        <h3>Explore</h3>
        <a href="/#projects">Work</a><a href="/services/">Services</a><a href="/#about">About</a><a href="/blog/">Insights</a>
      </nav>
      <div className="wb-footer-directory">
        <nav aria-label="Footer resources" className="wb-footer-links">
          <h3>Resources</h3><a href="/toolkit/">Business Toolkit</a><a href="/guide/">2026 Lead Generation Guide</a>
        </nav>
        <nav aria-label="Footer contact and social links" className="wb-footer-links">
          <h3>Elsewhere</h3>
          <a href="https://github.com/name-iffat" target="_blank" rel="noopener noreferrer"><Github aria-hidden="true" />GitHub</a>
          <a href="https://www.linkedin.com/in/iffathaikal/" target="_blank" rel="noopener noreferrer"><Linkedin aria-hidden="true" />LinkedIn</a>
          <a href="https://wa.me/60147533499?text=Hi%20HaikaiTech!%20I'd%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" onClick={() => track('contact_clicked', 'whatsapp')}><MessageCircle aria-hidden="true" />WhatsApp</a>
          <a href="mailto:hq@haikaitech.my" onClick={() => track('contact_clicked', 'email')}><Mail aria-hidden="true" />hq@haikaitech.my</a>
        </nav>
      </div>
    </div>
    <div className="wb-footer-signoff">
      <p className="wb-footer-note">Built for real work.</p>
      <a href="/#home" className="wb-footer-wordmark" aria-label="HaikaiTech home">
        <img src="/haikaitech-mark.png" width="86" height="86" alt="" aria-hidden="true" />
        <span>HAIKAITECH_</span>
      </a>
    </div>
    <div className="wb-footer-company">
      <div><p className="wb-footer-company-name">HaikaiTech Solutions</p><p>Penang, Malaysia</p><a href="https://www.ssm-einfo.my/" target="_blank" rel="noopener noreferrer">SSM 202603149868 (CA0422517-K)</a></div>
      <div className="wb-footer-payment"><a href="https://stripe.com" target="_blank" rel="noopener noreferrer">Secure payments powered by Stripe</a><p>Serving clients worldwide</p></div>
    </div>
    <div className="wb-footer-legal"><p>&copy; {new Date().getFullYear()} HaikaiTech</p><nav aria-label="Legal"><a href="/privacy-policy/">Privacy Policy</a><a href="/terms-of-service/">Terms of Service</a><a href="/refund-cancellation-policy/">Refund Policy</a></nav></div>
  </footer>;
}
