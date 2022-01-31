import { Component, useContext } from 'solid-js';
import { ThemeContext } from '../../../App';
import Header from '../../../components/Header';
import Markdown from '../../../components/Markdown';
import Sidebar from '../../../components/Sidebar';
import Welcome from '../../../docs/General/Welcome.mdx';

const WelcomePage: Component = () => {
  document.title = 'Welcome | Josh';

  const [theme] = useContext(ThemeContext);

  return (
    <>
      <Header />

      <Sidebar>
        <Markdown>
          <img src={`/src/assets/josh-${theme()}.png`} alt="Josh Logo" />

          <Welcome />
        </Markdown>
      </Sidebar>
    </>
  );
};

export default WelcomePage;
