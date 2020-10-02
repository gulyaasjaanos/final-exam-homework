import React from 'react';
import { connect } from 'react-redux';

function ConsoleComponent({ error }) {

  return (
    <p>{error}</p>
  );
    
};

const mapStateToProps = state => (
  {
    error: state.error,
  }
);

export const Console = connect(mapStateToProps)( ConsoleComponent );
