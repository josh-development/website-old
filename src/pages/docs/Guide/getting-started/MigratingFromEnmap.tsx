import { Component } from 'solid-js';
import { DocsPage } from '../../../../components/DocsPage';
import { BREADCRUMB_ITEMS } from '../../../../constants/breadcrumb-items';
import MigratingFromEnmap from '../../../../docs/Guide/getting-started/MigratingFromEnmap.mdx';

const MigratingFromEnmapPage: Component = () => (
  <DocsPage
    name='Migrating from Enmap'
    breadcrumbItems={[
      ...BREADCRUMB_ITEMS.GUIDE,
      { name: 'Getting Started', href: '/docs/Guide/getting-started/introduction' },
      { name: 'Migrating from Enmap' }
    ]}
  >
    <MigratingFromEnmap />
  </DocsPage>
);

export default MigratingFromEnmapPage;
