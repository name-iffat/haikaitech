export type UmrahPackageId = 'starter' | 'growth' | 'booking-pro';
export type AddOnBilling = 'one-time' | 'monthly';

export interface UmrahPackage {
  id: UmrahPackageId;
  name: string;
  eyebrow: string;
  price: number | null;
  priceStatus: 'approved' | 'proposed' | 'custom';
  description: string;
  features: string[];
  limits: string[];
  featured?: boolean;
}

export interface UmrahAddOn {
  id: string;
  name: string;
  description: string;
  amount: number | null;
  billing: AddOnBilling;
  availableFor: Exclude<UmrahPackageId, 'booking-pro'>[];
  provisional: true;
}

/**
 * Commercial preview values only. Growth limits and all add-on prices are
 * pending approval. Never use this browser-side catalog to create a payment.
 */
export const umrahOffer = {
  currency: 'MYR',
  developmentPreview: import.meta.env.DEV,
  checkoutEnabled: false,
  packages: [
    {
      id: 'starter',
      name: 'Starter',
      eyebrow: 'Untuk mula dengan kemas',
      price: 1700,
      priceStatus: 'approved',
      description: 'Website satu halaman supaya bakal jemaah mudah semak maklumat dan hubungi agensi anda.',
      features: [
        'Website custom satu halaman',
        'Sehingga 5 bahagian kandungan',
        'Paparan pakej umrah dan promosi',
        'Reka bentuk responsif untuk telefon dan desktop',
        'Integrasi pertanyaan WhatsApp',
        'SEO dan AEO asas',
        'Optimasi prestasi, SSL dan deployment',
        'Hosting standard dan domain layak selama 1 tahun',
        '5 kemas kini kecil kandungan selepas launch',
      ],
      limits: ['Tiada tempahan masa nyata atau kutipan bayaran jemaah', 'Tiada CRM atau dashboard admin kompleks'],
    },
    {
      id: 'growth',
      name: 'Growth',
      eyebrow: 'Untuk kandungan yang kerap berubah',
      price: import.meta.env.DEV ? 2500 : null,
      priceStatus: 'proposed',
      description: 'Cadangan untuk agensi yang mahu kemas kini pakej, tarikh dan promosi sendiri.',
      features: [
        'Semua ciri Starter',
        'Website berbilang halaman',
        'CMS untuk urus kandungan',
        'Senarai pakej yang boleh dikemas kini',
        'Maklumat pakej, harga dan tarikh berlepas',
        'Pengurusan promosi',
        'Borang pertanyaan dan tangkapan lead asas',
        'Panel admin untuk kandungan',
      ],
      limits: ['Had halaman dan jumlah pakej belum ditetapkan'],
      featured: true,
    },
    {
      id: 'booking-pro',
      name: 'Booking Pro',
      eyebrow: 'Untuk aliran tempahan khas',
      price: null,
      priceStatus: 'custom',
      description: 'Untuk sistem tempahan dan operasi yang perlu dibina ikut proses agensi anda.',
      features: [
        'Aliran tempahan pelanggan',
        'Urus tarikh berlepas dan slot',
        'Pangkalan data pelanggan atau CRM',
        'Integrasi bayaran online',
        'Status tempahan dan notifikasi',
        'Dashboard pengurusan, dokumen dan laporan',
      ],
      limits: ['Skop, jadual dan harga disediakan melalui sebut harga'],
    },
  ] satisfies UmrahPackage[],
  addOns: [
    { id: 'extra-page', name: 'Halaman tambahan', description: 'Satu halaman kandungan tambahan.', amount: import.meta.env.DEV ? 280 : null, billing: 'one-time', availableFor: ['starter', 'growth'], provisional: true },
    { id: 'package-entry', name: 'Entri pakej tambahan', description: 'Penyediaan kandungan untuk satu pakej umrah tambahan.', amount: import.meta.env.DEV ? 120 : null, billing: 'one-time', availableFor: ['starter', 'growth'], provisional: true },
    { id: 'extra-faq', name: 'Kandungan FAQ tambahan', description: 'Susun dan masukkan satu set FAQ tambahan.', amount: import.meta.env.DEV ? 80 : null, billing: 'one-time', availableFor: ['starter', 'growth'], provisional: true },
    { id: 'analytics', name: 'Analytics dan tracking conversion', description: 'Setup analytics dan event pertanyaan asas.', amount: import.meta.env.DEV ? 250 : null, billing: 'one-time', availableFor: ['starter', 'growth'], provisional: true },
    { id: 'revision-pack', name: 'Pakej revisi tambahan', description: 'Satu pusingan semakan tambahan mengikut skop yang dipersetujui.', amount: import.meta.env.DEV ? 300 : null, billing: 'one-time', availableFor: ['starter', 'growth'], provisional: true },
    { id: 'advanced-enquiry', name: 'Borang pertanyaan lanjutan', description: 'Borang tersuai untuk kumpulkan butiran awal bakal pelanggan.', amount: import.meta.env.DEV ? 350 : null, billing: 'one-time', availableFor: ['starter', 'growth'], provisional: true },
    { id: 'maintenance', name: 'Maintenance bulanan', description: 'Cadangan sokongan rutin selepas tempoh yang dipersetujui.', amount: import.meta.env.DEV ? 180 : null, billing: 'monthly', availableFor: ['starter', 'growth'], provisional: true },
  ] satisfies UmrahAddOn[],
} as const;

export function formatMYR(amount: number): string {
  return `RM${new Intl.NumberFormat('ms-MY', { maximumFractionDigits: 0 }).format(amount)}`;
}
