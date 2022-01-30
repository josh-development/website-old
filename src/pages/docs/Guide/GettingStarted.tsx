import { Component } from 'solid-js';
import Header from '../../../components/Header';
import Markdown from '../../../components/Markdown';
import GettingStarted from '../../../docs/Guide/GettingStarted.mdx';

const GettingStartedPage: Component = () => {
  document.title = 'Getting Started | Josh';

  return (
    <>
      <Header id="guide" />

      <Markdown>
        <GettingStarted />
      </Markdown>
    </>
  );
};

export default GettingStartedPage;
