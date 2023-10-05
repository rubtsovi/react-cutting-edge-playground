import React from 'react';

import { DevSupport } from '@react-buddy/ide-toolbox';
import ReactDOM from 'react-dom/client';

import { ComponentPreviews } from '_src/dev';

import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DevSupport ComponentPreviews={ComponentPreviews}>
      <App />
    </DevSupport>
  </React.StrictMode>
);
