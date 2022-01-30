import { Link } from 'solid-app-router';
import { Component, createEffect, createSignal, useContext } from 'solid-js';
import { ThemeContext } from '../App';

const Header: Component<{ id: string }> = (props) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [checked, setChecked] = createSignal<boolean>(theme() === 'dark');

  createEffect(() => {
    localStorage.setItem('theme', checked() ? 'dark' : 'light');

    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    } else document.documentElement.classList.remove('dark');

    setTheme(localStorage.getItem('theme'));
  });

  return (
    <nav class="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-md dark:shadow-slate-700 dark:text-white" id={props.id}>
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex-shrink-0 flex items-center">
              <img class="block h-8 w-auto" src="/src/assets/josh-icon.png" />
              <div class="hover:text-emerald-500 px-3 py-2 text-base">Josh</div>
            </div>

            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4">
                <Link href="/" class={props.id === 'home' ? 'text-emerald-500 px-3 py-2 text-base' : 'hover:text-emerald-500 px-3 py-2 text-base'}>
                  Home
                </Link>
                <Link
                  href="/docs/General/Welcome"
                  class={props.id === 'docs' ? 'text-emerald-500 px-3 py-2 text-base' : 'hover:text-emerald-500 px-3 py-2 text-base'}
                >
                  Documentation
                </Link>
                <Link
                  href="/docs/Guide/getting-started"
                  class={props.id === 'guide' ? 'text-emerald-500 px-3 py-2 text-base' : 'hover:text-emerald-500 px-3 py-2 text-base'}
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

                  <input
                    type="checkbox"
                    checked={checked()}
                    onClick={(event: PointerEvent) => setChecked((event.target as HTMLInputElement).checked)}
                    class="rounded-full block mt-3 text-base"
                  />
                  <div class="mt-2">
                    {checked() ? (
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

      <div class="sm:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            class={props.id === 'home' ? 'text-emerald-500 block px-3 py-2 text-base' : 'hover:text-emerald-500 block px-3 py-2 text-base'}
          >
            Home
          </Link>

          <Link
            href="/docs/General/Welcome"
            class={props.id === 'docs' ? 'text-emerald-500 block px-3 py-2 text-base' : 'hover:text-emerald-500 block px-3 py-2 text-base'}
          >
            Documentation
          </Link>

          <Link
            href="/docs/Guide/getting-started"
            class={props.id === 'guide' ? 'text-emerald-500 block px-3 py-2 text-base' : 'hover:text-emerald-500 block px-3 py-2 text-base'}
          >
            Guide
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
