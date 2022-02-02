import { Component } from 'solid-js';
import Header from '../../../../components/Header';
import Markdown from '../../../../components/Markdown';
import Sidebar from '../../../../components/Sidebar';
import UsingProviders from '../../../../docs/Guide/getting-started/UsingProviders.mdx';

const UsingProvidersPage: Component = () => {
  document.title = 'Using Providers | Josh';

  return (
    <>
      <Header />

      <Sidebar>
        <Markdown>
          <UsingProviders />
        </Markdown>
      </Sidebar>
    </>
  );
};

export default UsingProvidersPage;
