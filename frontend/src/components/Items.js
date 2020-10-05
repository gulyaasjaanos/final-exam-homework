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
      case 'name':
        return <li className="gridHeader" key={key}>{item[key]}</li>;
      case 'description':
          return <li className="gridLeft" key={key}>{item[key]}</li>;
      case 'url':
        return  <li className="gridRight" key={key}><img src={item[key]} alt={item[key]} /></li>;
      case 'price':
          return  <li className="gridFooter" key={key}>{item[key]} GB$</li>;
      default:
        return <li key={key}>{item[key]}</li>;
    }
  };

  return (
    <>
      <header>ITEMS FOR SALE</header>
      <article className='itemlist'>
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
      </article>
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
