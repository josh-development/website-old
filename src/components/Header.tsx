import { Link, useLocation } from 'solid-app-router';
import { Component, createEffect, createSignal, Show, useContext } from 'solid-js';
import { ThemeContext } from '../App';
import { SidebarChild, SidebarLink } from './Sidebar';

const Header: Component = (props) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [isDark, setIsDark] = createSignal<boolean>(theme() === 'dark');

  createEffect(() => {
    localStorage.setItem('theme', isDark() ? 'dark' : 'light');

    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    } else document.documentElement.classList.remove('dark');

    setTheme(localStorage.getItem('theme'));
  });

  const [menuOpen, setMenuOpen] = createSignal(false);
  const { pathname } = useLocation();

  return (
    <nav class="sticky top-0 bg-neutral-100 dark:bg-slate-900 shadow-md dark:shadow-slate-800 dark:text-white">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen())}
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-inset focus:ring-white"
            >
              <span class="sr-only">Open Main Menu</span>

              <Show
                when={menuOpen()}
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
                <Link href="/" class={pathname === '/' ? 'text-emerald-500 px-3 py-2 text-base' : 'hover:text-emerald-500 px-3 py-2 text-base'}>
                  Home
                </Link>
                <Link
                  href="/docs/General/Welcome"
                  class={
                    pathname.startsWith('/docs/General') || pathname.startsWith('/docs/Documentation')
                      ? 'text-emerald-500 px-3 py-2 text-base'
                      : 'hover:text-emerald-500 px-3 py-2 text-base'
                  }
                >
                  Documentation
                </Link>
                <Link
                  href="/docs/Guide/getting-started"
                  class={pathname.startsWith('/docs/Guide') ? 'text-emerald-500 px-3 py-2 text-base' : 'hover:text-emerald-500 px-3 py-2 text-base'}
                >
                  Guide
                </Link>
              </div>
            </div>
          </div>

          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div class="ml-3 relative">
              <div class="hidden sm:block sm:ml-6">
                <div class="flex space-x-4">
                  <a href="https://discord.gg/N7ZKH3P" target="_blank" class="hover:text-emerald-500 block h-8 w-auto px-3 py-2 text-base">
                    Discord
                  </a>

                  <a href="https://github.com/josh-development" target="_blank" class="hover:text-emerald-500 block h-8 w-auto px-3 py-2 text-base">
                    GitHub
                  </a>

                  <div class="rounded-full hover:bg-neutral-200 dark:hover:bg-slate-800 p-2" onClick={() => setIsDark(!isDark())}>
                    {isDark() ? (
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Show
        when={menuOpen()}
        children={
          <div class="sm:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                class={pathname === '/' ? 'text-emerald-500 block px-3 py-2 text-base' : 'hover:text-emerald-500 block px-3 py-2 text-base'}
              >
                Home
              </Link>

              <Show
                when={pathname.startsWith('/docs')}
                fallback={
                  <>
                    <Link
                      href="/docs/General/Welcome"
                      class={
                        pathname.startsWith('/docs/General') || pathname.startsWith('/docs/Documentation')
                          ? 'text-emerald-500 block px-3 py-2 text-base'
                          : 'hover:text-emerald-500 block px-3 py-2 text-base'
                      }
                    >
                      Documentation
                    </Link>

                    <Link
                      href="/docs/Guide/getting-started"
                      class={
                        pathname.startsWith('/docs/Guide')
                          ? 'text-emerald-500 block px-3 py-2 text-base'
                          : 'hover:text-emerald-500 block px-3 py-2 text-base'
                      }
                    >
                      Guide
                    </Link>
                  </>
                }
                children={
                  <>
                    <SidebarChild name="Documentation" baseURL="/docs/Documentation">
                      <SidebarLink href="/docs/Documentation/documentation" name="Documentation" sub />
                    </SidebarChild>

                    <SidebarChild name="Guide" baseURL="/docs/Guide">
                      <SidebarChild name="Getting Started" baseURL="/docs/Guide/getting-started" sub>
                        <SidebarLink href="/docs/Guide/getting-started/getting-started-with-josh" name="Getting Started with Josh" sub />
                        <SidebarLink href="/docs/Guide/getting-started/using-providers" name="Using Providers" sub />
                      </SidebarChild>

                      <SidebarChild name="Middleware" baseURL="/docs/Guide/middleware" sub>
                        <SidebarLink href="/docs/Guide/middleware/what-is-middleware" name="What is Middleware?" sub />
                        <SidebarLink href="/docs/Guide/middleware/creating-middleware" name="Creating Middleware" sub />
                      </SidebarChild>
                    </SidebarChild>
                  </>
                }
              />

              <a href="https://discord.gg/N7ZKH3P" target="_blank" class="hover:text-emerald-500 block h-8 w-auto px-3 py-2 text-base">
                Discord
              </a>

              <a href="https://github.com/josh-development" target="_blank" class="hover:text-emerald-500 block h-8 w-auto px-3 py-2 text-base">
                GitHub
              </a>

              <div class="ml-1 rounded-full hover:bg-neutral-200 dark:hover:bg-slate-800 p-2" onClick={() => setIsDark(!isDark())}>
                {isDark() ? (
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        }
      />
    </nav>
  );
};

export default Header;
