import { useMemo, useState } from 'react';
import { ArrowUpRight, Check, CircleHelp, Clock3 } from 'lucide-react';
import { formatMYR, umrahOffer, type UmrahPackageId } from '../data/umrah-offer';

const whatsappNumber = '60147533499';

function buildWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function UmrahPackageConfigurator() {
  const [selectedPackage, setSelectedPackage] = useState<UmrahPackageId>('starter');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const packageInfo = umrahOffer.packages.find((item) => item.id === selectedPackage)!;
  const availableAddOns = umrahOffer.addOns.filter((item) => item.availableFor.includes(selectedPackage as 'starter' | 'growth'));
  const selectedItems = availableAddOns.filter((item) => selectedAddOns.includes(item.id));

  const totals = useMemo(() => selectedItems.reduce((sum, item) => {
    if (item.amount === null) return sum;
    if (item.billing === 'monthly') sum.monthly += item.amount;
    else sum.oneTime += item.amount;
    return sum;
  }, { oneTime: 0, monthly: 0 }), [selectedItems]);

  const basePrice = packageInfo.price ?? 0;
  const oneTimeTotal = basePrice + totals.oneTime;
  const isProvisional = packageInfo.priceStatus === 'proposed' || selectedItems.length > 0;
  const hasUnpricedSelection = (!umrahOffer.developmentPreview && packageInfo.priceStatus === 'proposed') || selectedItems.some((item) => item.amount === null);
  const basePriceLabel = packageInfo.priceStatus === 'custom'
    ? 'Sebut harga'
    : packageInfo.price === null ? 'Belum dimuktamadkan' : formatMYR(packageInfo.price);
  const totalLabel = packageInfo.priceStatus === 'custom'
    ? 'Ikut skop'
    : hasUnpricedSelection ? 'Sebut harga' : formatMYR(oneTimeTotal);
  const addOnSummary = selectedItems.length
    ? selectedItems.map((item) => `${item.name}${item.amount === null ? '' : ` (${formatMYR(item.amount)}${item.billing === 'monthly' ? '/bulan' : ''})`}`).join(', ')
    : 'Tiada add-on';
  const estimateSummary = hasUnpricedSelection
    ? 'Harga Growth/add-on belum dimuktamadkan; minta sebut harga'
    : `Anggaran paparan: ${formatMYR(oneTimeTotal)} sekali${totals.monthly ? ` + ${formatMYR(totals.monthly)}/bulan` : ''}`;
  const message = packageInfo.priceStatus === 'custom'
    ? `Salam HaikaiTech! Saya berminat nak bincang pakej Booking Pro untuk agensi umrah. Boleh kita semak keperluan dan sebut harga?`
    : `Salam HaikaiTech! Saya berminat dengan pakej ${packageInfo.name} untuk website agensi umrah. Add-on: ${addOnSummary}. ${estimateSummary}. Jumlah ini bukan checkout atau sebut harga muktamad. Boleh kita semak skop dan slot dulu?`;
  const whatsappHref = buildWhatsAppLink(message);

  function toggleAddOn(id: string) {
    setSelectedAddOns((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function choosePackage(id: UmrahPackageId) {
    setSelectedPackage(id);
    if (id === 'booking-pro') setSelectedAddOns([]);
  }

  return (
    <div className="umrah-config" id="pilih-pakej">
      <div className="umrah-config__intro">
        <p className="umrah-kicker">01 / Pilih ikut cara kerja agensi</p>
        <h3>Tak pasti yang mana sesuai? Bandingkan dulu.</h3>
        <p>Starter untuk mula dengan laman yang jelas. Growth dan Booking Pro sesuai bila kandungan atau proses tempahan makin kompleks.</p>
      </div>

      <div className="umrah-package-grid" role="group" aria-label="Pilih pakej website">
        {umrahOffer.packages.map((item) => {
          const selected = selectedPackage === item.id;
          const provisional = item.priceStatus === 'proposed';
          return (
            <button
              type="button"
              className={`umrah-package ${item.featured ? 'umrah-package--featured' : ''} ${selected ? 'is-selected' : ''}`}
              key={item.id}
              aria-pressed={selected}
              onClick={() => choosePackage(item.id)}
            >
              <span className="umrah-package__topline"><span>{item.eyebrow}</span>{item.featured && <span className="umrah-package__badge">CADANGAN</span>}</span>
              <span className="umrah-package__name">{item.name}</span>
              <span className="umrah-package__price">
                {item.price === null ? (item.priceStatus === 'proposed' ? 'Belum dimuktamadkan' : 'Sebut harga') : formatMYR(item.price)}
                {provisional && <small>cadangan · belum diluluskan</small>}
                {item.priceStatus === 'approved' && <small>harga asas tetap</small>}
                {item.priceStatus === 'custom' && <small>ikut skop sistem</small>}
              </span>
              <span className="umrah-package__description">{item.description}</span>
              <span className="umrah-package__features">
                {item.features.slice(0, 4).map((feature) => <span key={feature}><Check aria-hidden="true" />{feature}</span>)}
                {item.features.length > 4 && <span className="umrah-package__more">+ {item.features.length - 4} ciri lagi</span>}
              </span>
              <span className="umrah-package__select">{selected ? 'Sedang dipilih' : 'Pilih pakej'}<span aria-hidden="true">{selected ? '✓' : '↗'}</span></span>
            </button>
          );
        })}
      </div>

      <div className="umrah-config__details">
        <div className="umrah-addons">
          <div className="umrah-addons__heading">
            <div><p className="umrah-kicker">02 / Tambah jika perlu</p><h3>Add-on pilihan</h3></div>
            <span className="umrah-draft-tag"><CircleHelp aria-hidden="true" />{umrahOffer.developmentPreview ? 'Contoh harga sementara' : 'Harga belum ditetapkan'}</span>
          </div>
          {selectedPackage === 'booking-pro' ? (
            <div className="umrah-addons__quote"><p>Booking Pro perlukan skop khas, jadi add-on ini tak dikira untuk pakej tersebut.</p><p>Kita bincang aliran tempahan, pengguna dan integrasi yang diperlukan sebelum sebut harga.</p></div>
          ) : (
            <div className="umrah-addon-list">
              {availableAddOns.map((item) => (
                <label className={`umrah-addon ${selectedAddOns.includes(item.id) ? 'is-checked' : ''}`} key={item.id}>
                  <input type="checkbox" checked={selectedAddOns.includes(item.id)} onChange={() => toggleAddOn(item.id)} />
                  <span className="umrah-addon__check"><Check aria-hidden="true" /></span>
                  <span className="umrah-addon__copy"><strong>{item.name}</strong><small>{item.description}</small></span>
                  <span className="umrah-addon__price">{item.amount === null ? 'Sebut harga' : formatMYR(item.amount)}<small>{item.amount === null ? 'belum ditetapkan' : item.billing === 'monthly' ? '/bulan' : 'sekali'}</small></span>
                </label>
              ))}
            </div>
          )}
          <p className="umrah-addons__note">{umrahOffer.developmentPreview ? 'Nilai ini hanya untuk demo pembangunan. Harga add-on dan skop Growth belum diluluskan untuk jualan; kami sahkan melalui sebut harga bertulis.' : 'Harga add-on dan skop Growth belum dimuktamadkan. Kami sahkan melalui sebut harga bertulis.'}</p>
        </div>

        <aside className="umrah-total" aria-live="polite" aria-atomic="true">
          <div className="umrah-total__label"><span>Ringkasan pilihan</span><span>{isProvisional ? 'ANGGARAN DEMO' : 'HARGA ASAS'}</span></div>
          <div className="umrah-total__line"><span>{packageInfo.name}</span><strong>{basePriceLabel}</strong></div>
          {selectedItems.filter((item) => item.billing === 'one-time').map((item) => <div className="umrah-total__line umrah-total__line--sub" key={item.id}><span>{item.name}</span><strong>{item.amount === null ? 'Sebut harga' : formatMYR(item.amount)}</strong></div>)}
          <div className="umrah-total__sum"><span>Jumlah sekali bayar</span><strong>{totalLabel}</strong></div>
          {selectedItems.filter((item) => item.billing === 'monthly').map((item) => <div className="umrah-total__recurring" key={item.id}><span><Clock3 aria-hidden="true" />{item.name}</span><strong>{item.amount === null ? 'Sebut harga' : `${formatMYR(item.amount)}/bulan`}</strong></div>)}
          <p className="umrah-total__scope">{packageInfo.limits.join(' · ')}</p>
          <a className="wb-button wb-primary umrah-total__cta" href={whatsappHref} target="_blank" rel="noopener noreferrer" data-offer-cta={`umrah-${packageInfo.id}`}>
            {packageInfo.priceStatus === 'custom' ? 'Minta sebut harga' : 'Semak pakej di WhatsApp'}<ArrowUpRight aria-hidden="true" />
          </a>
          <p className="umrah-total__disclaimer">Checkout online belum dibuka. WhatsApp untuk semak skop dan ketersediaan dahulu.</p>
          {isProvisional && <p className="umrah-total__warning">{umrahOffer.developmentPreview ? 'Jumlah demo dengan label cadangan bukan harga akhir atau janji untuk menerima pesanan pada harga ini.' : 'Harga Growth dan add-on belum dimuktamadkan; kami sahkan melalui sebut harga bertulis.'}</p>}
        </aside>
      </div>
    </div>
  );
}
