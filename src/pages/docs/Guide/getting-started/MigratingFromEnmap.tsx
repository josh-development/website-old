import { Component } from 'solid-js';
import { DocsPage } from '../../../../components/DocsPage';
import { Markdown } from '../../../../components/Markdown';
import MigratingFromEnmap from '../../../../docs/Guide/getting-started/MigratingFromEnmap.mdx';

const MigratingFromEnmapPage: Component = () => (
  <DocsPage name="Migrating from Enmap">
    <Markdown>
      <MigratingFromEnmap />
    </Markdown>
  </DocsPage>
);

export default MigratingFromEnmapPage;
