import { Component } from 'solid-js';
import Container from './Container';

const Markdown: Component = (props) => <Container class="markdown">{props.children}</Container>;

export default Markdown;
