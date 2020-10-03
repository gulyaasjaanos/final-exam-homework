import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WithSession from './WithSession';
import { listitems } from '../actions';
import { connect } from 'react-redux';

function SingleItem({items, listitems}) {


  const { id } = useParams();

  useEffect( () => {  

    console.log('listing items')
    listitems();

  }, [listitems]);

  return (
    <p>ID: {id}</p>
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


export default connect(mapStateToProps,mapDispatchToProps)( WithSession(SingleItem) );
