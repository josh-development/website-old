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
