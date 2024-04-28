import React from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import './settings';
import './random';
import { initSetup as settingsInit } from './settings';
import { initSetup as randoInit } from './random';
import App from './App';

const setup = async () => {
  await settingsInit();
  randoInit();
}

const container = document.getElementById('root');
const root = createRoot(container!);
setup().then(() => {root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)});
