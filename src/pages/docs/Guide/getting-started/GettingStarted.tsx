import { Component } from 'solid-js';
import Header from '../../../../components/Header';
import Markdown from '../../../../components/Markdown';
import Sidebar from '../../../../components/Sidebar';
import GettingStarted from '../../../../docs/Guide/getting-started/GettingStarted.mdx';

const GettingStartedPage: Component = () => {
  document.title = 'Getting Started | Josh';

  return (
    <>
      <Header />

      <Sidebar>
        <Markdown>
          <GettingStarted />
        </Markdown>
      </Sidebar>
    </>
  );
};

export default GettingStartedPage;
