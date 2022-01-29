import { Component } from 'solid-js';

const Container: Component<{ class?: string }> = (props) => {
  return <section class={`container text-center min-h-screen${props.class?.length ? ` ${props.class}` : ''}`}>{props.children}</section>;
};

export default Container;
