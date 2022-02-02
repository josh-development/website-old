import { RouteDefinition } from 'solid-app-router';
import { lazy } from 'solid-js';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('../pages/Home'))
  },
  {
    path: '/docs',
    children: [
      {
        path: '/General',
        children: [
          {
            path: '/Welcome',
            component: lazy(() => import('../pages/docs/General/Welcome'))
          }
        ]
      },
      {
        path: '/Guide',
        children: [
          {
            path: '/getting-started',
            component: lazy(() => import('../pages/docs/Guide/GettingStarted'))
          },
          {
            path: '/using-providers',
            component: lazy(() => import('../pages/docs/Guide/UsingProviders'))
          },
          {
            path: '/creating-middleware',
            component: lazy(() => import('../pages/docs/Guide/CreatingMiddleware'))
          }
        ]
      },
      {
        path: '/Documentation',
        children: [
          {
            path: '/documentation',
            component: lazy(() => import('../pages/docs/Documentation/Documentation'))
          }
        ]
      }
    ]
  },
  {
    path: '/*',
    component: lazy(() => import('../pages/NotFound'))
  }
];
