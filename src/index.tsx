import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store'; // 👈 adjust path if needed

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}> {/* 👈 this gives Redux access to the whole app */}
      <App />
    </Provider>
  </React.StrictMode>
);
