import { Component } from 'solid-js';
import { DocsPage } from '../../../../components/DocsPage';
import { BREADCRUMB_ITEMS } from '../../../../constants/breadcrumb-items';
import UsingProviders from '../../../../docs/Guide/getting-started/UsingProviders.mdx';

const UsingProvidersPage: Component = () => (
  <DocsPage
    name='Using Providers'
    breadcrumbItems={[
      ...BREADCRUMB_ITEMS.GUIDE,
      { name: 'Getting Started', href: '/docs/Guide/getting-started/introduction' },
      { name: 'Using Providers' }
    ]}
  >
    <UsingProviders />
  </DocsPage>
);

export default UsingProvidersPage;
