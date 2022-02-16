import { Component } from 'solid-js';
import { DocsPage } from '../../../../components/DocsPage';
import { BREADCRUMB_ITEMS } from '../../../../constants/breadcrumb-items';
import ContributingYourOwnProvider from '../../../../docs/Guide/providers/ContributingYourOwnProvider.mdx';

const ContributingYourOwnProviderPage: Component = () => (
  <DocsPage
    name='Contributing Your Own Provider'
    breadcrumbItems={[
      ...BREADCRUMB_ITEMS.GUIDE,
      { name: 'Providers', href: '/docs/Guide/providers/contributing-your-own-provider' },
      { name: 'Contributing Your Own Provider' }
    ]}
  >
    <ContributingYourOwnProvider />
  </DocsPage>
);

export default ContributingYourOwnProviderPage;
