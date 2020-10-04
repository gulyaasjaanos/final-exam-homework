import React from 'react';
import { Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WithSession from './WithSession';
import itemService from '../services/itemService';
import { consoleLogAction, setUserDataAction } from '../actions';
import { connect } from 'react-redux';

function SingleItem({console, consoleLog, setUserData}) {

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
          consoleLog(getItem.error);
        }
      });

  }, [id, consoleLog]);

  const buy = async () => {

      itemService.buy(id)
      .then( getItem => {
        if (!getItem.error) {
          setItem(getItem);
          if (!getItem.ownername) setCanBuy(false);
          setUserData();
          consoleLog('You have bought this item.');
        } else {
          consoleLog(getItem.error);
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
          <ul className='itemCard' >
            {Object.keys(item).map( (key,i) => (<li key={i}>{item[key]}</li>) )}
          </ul>
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
    console: state.console,
  }
);

const mapDispatchToProps = dispatch => (
  {
    consoleLog: (message) => dispatch( consoleLogAction(message) ),
    setUserData: () => dispatch( setUserDataAction() )
  }
);
 
export default connect(mapStateToProps,mapDispatchToProps)( WithSession(SingleItem) );

