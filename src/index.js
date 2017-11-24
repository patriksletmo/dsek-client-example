import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const queryString = require('query-string');
const Cookies = require('js-cookie');

function parseTokenFromUrl() {
    const parsed = queryString.parse(window.location.search);
    if (parsed.token !== undefined) {
        Cookies.set('token', parsed.token);
        window.location = '/';
    }
}

parseTokenFromUrl();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
