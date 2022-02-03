import { Component, createEffect, Show, useContext } from 'solid-js';
import { AppContext } from '../App';

export const ThemeToggle: Component = () => {
  const [state, setState] = useContext(AppContext);

  createEffect(() => {
    localStorage.setItem('theme', state().theme);

    if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  });

  return (
    <button
      onClick={() => setState((state) => ({ ...state, theme: state.theme === 'dark' ? 'light' : 'dark' }))}
      class="rounded-full hover:bg-neutral-200 hover:dark:bg-neutral-700 dark:text-white p-2 cursor-pointer"
    >
      <Show
        when={state().theme === 'dark'}
        fallback={
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        }
        children={
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        }
      />
    </button>
  );
};
