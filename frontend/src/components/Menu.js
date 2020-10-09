import React from 'react';
import { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import WithSession from './WithSession';
import { setUserDataAction } from '../actions';
import { connect } from 'react-redux';
import '../styling/menu.css';

function Menu({userData, setUserData}) {

  const [menuSelection, setMenuSelection] = useState(null)                 

  useEffect( () => {  

    setUserData();

  }, [setUserData]);

  const logout = () => {
    localStorage.removeItem('token', 'set');
    localStorage.removeItem('username', 'set');
    setMenuSelection('logout');
  };

  switch(menuSelection) {
    case 'logout':
      return (<Redirect push to={'/'} />);
    default:
      return (
        <header>
          <nav>
            <p>Hi <span>{userData.username}</span>! Your balance is: <span>{userData.dollar}</span> GB$.</p>
            <Link to="/sell">SELL</Link>
            <Link onClick={logout}>LOGOUT</Link>
          </nav>
          <img className="profileimg" src={userData.profileimg} alt="profile" />
        </header>
        
      );
  }

};

const mapStateToProps = state => (
  {
    userData: state.session,
  }
);

const mapDispatchToProps = dispatch => (
  {
    setUserData: () => dispatch( setUserDataAction() )
  }
);

export default connect(mapStateToProps, mapDispatchToProps)( WithSession(Menu) );
