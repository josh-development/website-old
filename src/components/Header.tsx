import { Link } from 'solid-app-router';
import { Component } from 'solid-js';

const Header: Component<{ id: string }> = (props) => (
  <nav class="bg-white shadow-md" id={props.id}>
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

                <a href="https://github.com/josh-development" target="_blank" class="hover:text-emerald-500 px-3 py-2 text-base">
                  GitHub
                </a>
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

export default Header;
