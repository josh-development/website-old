import { Component } from 'solid-js';
import { DocsPage } from '../../../../components/DocsPage';
import { BREADCRUMB_ITEMS } from '../../../../constants/breadcrumb-items';
import CreatingMiddleware from '../../../../docs/Guide/middleware/CreatingMiddleware.mdx';

const CreatingMiddlewarePage: Component = () => (
  <DocsPage
    name='Creating Middleware'
    breadcrumbItems={[
      ...BREADCRUMB_ITEMS.GUIDE,
      { name: 'Middleware', href: '/docs/Guide/middleware/what-is-middleware' },
      { name: 'Creating Middleware' }
    ]}
  >
    <CreatingMiddleware />
  </DocsPage>
);

export default CreatingMiddlewarePage;
