import { Component } from 'solid-js';
import Header from '../components/Header';

const HomePage: Component = () => (
  <>
    <Header id="home" />

    <div class="py-1">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <img src="/src/assets/josh.svg" />
          <p class="max-w-2xl text-2xl text-gray-700 lg:mx-auto font-semibold">A simple, effective, and efficient database wrapper.</p>
        </div>

        <div class="mt-10">
          <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p class="ml-16 text-lg leading-6 text-gray-900">About</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Josh is quite simply the easiest storage system solution you'll ever encounter. Josh makes it simple to store any JSON-based data
                effectively into any popular database back-end using providers
              </dd>
            </div>

            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p class="ml-16 text-lg leading-6 text-gray-900">Key Features</p>
              </dt>
              <dd class="mt-2 ml-20 text-base text-gray-500">
                <ul class="list-disc">
                  <li>Advanced middleware support</li>
                  <li>Supports both CommonJS and ESM</li>
                  <li>Designed with first class TypeScript support in mind</li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </>
);

export default HomePage;
