import { Component } from 'solid-js';
import { DocsPage } from '../../../../components/DocsPage';
import { Markdown } from '../../../../components/Markdown';
import MigratingFromV1 from '../../../../docs/Guide/getting-started/MigratingFromV1.mdx';

const MigratingFromV1Page: Component = () => (
  <DocsPage name="Migrating from v1">
    <Markdown>
      <MigratingFromV1 />
    </Markdown>
  </DocsPage>
);

export default MigratingFromV1Page;
