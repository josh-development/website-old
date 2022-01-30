import highlight from 'highlight.js';
import { Component, onMount } from 'solid-js';
import Container from './Container';

const Markdown: Component = (props) => {
  onMount(() => highlight.highlightAll());

  return <Container class="markdown">{props.children}</Container>;
};

export default Markdown;
