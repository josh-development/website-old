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
            children: [
              {
                path: '/introduction',
                component: lazy(() => import('../pages/docs/Guide/getting-started/Introduction'))
              },
              {
                path: '/using-providers',
                component: lazy(() => import('../pages/docs/Guide/getting-started/UsingProviders'))
              },
              {
                path: '/migrating-from-enmap',
                component: lazy(() => import('../pages/docs/Guide/getting-started/MigratingFromEnmap'))
              },
              {
                path: '/migrating-from-v1',
                component: lazy(() => import('../pages/docs/Guide/getting-started/MigratingFromV1'))
              }
            ]
          },
          {
            path: '/middleware',
            children: [
              {
                path: '/what-is-middleware',
                component: lazy(() => import('../pages/docs/Guide/middleware/WhatIsMiddleware'))
              },
              {
                path: '/creating-middleware',
                component: lazy(() => import('../pages/docs/Guide/middleware/CreatingMiddleware'))
              }
            ]
          },
          {
            path: '/providers',
            children: [
              {
                path: '/contributing-your-own-provider',
                component: lazy(() => import('../pages/docs/Guide/providers/ContributingYourOwnProvider'))
              }
            ]
          }
        ]
      },
      {
        path: '/Documentation',
        children: [
          {
            path: '/:packageName',
            children: [
              {
                path: '/',
                component: lazy(() => import('../pages/docs/Documentation/Package'))
              },
              {
                path: '/namespaces',
                children: [
                  {
                    path: '/:namespaceName',
                    children: [
                      {
                        path: '/',
                        component: lazy(() => import('../pages/docs/Documentation/Namespace'))
                      },
                      {
                        path: '/interfaces/:interfaceName',
                        component: lazy(() => import('../pages/docs/Documentation/namespaces/Interface'))
                      },
                      {
                        path: '/enumerations/:enumerationName',
                        component: lazy(() => import('../pages/docs/Documentation/namespaces/Enumeration'))
                      }
                    ]
                  }
                ]
              },
              {
                path: '/classes/:className',
                component: lazy(() => import('../pages/docs/Documentation/Class'))
              },
              {
                path: '/enumerations/:enumerationName',
                component: lazy(() => import('../pages/docs/Documentation/Enumeration'))
              },
              {
                path: '/functions/:functionName',
                component: lazy(() => import('../pages/docs/Documentation/Function'))
              },
              {
                path: '/interfaces/:interfaceName',
                component: lazy(() => import('../pages/docs/Documentation/Interface'))
              }
            ]
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
