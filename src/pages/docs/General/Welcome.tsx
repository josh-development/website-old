import { Component, useContext } from 'solid-js';
import { AppContext } from '../../../App';
import { DocsPage } from '../../../components/DocsPage';
import { Markdown } from '../../../components/Markdown';
import Welcome from '../../../docs/General/Welcome.mdx';

const WelcomePage: Component = () => {
  const [state] = useContext(AppContext);

  return (
    <DocsPage name="Welcome | Josh">
      <Markdown>
        <img src={`/src/assets/josh-${state().theme}.png`} alt="Josh Logo" />

        <Welcome />
      </Markdown>
    </DocsPage>
  );
};

export default WelcomePage;
