import { useState } from 'react';
import { ArrowUpRight, Smartphone, Monitor } from 'lucide-react';

interface Props {
  imageSrc: string;
  liveUrl: string;
}

export default function UmrahSitePreview({ imageSrc, liveUrl }: Props) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className={`umrah-preview umrah-preview--${device}`}>
      <div className="umrah-preview__toolbar">
        <div className="umrah-preview__browser-dots" aria-hidden="true"><i /><i /><i /></div>
        <span className="umrah-preview__url">adyumrahajj.com</span>
        <div className="umrah-preview__devices" role="group" aria-label="Saiz paparan laman">
          <button type="button" onClick={() => setDevice('desktop')} aria-pressed={device === 'desktop'} aria-label="Papar saiz desktop"><Monitor aria-hidden="true" /><span>Desktop</span></button>
          <button type="button" onClick={() => setDevice('mobile')} aria-pressed={device === 'mobile'} aria-label="Papar saiz telefon"><Smartphone aria-hidden="true" /><span>Telefon</span></button>
        </div>
      </div>
      <div className="umrah-preview__stage">
        <div className="umrah-preview__screen">
          {device === 'desktop' ? (
            <div className="umrah-preview__image-wrap"><img src={imageSrc} alt="Paparan laman sebenar Ady Umrah Hajj, projek website agensi umrah HaikaiTech" loading="lazy" /></div>
          ) : (
            <div className="umrah-mobile-demo" aria-label="Konsep susun atur website agensi umrah untuk telefon">
              <div className="umrah-mobile-demo__bar"><span>CONTOH PAPARAN</span><span>haikaitech.my</span><span>•••</span></div>
              <header><span className="umrah-mobile-demo__mark">HT</span><strong>Agensi Umrah Anda</strong><span aria-hidden="true">☰</span></header>
              <div className="umrah-mobile-demo__hero"><span>PAKEJ & TAWARAN</span><h2>Perjalanan umrah anda, bermula dengan maklumat yang jelas.</h2><p>Susun pakej, tarikh dan butiran perjalanan untuk bakal jemaah semak.</p><a href="#pakej">Lihat pakej <span aria-hidden="true">↓</span></a></div>
              <div className="umrah-mobile-demo__card"><span>CONTOH KAD PAKEJ</span><strong>Nama pakej umrah</strong><p>Tempoh · Tarikh berlepas · Butiran termasuk</p><div>Harga dan maklumat ditetapkan oleh agensi</div></div>
              <div className="umrah-mobile-demo__note">Konsep contoh · Gantikan dengan maklumat agensi anda</div>
            </div>
          )}
        </div>
      </div>
      <div className="umrah-preview__caption">
        <p><strong>Contoh kerja sebenar:</strong> Ady Umrah Hajj</p>
        <a href={liveUrl} target="_blank" rel="noopener noreferrer">Lawat website <ArrowUpRight aria-hidden="true" /></a>
      </div>
      <p className="umrah-preview__scope">Desktop memaparkan screenshot projek sebenar. Paparan telefon ialah konsep susun atur generik, bukan website Ady Umrah Hajj atau janji ciri dalam Starter.</p>
    </div>
  );
}
