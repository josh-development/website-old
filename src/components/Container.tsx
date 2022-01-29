import { Component } from 'solid-js';

const Container: Component = ({ children }) => {
  return <section class="container mx-auto mt-12 text-center rounded-md min-h-screen">{children}</section>;
};

export default Container;
