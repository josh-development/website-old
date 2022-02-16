import { Component } from 'solid-js';
import { DocsPage } from '../../../../components/DocsPage';
import { BREADCRUMB_ITEMS } from '../../../../constants/breadcrumb-items';
import MigratingFromV1 from '../../../../docs/Guide/getting-started/MigratingFromV1.mdx';

const MigratingFromV1Page: Component = () => (
  <DocsPage
    name='Migrating from v1'
    breadcrumbItems={[
      ...BREADCRUMB_ITEMS.GUIDE,
      { name: 'Getting Started', href: '/docs/Guide/getting-started/introduction' },
      { name: 'Migrating from v1' }
    ]}
  >
    <MigratingFromV1 />
  </DocsPage>
);

export default MigratingFromV1Page;
