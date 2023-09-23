import ReactDOM from 'react-dom';
import './index.css';

import React from 'react';
import App, {ThemeContext, UserContext} from './app';



ReactDOM.render(
    <App signedInUser={{name:'sss'}} theme={'Dark'} />,
    document.getElementById('root')
);