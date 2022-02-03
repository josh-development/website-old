import { Component } from 'solid-js';
import { Container } from '../components/Container';
import { Page } from '../components/Page';

const NotFound: Component = () => (
  <Page name="Page Not Found">
    <Container>
      <h1 class="text-6xl py-2">Page Not Found</h1>
      <p class="text-lg py-2">We could not find what you're looking for.</p>
    </Container>
  </Page>
);

export default NotFound;
