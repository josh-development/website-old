import { Component } from 'solid-js';
import { DocsPage } from '../../../../components/DocsPage';
import { BREADCRUMB_ITEMS } from '../../../../constants/breadcrumb-items';
import Introduction from '../../../../docs/Guide/getting-started/Introduction.mdx';

const IntroductionPage: Component = () => (
  <DocsPage
    name='Introduction'
    breadcrumbItems={[
      ...BREADCRUMB_ITEMS.GUIDE,
      { name: 'Getting Started', href: '/docs/Guide/getting-started/introduction' },
      { name: 'Introduction' }
    ]}
  >
    <Introduction />
  </DocsPage>
);

export default IntroductionPage;
