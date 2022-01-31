import { Component } from 'solid-js';
import Container from '../../../components/Container';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';

const DocumentationPage: Component = () => {
  document.title = 'Documentation | Josh';

  return (
    <>
      <Header />
      <Sidebar>
        <Container>
          <h1 class="text-6xl py-2">Documentation</h1>
          <p class="text-lg py-2">This is currently a work-in-progress</p>
        </Container>
      </Sidebar>
    </>
  );
};

export default DocumentationPage;
