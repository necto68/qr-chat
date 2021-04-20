import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Root } from './root/components';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './index.css';

render(
  <StrictMode>
    <Root />
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
