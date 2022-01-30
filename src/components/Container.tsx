import { Component } from 'solid-js';

const Container: Component<{ class?: string; center?: boolean }> = (props) => {
  return (
    <section
      class={`dark:text-white my-24 container min-h-screen${props.class?.length ? ` ${props.class}` : ''}${props.center ? ' text-center' : ''}`}
    >
      {props.children}
    </section>
  );
};

export default Container;
