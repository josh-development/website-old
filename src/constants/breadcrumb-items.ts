import { MAPPED_API_DATA } from './mapped-api-data';

export const BREADCRUMB_ITEMS = {
  GENERAL: [{ name: 'General', href: '/docs/General/Welcome' }],
  GUIDE: [{ name: 'Guide', href: '/docs/Guide/getting-started/introduction', noHover: true }],
  DOCUMENTATION: (packageName: string) => [
    { name: 'Documentation' },
    { name: MAPPED_API_DATA[packageName].displayName, href: `/docs/Documentation/${packageName}` }
  ]
};
