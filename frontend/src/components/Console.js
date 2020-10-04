import React from 'react';
import { connect } from 'react-redux';

function Console({ console }) {

  return (
    <p className={console}>{console}</p>
  );
    
};

const mapStateToProps = state => (
  {
    console: state.console,
  }
);

export default connect(mapStateToProps)( Console );
