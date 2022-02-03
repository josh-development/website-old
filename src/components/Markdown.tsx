import highlight from 'highlight.js';
import { Component, createEffect, useContext } from 'solid-js';
import { AppContext } from '../App';
import { Container } from './Container';

export const Markdown: Component = (props) => {
  const [state] = useContext(AppContext);

  createEffect(() => {
    state();
    highlight.highlightAll();
  });

  return <Container class="markdown">{props.children}</Container>;
};
