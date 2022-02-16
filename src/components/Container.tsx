import { Component } from 'solid-js';

export const Container: Component<{ class?: string }> = (props) => {
  return (
    <section
      class={
        props.class?.length
          ? `dark:text-white my-2 sm:my-8 container min-h-screen ${props.class}`
          : 'dark:text-white my-2 sm:my-8 container min-h-screen'
      }
    >
      {props.children}
    </section>
  );
};
