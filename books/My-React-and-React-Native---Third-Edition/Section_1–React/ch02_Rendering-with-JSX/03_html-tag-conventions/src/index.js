import React from 'react';
import { render } from 'react-dom';

render(
  <button title="My Button" foo="bar">
    My Button
  </button>,
  document.getElementById('root')
);

render(<button />, document.getElementById('root'));
