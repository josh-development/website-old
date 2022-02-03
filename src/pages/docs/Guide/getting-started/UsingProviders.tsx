import { Component } from 'solid-js';
import { DocsPage } from '../../../../components/DocsPage';
import { Markdown } from '../../../../components/Markdown';
import UsingProviders from '../../../../docs/Guide/getting-started/UsingProviders.mdx';

const UsingProvidersPage: Component = () => (
  <DocsPage name="Using Providers">
    <Markdown>
      <UsingProviders />
    </Markdown>
  </DocsPage>
);

export default UsingProvidersPage;
