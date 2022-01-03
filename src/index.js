import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AuthUserContextProvider from './contexts/AuthUserContext';

ReactDOM.render(
  <AuthUserContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthUserContextProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
