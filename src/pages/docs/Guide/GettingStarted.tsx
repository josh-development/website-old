import { Component } from 'solid-js';
import Header from '../../../components/Header';
import GettingStarted from '../../../docs/Guide/GettingStarted.mdx';

const GettingStartedPage: Component = () => (
  <>
    <Header id="guide" />
    <GettingStarted />
  </>
);

export default GettingStartedPage;
