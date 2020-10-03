import React from 'react';
import { Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WithSession from './WithSession';
import itemService from '../services/itemService';
import { adderror } from '../actions';
import { connect } from 'react-redux';

function SingleItem({error, adderror}) {

  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [canBuy, setCanBuy] = useState(false);
  const [menuSelection, setMenuSelection] = useState(null)  

  useEffect( () => {  

    itemService.get(id)
      .then( getItem => {
        if (!getItem.error) {
          setItem(getItem);
          if (getItem.ownername) setCanBuy(true);
          setMenuSelection('itemview');
        } else {
          adderror(getItem.error);
        }
      });

  }, [id, adderror]);

  const buy = async () => {

      itemService.buy(id)
      .then( getItem => {
        if (!getItem.error) {
          setItem(getItem);
          if (!getItem.ownername) setCanBuy(false);
          adderror('You have bought this item.');
        } else {
          adderror(getItem.error);
        }
      });
      
  };

  const back = async () => {  
    setMenuSelection('back');
  };

  switch(menuSelection) {
    case 'itemview':
      return (
        <>
          <p>ID: {id}</p>
          { Object.keys(item).map( (e,i) => { return (<p key={i}>{item[e]}</p>) })}
          <button onClick={back}>BACK</button>
          { (canBuy) ? <button onClick={buy}>BUY</button> : null }
        </>
      );
    case 'back':
      return (<Redirect push to={'/items'} />);
    default:
      return (
        <>
          <button onClick={back}>BACK</button>
        </>
      );
  }
    
};

const mapStateToProps = state => (
  {
    error: state.error,
  }
);

const mapDispatchToProps = dispatch => (
  {
    adderror: (message) => dispatch( adderror(message) )
  }
);
 
export default connect(mapStateToProps,mapDispatchToProps)( WithSession(SingleItem) );

