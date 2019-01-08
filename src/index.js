import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import './components/content/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';



ReactDOM.render((
    <BrowserRouter>
            <App />
    </BrowserRouter>
), document.getElementById('root'));



