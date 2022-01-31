import { Router, useRoutes } from 'solid-app-router';
import { createContext, createSignal } from 'solid-js';
import { Signal } from 'solid-js/types/reactive/signal';
import { routes } from './constants/routes';

export const ThemeContext = createContext<Signal<string>>([() => 'light', () => 'light' as any]);

export default function App() {
  const [theme, setTheme] = createSignal(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');

  const Routes = useRoutes(routes);

  return (
    <ThemeContext.Provider
      value={[theme, setTheme]}
      children={
        <Router
          children={
            <div class="font-medium bg-stone-200 dark:bg-slate-800">
              <Routes />
            </div>
          }
        />
      }
    />
  );
}
