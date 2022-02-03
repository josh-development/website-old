import { Link, useLocation } from 'solid-app-router';
import { Component, createSignal, Show } from 'solid-js';
import { ThemeToggle } from './ThemeToggle';

export const PageXLink: Component<{ name: string; href: string; paths?: string[] }> = (props) => {
  const { pathname } = useLocation();

  return (
    <Link
      href={props.href}
      class={`px-3 py-2 ${
        props.paths?.some?.((path) => pathname.startsWith(path)) ?? pathname === props.href ? 'text-emerald-500' : 'hover:text-emerald-500'
      }`}
    >
      {props.name}
    </Link>
  );
};

export const PageYLink: Component<{ name: string; href: string; paths?: string[] }> = (props) => {
  const { pathname } = useLocation();

  return (
    <Link
      href={props.href}
      class={`px-3 py-1 block ${
        (props.paths === undefined ? pathname === props.href : props.paths.some((path) => pathname.startsWith(path))) ?? pathname === props.href
          ? 'text-emerald-500'
          : 'hover:text-emerald-500'
      }`}
    >
      {props.name}
    </Link>
  );
};

export const Page: Component<{ name: string }> = (props) => {
  document.title = `${props.name} | Josh`;

  const [open, setOpen] = createSignal(false);

  return (
    <>
      <nav class="sticky top-0 bg-neutral-100 dark:bg-slate-900 shadow-md dark:text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div class="p-2 pb-3 space-y-1">
                <PageYLink name="Home" href="/" />
                <PageYLink name="Documentation" href="/docs/General/Welcome" paths={['/docs/General', '/docs/Documentation']} />
                <PageYLink name="Guide" href="/docs/Guide/getting-started/introduction" paths={['/docs/Guide']} />

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

      {props.children}
    </>
  );
};
