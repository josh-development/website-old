import { Link, useLocation } from 'solid-app-router';
import { Component, createEffect, createSignal, Show } from 'solid-js';
import { MAPPED_API_DATA } from '../constants/mapped-api-data';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';
import { Container } from './Container';
import { Markdown } from './Markdown';
import { PageXLink, PageYLink } from './Page';
import { ThemeToggle } from './ThemeToggle';

const DocsPageDropdown: Component<{ name: string; path: string; link?: boolean }> = (props) => {
  const [open, setOpen] = createSignal(false);
  const location = useLocation();
  const [pathname, setPathname] = createSignal(location.pathname);

  createEffect(() => {
    setPathname(location.pathname);

    if (pathname().startsWith(props.path)) setOpen(true);
  });

  return (
    <>
      <a
        href={props.link ? props.path : undefined}
        onClick={() => setOpen(!open())}
        class='block cursor-pointer p-1 px-4 my-1 rounded-md transition ease-in-out hover:bg-neutral-200 dark:hover:bg-slate-800 duration-300 font-semibold focus:outline-none focus:ring-inset focus:ring-white'
      >
        <span class={pathname().startsWith(props.path) ? 'text-emerald-500' : ''}>{props.name}</span>
        <span class='float-right text-slate-400'>
          <Show
            when={open()}
            fallback={
              <svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5l7 7-7 7' />
              </svg>
            }
            children={
              <svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' />
              </svg>
            }
          />
        </span>
      </a>

      <div class='ml-4 space-y-1'>
        <Show when={open()} children={props.children} />
      </div>
    </>
  );
};

const DocsPageDropdownLink: Component<{ name: string; href: string }> = (props) => {
  const location = useLocation();
  const [pathname, setPathname] = createSignal(location.pathname);

  createEffect(() => setPathname(location.pathname));

  return (
    <Link
      href={props.href}
      class={`block px-4 py-1 rounded-md cursor-pointer transition ease-in-out duration-300 hover:bg-neutral-200 dark:hover:bg-slate-800 focus:outline-none focus:ring-inset focus:ring-white ${
        pathname() === props.href ? 'text-emerald-500' : ''
      }`}
    >
      {props.name}
    </Link>
  );
};

export const DocsPage: Component<{
  name: string;
  breadcrumbItems?: { name: string; href?: string; noHover?: boolean }[];
  disableHighlight?: boolean;
}> = (props) => {
  document.title = `${props.name} | Josh`;

  createEffect(() => {
    document.title = `${props.name} | Josh`;
  });

  const [open, setOpen] = createSignal(false);

  return (
    <>
      <nav class='sticky top-0 z-10 bg-neutral-100 dark:bg-slate-900 shadow-md dark:text-white'>
        <div class='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
          <div class='relative flex items-center justify-between h-16'>
            <div class='absolute sm:hidden inset-y-0 left-0 items-center'>
              <button
                type='button'
                onClick={() => setOpen(!open())}
                class='inline-flex items-center justify-start p-4 mt-1 rounded-md text-gray-400 hover:text-white hover:bg-neutral-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-inset focus:ring-white'
              >
                <Show
                  when={open()}
                  fallback={
                    <svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 12h16M4 18h16' />
                    </svg>
                  }
                  children={
                    <svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                  }
                />
              </button>
            </div>

            <div class='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
              <div class='flex-shrink-0 flex items-center'>
                <img class='block h-8 w-auto' src='/src/assets/josh-icon.png' />
                <div class='hover:text-emerald-500 px-3 py-2 text-base'>Josh</div>
              </div>

              <div class='hidden sm:block sm:ml-6'>
                <div class='flex space-x-4'>
                  <PageXLink name='Home' href='/' />
                  <PageXLink name='Documentation' href='/docs/General/Welcome' paths={['/docs/General', '/docs/Documentation']} />
                  <PageXLink name='Guide' href='/docs/Guide/getting-started/introduction' paths={['/docs/Guide']} />
                </div>
              </div>
            </div>

            <div class='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
              <div class='ml-3 relative'>
                <div class='hidden sm:block sm:ml-6'>
                  <div class='flex space-x-4'>
                    <a href='https://discord.gg/N7ZKH3P' target='_blank' class='hover:text-emerald-500 block w-auto px-3 py-2 text-base'>
                      Discord
                    </a>

                    <a href='https://github.com/josh-development' target='_blank' class='hover:text-emerald-500 block w-auto px-3 py-2 text-base'>
                      GitHub
                    </a>

                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Show
          when={open()}
          children={
            <div class='sm:hidden'>
              <div class='p-2 pb-3 pace-y-1'>
                <PageYLink name='Home' href='/' />

                <DocsPageDropdown name='General' path='/docs/General'>
                  <DocsPageDropdownLink name='Welcome' href='/docs/General/Welcome' />
                </DocsPageDropdown>

                <DocsPageDropdown name='Guide' path='/docs/Guide'>
                  <DocsPageDropdown name='Getting Started' path='/docs/Guide/getting-started'>
                    <DocsPageDropdownLink name='Introduction' href='/docs/Guide/getting-started/introduction' />
                    <DocsPageDropdownLink name='Using Providers' href='/docs/Guide/getting-started/using-providers' />

                    <DocsPageDropdownLink name='Migrating from Enmap' href='/docs/Guide/getting-started/migrating-from-enmap' />
                    <DocsPageDropdownLink name='Migrating from v1' href='/docs/Guide/getting-started/migrating-from-v1' />
                  </DocsPageDropdown>

                  <DocsPageDropdown name='Middleware' path='/docs/Guide/middleware'>
                    <DocsPageDropdownLink name='What is Middleware?' href='/docs/Guide/middleware/what-is-middleware' />
                    <DocsPageDropdownLink name='Creating Middleware' href='/docs/Guide/middleware/creating-middleware' />
                  </DocsPageDropdown>

                  <DocsPageDropdown name='Providers' path='/docs/Guide/providers'>
                    <DocsPageDropdownLink name='JSON' href='/docs/Guide/providers/json' />
                    <DocsPageDropdownLink name='Mongo' href='/docs/Guide/providers/mongo' />

                    <DocsPageDropdownLink name='Contributing Your Own Provider' href='/docs/Guide/providers/contributing-your-own-provider' />
                  </DocsPageDropdown>
                </DocsPageDropdown>

                <DocsPageDropdown name='Documentation' path='/docs/Documentation'>
                  {Object.entries(MAPPED_API_DATA).map(([name, data]) => (
                    <DocsPageDropdown name={data.displayName} path={`/docs/Documentation/${name}`} link>
                      <Show
                        when={data.namespaces.length > 0}
                        children={
                          <DocsPageDropdown name='Namespaces' path={`/docs/Documentation/${name}/namespaces`}>
                            {data.namespaces.map((namespace) => (
                              <DocsPageDropdownLink name={namespace.name} href={`/docs/Documentation/${name}/namespaces/${namespace.name}`} />
                            ))}
                          </DocsPageDropdown>
                        }
                      />

                      <Show
                        when={data.classes.length > 0}
                        children={
                          <DocsPageDropdown name='Classes' path={`/docs/Documentation/${name}/classes`}>
                            {data.classes.map((classData) => (
                              <DocsPageDropdownLink name={classData.name} href={`/docs/Documentation/${name}/classes/${classData.name}`} />
                            ))}
                          </DocsPageDropdown>
                        }
                      />

                      <Show
                        when={data.enumerations.length > 0}
                        children={
                          <DocsPageDropdown name='Enumerations' path={`/docs/Documentation/${name}/enumerations`}>
                            {data.enumerations.map((enumeration) => (
                              <DocsPageDropdownLink name={enumeration.name} href={`/docs/Documentation/${name}/enumerations/${enumeration.name}`} />
                            ))}
                          </DocsPageDropdown>
                        }
                      />

                      <Show
                        when={data.functions.length > 0}
                        children={
                          <DocsPageDropdown name='Functions' path={`/docs/Documentation/${name}/functions`}>
                            {data.functions.map((functionData) => (
                              <DocsPageDropdownLink name={functionData.name} href={`/docs/Documentation/${name}/functions/${functionData.name}`} />
                            ))}
                          </DocsPageDropdown>
                        }
                      />

                      <Show
                        when={data.interfaces.length > 0}
                        children={
                          <DocsPageDropdown name='Interfaces' path={`/docs/Documentation/${name}/interfaces`}>
                            {data.interfaces.map((interfaceData) => (
                              <DocsPageDropdownLink name={interfaceData.name} href={`/docs/Documentation/${name}/interfaces/${interfaceData.name}`} />
                            ))}
                          </DocsPageDropdown>
                        }
                      />
                    </DocsPageDropdown>
                  ))}
                </DocsPageDropdown>

                <a href='https://discord.gg/N7ZKH3P' target='_blank' class='hover:text-emerald-500 block h-8 w-auto px-3 py-2 text-base'>
                  Discord
                </a>

                <a href='https://github.com/josh-development' target='_blank' class='hover:text-emerald-500 block h-8 w-auto px-3 py-2 text-base'>
                  GitHub
                </a>

                <ThemeToggle />
              </div>
            </div>
          }
        />
      </nav>

      <div class='min-h-screen flex flex-row'>
        <div class='hidden sm:flex flex-col w-1/4 min-w-max overflow-hidden shadow-md dark:shadow-slate-800 bg-neutral-100 dark:bg-slate-900'>
          <div class='m-4 dark:text-neutral-300 text-base'>
            <DocsPageDropdown name='General' path='/docs/General'>
              <DocsPageDropdownLink name='Welcome' href='/docs/General/Welcome' />
            </DocsPageDropdown>

            <DocsPageDropdown name='Guide' path='/docs/Guide'>
              <DocsPageDropdown name='Getting Started' path='/docs/Guide/getting-started'>
                <DocsPageDropdownLink name='Introduction' href='/docs/Guide/getting-started/introduction' />
                <DocsPageDropdownLink name='Using Providers' href='/docs/Guide/getting-started/using-providers' />

                <DocsPageDropdownLink name='Migrating from Enmap' href='/docs/Guide/getting-started/migrating-from-enmap' />
                <DocsPageDropdownLink name='Migrating from v1' href='/docs/Guide/getting-started/migrating-from-v1' />
              </DocsPageDropdown>

              <DocsPageDropdown name='Middleware' path='/docs/Guide/middleware'>
                <DocsPageDropdownLink name='What is Middleware?' href='/docs/Guide/middleware/what-is-middleware' />
                <DocsPageDropdownLink name='Creating Middleware' href='/docs/Guide/middleware/creating-middleware' />
              </DocsPageDropdown>

              <DocsPageDropdown name='Providers' path='/docs/Guide/providers'>
                <DocsPageDropdownLink name='JSON' href='/docs/Guide/providers/json' />
                <DocsPageDropdownLink name='Mongo' href='/docs/Guide/providers/mongo' />

                <DocsPageDropdownLink name='Contributing Your Own Provider' href='/docs/Guide/providers/contributing-your-own-provider' />
              </DocsPageDropdown>
            </DocsPageDropdown>

            <DocsPageDropdown name='Documentation' path='/docs/Documentation'>
              {Object.entries(MAPPED_API_DATA).map(([name, data]) => (
                <DocsPageDropdown name={data.displayName} path={`/docs/Documentation/${name}`} link>
                  <Show
                    when={data.namespaces.length > 0}
                    children={
                      <DocsPageDropdown name='Namespaces' path={`/docs/Documentation/${name}/namespaces`}>
                        {data.namespaces.map((namespace) => (
                          <DocsPageDropdownLink name={namespace.name} href={`/docs/Documentation/${name}/namespaces/${namespace.name}`} />
                        ))}
                      </DocsPageDropdown>
                    }
                  />

                  <Show
                    when={data.classes.length > 0}
                    children={
                      <DocsPageDropdown name='Classes' path={`/docs/Documentation/${name}/classes`}>
                        {data.classes.map((classData) => (
                          <DocsPageDropdownLink name={classData.name} href={`/docs/Documentation/${name}/classes/${classData.name}`} />
                        ))}
                      </DocsPageDropdown>
                    }
                  />

                  <Show
                    when={data.enumerations.length > 0}
                    children={
                      <DocsPageDropdown name='Enumerations' path={`/docs/Documentation/${name}/enumerations`}>
                        {data.enumerations.map((enumeration) => (
                          <DocsPageDropdownLink name={enumeration.name} href={`/docs/Documentation/${name}/enumerations/${enumeration.name}`} />
                        ))}
                      </DocsPageDropdown>
                    }
                  />

                  <Show
                    when={data.functions.length > 0}
                    children={
                      <DocsPageDropdown name='Functions' path={`/docs/Documentation/${name}/functions`}>
                        {data.functions.map((functionData) => (
                          <DocsPageDropdownLink name={functionData.name} href={`/docs/Documentation/${name}/functions/${functionData.name}`} />
                        ))}
                      </DocsPageDropdown>
                    }
                  />

                  <Show
                    when={data.interfaces.length > 0}
                    children={
                      <DocsPageDropdown name='Interfaces' path={`/docs/Documentation/${name}/interfaces`}>
                        {data.interfaces.map((interfaceData) => (
                          <DocsPageDropdownLink name={interfaceData.name} href={`/docs/Documentation/${name}/interfaces/${interfaceData.name}`} />
                        ))}
                      </DocsPageDropdown>
                    }
                  />
                </DocsPageDropdown>
              ))}
            </DocsPageDropdown>
          </div>
        </div>

        <Container>
          <Breadcrumb>
            <BreadcrumbItem name='Docs' href='/docs/General/Welcome' />

            {props.breadcrumbItems?.map((item) => (
              <BreadcrumbItem name={item.name} href={item.href} noHover={item.noHover} />
            ))}
          </Breadcrumb>

          <Markdown disableHighlight={props.disableHighlight} container>
            {props.children}
          </Markdown>
        </Container>
      </div>
    </>
  );
};
