import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <div className="flex p-2">
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}