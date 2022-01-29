import { Component } from 'solid-js';
import Container from '../components/Container';
import Header from '../components/Header';

const NotFound: Component = () => (
  <>
    <Header id="404" />
    <Container>
      <h1 class="text-6xl py-2">Page Not Found</h1>
      <p class="text-lg py-2">We could not find what you're looking for.</p>
    </Container>
  </>
);

export default NotFound;
