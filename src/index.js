import React from 'react';
import ReactDOM from 'react-dom/client';

import './utils/styles/body.css';
import './utils/styles/app.css';
import './utils/styles/header.css';
import './utils/styles/footer.css';
import './utils/styles/activityFeed.css';
import './utils/styles/detail.css';
import './utils/styles/nav.css';

import App from './containers/App';
// =====================================================

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);