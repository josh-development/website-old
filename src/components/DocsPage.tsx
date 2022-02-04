import { Link, useLocation } from 'solid-app-router';
import { Component, createEffect, createSignal, Show } from 'solid-js';
import { PageXLink, PageYLink } from './Page';
import { ThemeToggle } from './ThemeToggle';

const DocsPageDropdown: Component<{ name: string; path: string }> = (props) => {
  const [open, setOpen] = createSignal(false);
  const { pathname } = useLocation();

  createEffect(() => {
    if (pathname.startsWith(props.path)) setOpen(true);
  });

  return (
    <>
      <div
        onClick={() => setOpen(!open())}
        class="block cursor-pointer p-1 px-4 my-1 rounded-md transition ease-in-out hover:bg-neutral-200 dark:hover:bg-slate-800 duration-300 font-semibold focus:outline-none focus:ring-inset focus:ring-white"
      >
        <span class={pathname.startsWith(props.path) ? 'text-emerald-500' : ''}>{props.name}</span>
        <span class="float-right text-slate-400">
          <Show
            when={open()}
            fallback={
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            }
            children={
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            }
          />
        </span>
      </div>

      <div class="ml-4 space-y-1">
        <Show when={open()} children={props.children} />
      </div>
    </>
  );
};

const DocsPageDropdownLink: Component<{ name: string; href: string }> = (props) => {
  const { pathname } = useLocation();

  return (
    <Link
      href={props.href}
      class={`block px-4 py-1 rounded-md cursor-pointer transition ease-in-out duration-300 hover:bg-neutral-200 dark:hover:bg-slate-800 focus:outline-none focus:ring-inset focus:ring-white ${
        pathname === props.href ? 'text-emerald-500' : ''
      }`}
    >
      {props.name}
    </Link>
  );
};

export const DocsPage: Component<{ name: string }> = (props) => {
  document.title = `${props.name} | Josh`;

  const [open, setOpen] = createSignal(false);

  return (
    <>
      <nav class="sticky top-0 bg-neutral-100 dark:bg-slate-900 shadow-md dark:text-white">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div class="relative flex items-center justify-between h-16">
            <div class="absolute sm:hidden inset-y-0 left-0 items-center">
              <button
                type="button"
                onClick={() => setOpen(!open())}
                class="inline-flex items-center justify-start p-4 mt-1 rounded-md text-gray-400 hover:text-white hover:bg-neutral-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-inset focus:ring-white"
              >
                <Show
                  when={open()}
                  fallback={
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  }
                  children={
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  }
                />
              </button>
            </div>

            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div class="flex-shrink-0 flex items-center">
                <img class="block h-8 w-auto" src="/src/assets/josh-icon.png" />
                <div class="hover:text-emerald-500 px-3 py-2 text-base">Josh</div>
              </div>

              <div class="hidden sm:block sm:ml-6">
                <div class="flex space-x-4">
                  <PageXLink name="Home" href="/" />
                  <PageXLink name="Documentation" href="/docs/General/Welcome" paths={['/docs/General', '/docs/Documentation']} />
                  <PageXLink name="Guide" href="/docs/Guide/getting-started/introduction" paths={['/docs/Guide']} />
                </div>
              </div>
            </div>

            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div class="ml-3 relative">
                <div class="hidden sm:block sm:ml-6">
                  <div class="flex space-x-4">
                    <a href="https://discord.gg/N7ZKH3P" target="_blank" class="hover:text-emerald-500 block w-auto px-3 py-2 text-base">
                      Discord
                    </a>

                    <a href="https://github.com/josh-development" target="_blank" class="hover:text-emerald-500 block w-auto px-3 py-2 text-base">
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
            <div class="sm:hidden">
              <div class="p-2 pb-3 pace-y-1">
                <PageYLink name="Home" href="/" />

                <DocsPageDropdown name="General" path="/docs/General">
                  <DocsPageDropdownLink name="Welcome" href="/docs/General/Welcome" />
                </DocsPageDropdown>

                <DocsPageDropdown name="Guide" path="/docs/Guide">
                  <DocsPageDropdown name="Getting Started" path="/docs/Guide/getting-started">
                    <DocsPageDropdownLink name="Introduction" href="/docs/Guide/getting-started/introduction" />
                    <DocsPageDropdownLink name="Using Providers" href="/docs/Guide/getting-started/using-providers" />

                    <DocsPageDropdownLink name="Migrating from Enmap" href="/docs/Guide/getting-started/migrating-from-enmap" />
                    <DocsPageDropdownLink name="Migrating from v1" href="/docs/Guide/getting-started/migrating-from-v1" />
                  </DocsPageDropdown>

                  <DocsPageDropdown name="Middleware" path="/docs/Guide/middleware">
                    <DocsPageDropdownLink name="What is Middleware?" href="/docs/Guide/middleware/what-is-middleware" />
                    <DocsPageDropdownLink name="Creating Middleware" href="/docs/Guide/middleware/creating-middleware" />
                  </DocsPageDropdown>

                  <DocsPageDropdown name="Providers" path="/docs/Guide/providers">
                    <DocsPageDropdownLink name="JSON" href="/docs/Guide/providers/json" />
                    <DocsPageDropdownLink name="Mongo" href="/docs/Guide/providers/mongo" />
                  </DocsPageDropdown>
                </DocsPageDropdown>

                <a href="https://discord.gg/N7ZKH3P" target="_blank" class="hover:text-emerald-500 block h-8 w-auto px-3 py-2 text-base">
                  Discord
                </a>

                <a href="https://github.com/josh-development" target="_blank" class="hover:text-emerald-500 block h-8 w-auto px-3 py-2 text-base">
                  GitHub
                </a>

                <ThemeToggle />
              </div>
            </div>
          }
        />
      </nav>

      <div class="min-h-screen flex flex-row">
        <div class="hidden sm:flex flex-col w-1/4 min-w-max overflow-hidden shadow-md dark:shadow-slate-800 bg-neutral-100 dark:bg-slate-900">
          <div class="m-4 dark:text-neutral-300 text-lg">
            <DocsPageDropdown name="General" path="/docs/General">
              <DocsPageDropdownLink name="Welcome" href="/docs/General/Welcome" />
            </DocsPageDropdown>

            <DocsPageDropdown name="Guide" path="/docs/Guide">
              <DocsPageDropdown name="Getting Started" path="/docs/Guide/getting-started">
                <DocsPageDropdownLink name="Introduction" href="/docs/Guide/getting-started/introduction" />
                <DocsPageDropdownLink name="Using Providers" href="/docs/Guide/getting-started/using-providers" />

                <DocsPageDropdownLink name="Migrating from Enmap" href="/docs/Guide/getting-started/migrating-from-enmap" />
                <DocsPageDropdownLink name="Migrating from v1" href="/docs/Guide/getting-started/migrating-from-v1" />
              </DocsPageDropdown>

              <DocsPageDropdown name="Middleware" path="/docs/Guide/middleware">
                <DocsPageDropdownLink name="What is Middleware?" href="/docs/Guide/middleware/what-is-middleware" />
                <DocsPageDropdownLink name="Creating Middleware" href="/docs/Guide/middleware/creating-middleware" />
              </DocsPageDropdown>

              <DocsPageDropdown name="Providers" path="/docs/Guide/providers">
                <DocsPageDropdownLink name="JSON" href="/docs/Guide/providers/json" />
                <DocsPageDropdownLink name="Mongo" href="/docs/Guide/providers/mongo" />
              </DocsPageDropdown>
            </DocsPageDropdown>
          </div>
        </div>

        <div class="flex flex-col">{props.children}</div>
      </div>
    </>
  );
};
