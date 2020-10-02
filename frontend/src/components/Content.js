import React from 'react';
import WithSession from './WithSession';

function Content() {

  return (
    <p>CONTENT HERE</p>
  );
    
};

export default WithSession(Content);
