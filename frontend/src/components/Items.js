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

  const keyHandler = (item,key) => {
    switch (key) {
      case 'id':
        return null;
      case 'url':
        return  <li key={key}><img src={item[key]} alt={item[key]} /></li>;
      case 'price':
          return  <li key={key}>{item[key]} GB$</li>;
      default:
        return <li key={key}>{item[key]}</li>;
    }
  };

  return (
    <>
      <p>ITEMS FOR SALE</p>
      { items.map( item => (
        <Link to={`/items/${item.id}`} key={item.id}>
          <ul className='itemCard' >
            {Object.keys(item).map( key => {
                return keyHandler(item,key);
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
