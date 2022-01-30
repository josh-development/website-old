import { Component } from 'solid-js';

const Container: Component<{ class?: string }> = (props) => {
  return (
    <section
      class={
        props.class?.length ? `dark:text-white my-6 py-12 container min-h-screen ${props.class}` : 'dark:text-white my-24 container min-h-screen'
      }
    >
      {props.children}
    </section>
  );
};

export default Container;
