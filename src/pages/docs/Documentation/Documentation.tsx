import { Component } from 'solid-js';
import { Container } from '../../../components/Container';
import { DocsPage } from '../../../components/DocsPage';

const DocumentationPage: Component = () => (
  <DocsPage name="Documentation">
    <Container>
      <h1 class="text-6xl py-2">Documentation</h1>
      <p class="text-lg py-2">This is currently a work-in-progress</p>
    </Container>
  </DocsPage>
);

export default DocumentationPage;
