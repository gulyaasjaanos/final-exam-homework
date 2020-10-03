import React from 'react';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import WithSession from './WithSession';
import itemService from '../services/itemService';
import { adderror } from '../actions';
import { connect } from 'react-redux';

function Sell({error, adderror}) {

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
          <p>Sell this item:</p>
          itemname: <input type="text" value={itemname} onChange={(event) => changeField('itemname',event)}></input>
          description: <input type="text" value={description} onChange={(event) => changeField('description',event)}></input>
          url: <input type="text" value={url} onChange={(event) => changeField('url',event)}></input>
          price: <input type="text" value={price} onChange={(event) => changeField('price',event)}></input>
          { (canSell) ? <button onClick={console.log()}>SELL</button> : null }
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
 
export default connect(mapStateToProps,mapDispatchToProps)( WithSession(Sell) );

