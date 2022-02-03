import { Component } from 'solid-js';
import { DocsPage } from '../../../../components/DocsPage';
import { Markdown } from '../../../../components/Markdown';
import CreatingMiddleware from '../../../../docs/Guide/middleware/CreatingMiddleware.mdx';

const CreatingMiddlewarePage: Component = () => (
  <DocsPage name="Creating middleware">
    <Markdown>
      <CreatingMiddleware />
    </Markdown>
  </DocsPage>
);

export default CreatingMiddlewarePage;
