import { Component } from 'solid-js';
import Header from '../../../../components/Header';
import Markdown from '../../../../components/Markdown';
import Sidebar from '../../../../components/Sidebar';
import WhatIsMiddleware from '../../../../docs/Guide/middleware/WhatIsMiddleware.mdx';

const WhatIsMiddlewarePage: Component = () => {
  document.title = 'What is Middleware? | Josh';

  return (
    <>
      <Header />

      <Sidebar>
        <Markdown>
          <WhatIsMiddleware />
        </Markdown>
      </Sidebar>
    </>
  );
};

export default WhatIsMiddlewarePage;
