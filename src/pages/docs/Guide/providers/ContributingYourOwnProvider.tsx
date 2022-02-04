import { Component } from 'solid-js';
import { DocsPage } from '../../../../components/DocsPage';
import { Markdown } from '../../../../components/Markdown';
import ContributingYourOwnProvider from '../../../../docs/Guide/providers/ContributingYourOwnProvider.mdx';

const ContributingYourOwnProviderPage: Component = () => (
  <DocsPage name="Contributing Your Own Provider">
    <Markdown>
      <ContributingYourOwnProvider />
    </Markdown>
  </DocsPage>
);

export default ContributingYourOwnProviderPage;
