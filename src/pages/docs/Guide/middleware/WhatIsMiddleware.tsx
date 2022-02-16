import { Component } from 'solid-js';
import { DocsPage } from '../../../../components/DocsPage';
import { BREADCRUMB_ITEMS } from '../../../../constants/breadcrumb-items';
import WhatIsMiddleware from '../../../../docs/Guide/middleware/WhatIsMiddleware.mdx';

const WhatIsMiddlewarePage: Component = () => (
  <DocsPage
    name='What is Middleware?'
    breadcrumbItems={[
      ...BREADCRUMB_ITEMS.GUIDE,
      { name: 'Middleware', href: '/docs/Guide/middleware/what-is-middleware' },
      { name: 'What is Middleware?' }
    ]}
  >
    <WhatIsMiddleware />
  </DocsPage>
);

export default WhatIsMiddlewarePage;
