export const primaryNavigation = [
  { label: 'Work', href: '#projects', icon: 'briefcase' },
  { label: 'Services', href: '#services', icon: 'wrench' },
  { label: 'Solutions', href: '/toolkit/', icon: 'blocks' },
  { label: 'Insights', href: '/blog/', icon: 'book' },
  { label: 'About', href: '#about', icon: 'info' },
] as const;

export const serviceNavigation = [
  { label: 'Business websites', note: 'Sites / enquiries', href: '/services/', icon: 'globe' },
  { label: 'Business systems & dashboards', note: 'Internal tools / operations', href: '/services/#custom-software', icon: 'workflow' },
  { label: 'AI agents & automation', note: 'Hermes / n8n / scripting', href: '/services/automation/', icon: 'settings' },
  { label: 'Ecommerce development', note: 'Shopify / WooCommerce', href: '/services/ecommerce/', icon: 'blocks' },
  { label: 'Digital products', note: 'Customer tools / demos', href: '/services/#custom-software', icon: 'layout' },
  { label: 'Website care', note: 'Updates / maintenance', href: '/services/#maintenance', icon: 'wrench' },
] as const;

export const serviceExtensions = [
  {
    slug: 'automation',
    eyebrow: 'New capability / Workflow layer',
    title: 'AI agents & workflow automation',
    description: 'Connect repeatable work across Hermes, n8n and custom scripts — with a human checkpoint where it matters.',
    action: 'Explore automation',
    href: '/services/automation/',
    icon: 'workflow',
  },
  {
    slug: 'ecommerce',
    eyebrow: 'New capability / Commerce layer',
    title: 'Ecommerce storefronts',
    description: 'Choose a practical Shopify or WooCommerce setup, then connect the catalogue, customer journey and operations around it.',
    action: 'Explore ecommerce',
    href: '/services/ecommerce/',
    icon: 'blocks',
  },
] as const;

export const serviceDetails = {
  automation: {
    eyebrow: 'AI agents / Workflow automation',
    title: 'Useful automation.\nLess repetitive work.',
    description: 'Set up agents and workflows around the jobs your team already repeats — from a useful handoff to a documented system you can control.',
    heroNote: 'A clear brief first. The useful bits get automated after.',
    icon: 'workflow',
    pageTitle: 'AI Agents & Workflow Automation | HaikaiTech Solutions',
    pageDescription: 'HaikaiTech sets up AI agents, n8n workflows and custom automation scripts around useful business processes.',
  },
  ecommerce: {
    eyebrow: 'Ecommerce / Storefront systems',
    title: 'Storefronts built\naround how you sell.',
    description: 'A commerce build is more than a product grid. We shape the storefront, catalogue and operational handoffs around the way your business actually sells.',
    heroNote: 'The shop should make buying — and running it — feel simpler.',
    icon: 'blocks',
    pageTitle: 'Ecommerce Development | Shopify & WooCommerce | HaikaiTech',
    pageDescription: 'HaikaiTech builds practical Shopify and WooCommerce storefronts with connected catalogue, customer and operations thinking.',
  },
} as const;
