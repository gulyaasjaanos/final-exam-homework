import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import WithSession from './WithSession';
import { listItemsAction } from '../actions';
import { connect } from 'react-redux';

function Items({items, listItems}) {

  useEffect( () => {  

    listItems()

  }, [listItems]);

  return (
    <>
      <p>ITEMS FOR SALE</p>
      { items.map( item => (
        <Link to={`/items/${item.id}`} key={item.id}>
          <ul className='itemCard' >
            {Object.keys(item).map( (key,i) => {
                return (key !== 'id') ? (<li key={i}>{item[key]}</li>) : null
              }
            )}
          </ul>
        </Link>
      ))}
    </>
  );
    
};

const mapStateToProps = state => (
  {
    items: state.items,
  }
);


const mapDispatchToProps = dispatch => (
  {
    listItems: () => dispatch( listItemsAction() )
  }
);


export default connect(mapStateToProps,mapDispatchToProps)( WithSession(Items) );
