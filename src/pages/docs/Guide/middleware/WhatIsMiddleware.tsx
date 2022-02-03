import { Component } from 'solid-js';
import { DocsPage } from '../../../../components/DocsPage';
import { Markdown } from '../../../../components/Markdown';
import WhatIsMiddleware from '../../../../docs/Guide/middleware/WhatIsMiddleware.mdx';

const WhatIsMiddlewarePage: Component = () => (
  <DocsPage name="What is middleware?">
    <Markdown>
      <WhatIsMiddleware />
    </Markdown>
  </DocsPage>
);

export default WhatIsMiddlewarePage;
