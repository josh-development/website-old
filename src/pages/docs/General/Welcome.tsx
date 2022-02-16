import { Component, useContext } from 'solid-js';
import { App } from '../../../App';
import { DocsPage } from '../../../components/DocsPage';
import Welcome from '../../../docs/General/Welcome.mdx';

const WelcomePage: Component = () => {
  const [state] = useContext(App.Context);

  return (
    <DocsPage name='Welcome' breadcrumbItems={[{ name: 'Welcome', href: '/docs/General/Welcome' }]}>
      <img src={`/src/assets/josh-${state().theme}.png`} alt='Josh Logo' />

      <Welcome />
    </DocsPage>
  );
};

export default WelcomePage;
