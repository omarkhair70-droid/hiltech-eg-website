export type ReferenceItem = {
  name: string;
  subtitle?: string;
  logoSrc?: string;
  logoAlt?: string;
};

export type ReferenceGroup = {
  title: string;
  items: ReferenceItem[];
};

export const selectedReferenceGroups: ReferenceGroup[] = [
  {
    title: 'Technology & Supply References',
    items: [
      { name: '3M', logoSrc: '/partner-3m.png', logoAlt: '3M brand reference logo' },
      { name: 'CommScope', logoSrc: '/partner-commscope.png', logoAlt: 'CommScope brand reference logo' },
      { name: 'Excel', logoSrc: '/partner-excel.png', logoAlt: 'Excel brand reference logo' },
      { name: 'Finolex', logoSrc: '/partner-finolex.png', logoAlt: 'Finolex brand reference logo' },
      { name: 'Legrand', logoSrc: '/partner-legrand.png', logoAlt: 'Legrand brand reference logo' },
      { name: 'Premium Line', logoSrc: '/partner-premium-line.png', logoAlt: 'Premium Line brand reference logo' },
      { name: 'Infrostone', logoSrc: '/partner-infostone.png', logoAlt: 'Infrostone brand reference logo' },
      { name: 'Shinhan Networks', logoSrc: '/partner-shinhan-networks.png', logoAlt: 'Shinhan Networks brand reference logo' },
    ],
  },
  {
    title: 'Client / Project References',
    items: [
      { name: 'BSS', logoSrc: '/client-bss.png', logoAlt: 'BSS client reference logo' },
      { name: 'Crystal Networks Egypt', logoSrc: '/client-crystal-networks.png', logoAlt: 'Crystal Networks Egypt client reference logo' },
      { name: 'Gama', subtitle: 'Trading & Contracting', logoSrc: '/client-gama.png', logoAlt: 'Gama client reference logo' },
      { name: 'Go Faster', logoSrc: '/client-gofaster.png', logoAlt: 'Go Faster client reference logo' },
      { name: 'SABA', logoSrc: '/client-saba.png', logoAlt: 'SABA client reference logo' },
      { name: 'Ulker', logoSrc: '/client-ulker.png', logoAlt: 'Ulker client reference logo' },
      { name: 'Military Production', logoSrc: '/client-ministry-military-production.png', logoAlt: 'Military Production client reference logo' },
    ],
  },
];

export const selectedReferencesDisclaimer =
  'Brand and client references are shown for context and do not imply formal partnership unless explicitly stated.';

export const selectedReferencesDisclaimerAr = 'مراجع تجارية وفنية لأغراض التوضيح والسياق فقط.';
