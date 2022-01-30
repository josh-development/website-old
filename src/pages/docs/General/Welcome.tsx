import { Component, useContext } from 'solid-js';
import { ThemeContext } from '../../../App';
import Header from '../../../components/Header';
import Markdown from '../../../components/Markdown';
import Welcome from '../../../docs/General/Welcome.mdx';

const WelcomePage: Component = () => {
  document.title = 'Welcome | Josh';

  const [theme] = useContext(ThemeContext);

  return (
    <>
      <Header id="docs" />

      <Markdown>
        <img src={`/src/assets/josh-${theme()}.png`} alt="Josh Logo" />

        <Welcome />
      </Markdown>
    </>
  );
};

export default WelcomePage;
