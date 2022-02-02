import { Component } from 'solid-js';
import Header from '../../../../components/Header';
import Markdown from '../../../../components/Markdown';
import Sidebar from '../../../../components/Sidebar';
import CreatingMiddleware from '../../../../docs/Guide/middleware/CreatingMiddleware.mdx';

const CreatingMiddlewarePage: Component = () => {
  document.title = 'Creating Middleware | Josh';

  return (
    <>
      <Header />

      <Sidebar>
        <Markdown>
          <CreatingMiddleware />
        </Markdown>
      </Sidebar>
    </>
  );
};

export default CreatingMiddlewarePage;
