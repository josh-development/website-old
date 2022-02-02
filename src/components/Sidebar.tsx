import { useLocation, useNavigate } from 'solid-app-router';
import { Component, createEffect, createSignal, Show } from 'solid-js';

const SidebarChild: Component<{ name: string; baseURL: string; depth?: number }> = (props) => {
  props.depth ??= 0;

  const [open, setOpen] = createSignal(false);
  const { pathname } = useLocation();

  createEffect(() => {
    if (pathname.startsWith(props.baseURL)) setOpen(true);
  });

  return (
    <section class="text-lg text-slate-300">
      <div
        onClick={() => setOpen(!open())}
        class="block cursor-pointer p-1 px- my-1 rounded-md transition ease-in-out hover:bg-neutral-200 dark:hover:bg-slate-800 duration-300"
      >
        <span class={pathname.startsWith(props.baseURL) ? `text-emerald-500 ml-${props.depth * 4}` : `ml-${props.depth * 4}`}>{props.name}</span>
        <span class="float-right mt-1.5 text-slate-400">
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

      <Show when={open()} children={props.children} />
    </section>
  );
};

const SidebarLink: Component<{ name: string; href: string; depth?: number }> = (props) => {
  props.depth ??= 0;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <span
      onClick={() => navigate(props.href)}
      class={`block pl-4 py-1 my-1 ml-${
        props.depth * 4 + 6
      } rounded-md cursor-pointer transition ease-in-out hover:bg-neutral-200 dark:hover:bg-slate-800 duration-300 ${
        pathname === props.href ? 'text-emerald-500 bg-neutral-200 dark:bg-slate-800' : ''
      }`}
    >
      {props.name}
    </span>
  );
};

const Sidebar: Component = (props) => (
  <div class="min-h-screen flex flex-row">
    <div class="flex flex-col w-1/5 overflow-hidden shadow-md dark:shadow-slate-800 bg-neutral-100 dark:bg-slate-900">
      <div class="py-4 px-4 dark:text-white">
        <SidebarChild name="General" baseURL="/docs/General">
          <SidebarLink name="Welcome" href="/docs/General/Welcome" />
        </SidebarChild>

        <SidebarChild name="Guide" baseURL="/docs/Guide">
          <SidebarChild name="Getting Started" baseURL="/docs/Guide/getting-started" depth={1}>
            <SidebarLink href="/docs/Guide/getting-started/getting-started-with-josh" name="Getting Started with Josh" />
            <SidebarLink href="/docs/Guide/getting-started/using-providers" name="Using Providers" />
          </SidebarChild>

          <SidebarChild name="Middleware" baseURL="/docs/Guide/middleware" depth={1}>
            <SidebarLink href="/docs/Guide/middleware/what-is-middleware" name="What is Middleware?" />
            <SidebarLink href="/docs/Guide/middleware/creating-middleware" name="Creating Middleware" />
          </SidebarChild>
        </SidebarChild>

        <SidebarChild name="Documentation" baseURL="/docs/Documentation">
          <SidebarLink href="/docs/Documentation/documentation" name="Documentation" />
        </SidebarChild>
      </div>
    </div>

    <div class="flex flex-col">{props.children}</div>
  </div>
);

export default Sidebar;
