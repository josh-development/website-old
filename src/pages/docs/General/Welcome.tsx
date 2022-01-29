import { Component } from 'solid-js';
import Header from '../../../components/Header';
import Welcome from '../../../docs/General/Welcome.mdx';

const WelcomePage: Component = () => (
  <>
    <Header id="docs" />
    <Welcome />
  </>
);

export default WelcomePage;
