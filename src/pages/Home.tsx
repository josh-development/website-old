import { Component, useContext } from 'solid-js';
import { App } from '../App';
import { Container } from '../components/Container';
import { Page } from '../components/Page';

const HomePage: Component = () => {
  const [state] = useContext(App.Context);

  return (
    <Page name='Home'>
      <Container>
        <div class='py-1'>
          <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div class='lg:text-center'>
              <img src={`/src/assets/josh-${state().theme}.png`} alt='Josh Logo' />
              <p class='max-w-2xl text-2xl text-gray-700 dark:text-white lg:mx-auto font-semibold'>
                A simple, effective, and efficient database wrapper.
              </p>
            </div>

            <Container>
              <div class='mt-10'>
                <dl class='space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
                  <div class='relative'>
                    <dt>
                      <p class='ml-16 text-lg font-bold leading-6 text-gray-900 dark:text-white'>About</p>
                    </dt>
                    <dd class='mt-2 ml-16 text-base text-gray-500 dark:text-gray-200'>
                      Josh is quite simply the easiest storage system solution you'll ever encounter. Josh makes it simple to store any JSON-based
                      data effectively into any popular database back-end using providers
                    </dd>
                  </div>

                  <div class='relative'>
                    <dt>
                      <p class='ml-16 text-lg font-bold leading-6 text-gray-900 dark:text-white'>Key Features</p>
                    </dt>
                    <dd class='ml-16 mt-2 text-base text-gray-500 dark:text-gray-200'>
                      <ul class='list-none'>
                        <li>Advanced middleware support</li>
                        <li>Supports both CommonJS and ESM</li>
                        <li>Designed with first class TypeScript support in mind</li>
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </Container>
          </div>
        </div>
      </Container>
    </Page>
  );
};

export default HomePage;
