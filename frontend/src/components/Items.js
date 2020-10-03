import React from 'react';
import { useEffect } from 'react';
import WithSession from './WithSession';
import { listitems } from '../actions';
import { connect } from 'react-redux';

function Items({items, listitems}) {

  useEffect( () => {  

    console.log('listing items')
    listitems();

  }, [listitems]);

  return (
    <p>CONTENT HERE</p>
  );
    
};

const mapStateToProps = state => (
  {
    items: state.items,
  }
);


const mapDispatchToProps = dispatch => (
  {
    listitems: () => dispatch( listitems() )
  }
);


export default connect(mapStateToProps,mapDispatchToProps)( WithSession(Items) );
