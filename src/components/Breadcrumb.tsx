import { useLocation } from 'solid-app-router';
import { Component } from 'solid-js';

export const BreadcrumbItem: Component<{ name: string; href?: string; noHover?: boolean }> = (props) => {
  const { pathname } = useLocation();

  return (
    <li class='inline-flex items-center'>
      <svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 mx-2 text-slate-400' viewBox='0 0 20 20' fill='currentColor'>
        <path
          fill-rule='evenodd'
          d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
          clip-rule='evenodd'
        />
      </svg>
      <a
        class={`inline-flex space-x-1 ${pathname === props.href && !props.noHover ? 'text-emerald-500' : 'hover:text-emerald-500'}`}
        href={props.href}
      >
        {props.name}
      </a>
    </li>
  );
};

export const Breadcrumb: Component = (props) => (
  <nav class='hidden sm:flex dark:text-white sm:ml-8'>
    <ul class='inline-flex bg-neutral-100 dark:bg-slate-900 rounded-md shadow-md w-full p-4 items-center space-x-1 md:space-x-3'>
      <li class='inline-flex items-center'>
        <a class='hover:text-emerald-500 inline-flex space-x-1' href='/'>
          <svg xmlns='http://www.w3.org/2000/svg' class='text-slate-400 h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
            <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
          </svg>
          <span>Home</span>
        </a>
      </li>

      {props.children}
    </ul>
  </nav>
);
