import { Component } from 'solid-js';
import { DocsPage } from '../../../../components/DocsPage';
import { Markdown } from '../../../../components/Markdown';
import Introduction from '../../../../docs/Guide/getting-started/Introduction.mdx';

const IntroductionPage: Component = () => (
  <DocsPage name="Introduction">
    <Markdown>
      <Introduction />
    </Markdown>
  </DocsPage>
);

export default IntroductionPage;
