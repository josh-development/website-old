import highlight from 'highlight.js';
import { Component, createEffect, useContext } from 'solid-js';
import { App } from '../App';
import { Container } from './Container';

export const Markdown: Component<{ class?: string; container?: boolean; disableHighlight?: boolean }> = (props) => {
  const [state] = useContext(App.Context);

  createEffect(() => {
    state();

    if (!props.disableHighlight) highlight.highlightAll();
  });

  return props.container ? (
    <Container>
      <section class={props.class?.length ? `markdown dark:text-white my-6 w-full ${props.class}` : 'markdown dark:text-white my-6 w-full'}>
        {props.children}
      </section>
    </Container>
  ) : (
    <section class={props.class?.length ? `markdown dark:text-white my-6 w-full ${props.class}` : 'markdown dark:text-white my-6 w-full'}>
      {props.children}
    </section>
  );
};
