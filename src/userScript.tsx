import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { setup as setupSpatialNavigation } from './setupSpatialNavigation';

import './tailwind.css';
import './styles.css';

setupSpatialNavigation();

window.addEventListener('load', () => {
  console.info('Injecting app');

  // enable tailwindcss dark mode colors
  window.document.documentElement.classList.add('dark');

  const container = document.createElement('div');
  container.id = 'root';

  // add tailwindcss preflight styles to the container
  container.classList.add('tw-preflight');

  document.body.append(container);

  const root = createRoot(container);
  root.render(<App />);
});
