declare global {
  interface Window { dataLayer: unknown[]; }
  function gtag(command: 'event', action: string, params?: Record<string, unknown>): void;
}

export function track(action: string, label?: string, value?: string) {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', action, { event_label: label, value });
  }
}
