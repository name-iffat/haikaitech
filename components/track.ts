declare global {
  interface Window { dataLayer: unknown[]; }
}

export function track(action: string, label?: string, value?: string) {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', action, { event_label: label, value });
  }
}
