import { Router, useRoutes } from 'solid-app-router';
import { createContext, createSignal } from 'solid-js';
import { Signal } from 'solid-js/types/reactive/signal';
import { CodeblockIndex } from './components/Codeblock';
import { routes } from './constants/routes';

export interface IAppContext {
  theme: Theme;

  tabs: Tabs;
}

export type Theme = 'dark' | 'light';

export interface Tabs {
  TYPESCRIPT_ESM_COMMONJS: CodeblockIndex.TypeScript | CodeblockIndex.ESM | CodeblockIndex.CommonJS;

  NPM_YARN: CodeblockIndex.NPM | CodeblockIndex.Yarn;
}

export const AppContext = createContext<Signal<IAppContext>>();

export default function App() {
  const [state, setState] = createSignal<IAppContext>({
    theme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
    tabs: {
      TYPESCRIPT_ESM_COMMONJS: CodeblockIndex.TypeScript,
      NPM_YARN: CodeblockIndex.NPM
    }
  });

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) setState((state) => ({ ...state, theme: 'dark' }));

  const Routes = useRoutes(routes);

  return (
    <AppContext.Provider
      value={[state, setState]}
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
