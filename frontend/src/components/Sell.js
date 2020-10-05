import React from 'react';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import WithSession from './WithSession';
import itemService from '../services/itemService';
import { consoleLogAction } from '../actions';
import { connect } from 'react-redux';
import '../styling/sell.css';


function Sell({console, consoleLog}) {

  const [itemname, setItemname] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState('');
  const [canSell, setCanSell] = useState(false);
  const [menuSelection, setMenuSelection] = useState(null);

  const back = async () => {  
    setMenuSelection('back');
  };

  const changeField = (target,e) => {
    switch(target) {
      case 'itemname':
        setItemname(e.target.value);
        break;
      case 'description':
        setDescription(e.target.value);
        break;
      case 'url':
        setUrl(e.target.value);
        break;
      case 'price':
        setPrice(e.target.value);
        break;
      default:
        break;
    }
    if (!e.target.value) setCanSell(false);
    if (itemname && description && url && price) {
      setCanSell(true);
    } else {
      setCanSell(false);
    }
  };

  const sellItem = () => {

    itemService.sell({itemname, description, url, price})
      .then( getItem => {
        if (!getItem.error) {
          setMenuSelection('sold');
          consoleLog('You have offered this item for sale.');
        } else {
          consoleLog(getItem.error);
        }
      });

  };

  switch(menuSelection) {
    case 'sold':
      return (
        <>
          <button onClick={back}>BACK</button>
        </>
      );
    case 'back':
      return (<Redirect push to={'/items'} />);
    default:
      return (
        <>
          <header>Sell this item:</header>
          <form>
            <p>itemname: <input type="text" value={itemname} onChange={(event) => changeField('itemname',event)}></input></p>
            <p>description: <textarea value={description} onChange={(event) => changeField('description',event)}></textarea></p>
            <p>url: <input type="text" value={url} onChange={(event) => changeField('url',event)}></input></p>
            <p>price: <input type="text" value={price} onChange={(event) => changeField('price',event)}></input></p>
          </form>
          { (canSell) ? <button onClick={sellItem}>SELL ITEM</button> : null }
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
    consoleLog: (message) => dispatch( consoleLogAction(message) )
  }
);
 
export default connect(mapStateToProps,mapDispatchToProps)( WithSession(Sell) );

