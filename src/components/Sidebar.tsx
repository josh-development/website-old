import { useLocation, useNavigate } from 'solid-app-router';
import { Component, createEffect, createSignal, Show } from 'solid-js';

const SidebarChild: Component<{ name: string; baseURL: string }> = (props) => {
  const [open, setOpen] = createSignal(false);
  const { pathname } = useLocation();

  createEffect(() => {
    if (pathname.startsWith(props.baseURL)) setOpen(true);
  });

  return (
    <section class="text-lg font-normal">
      <div
        onClick={() => setOpen(!open())}
        class="block cursor-pointer p-1 px-4 my-1 rounded-md transition ease-in-out hover:bg-neutral-200 dark:hover:bg-slate-800 duration-300"
      >
        <span class={pathname.startsWith(props.baseURL) ? 'text-emerald-500' : ''}>{props.name}</span>
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

const SideBarLink: Component<{ name: string; href: string }> = (props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <span
      onClick={() => navigate(props.href)}
      class={`block ml-6 pl-4 py-1 my-1 rounded-md cursor-pointer transition ease-in-out hover:bg-neutral-200 dark:hover:bg-slate-800 duration-300 ${
        pathname === props.href ? 'text-emerald-500' : ''
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
          <SideBarLink name="Welcome" href="/docs/General/Welcome" />
        </SidebarChild>

        <SidebarChild name="Guide" baseURL="/docs/Guide">
          <SideBarLink href="/docs/Guide/getting-started" name="Getting Started" />
          <SideBarLink href="/docs/Guide/using-providers" name="Using Providers" />
          <SideBarLink href="/docs/Guide/creating-middleware" name="Creating Middleware" />
        </SidebarChild>

        <SidebarChild name="Documentation" baseURL="/docs/Documentation">
          <SideBarLink href="/docs/Documentation/documentation" name="Documentation" />
        </SidebarChild>
      </div>
    </div>

    <div class="flex flex-col">{props.children}</div>
  </div>
);

export default Sidebar;
