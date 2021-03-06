import React from 'react';
import { useEffect, useState } from 'react';
import sessionService from '../services/sessionService';
import { Redirect } from 'react-router-dom';
import { consoleLogAction } from '../actions';
import { connect } from 'react-redux';

function Login({console, consoleLog }) {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect( () => {  

    sessionService.session()
      .then( session => {
        if (session) setLoggedIn(true)
      });

  }, []);

  
  const login = async () => {
    const logged = await sessionService.login({ username, password });
    if (logged.token) {
        localStorage.setItem('token',  logged.token);
        localStorage.setItem('username',  username);
        setLoggedIn(true);
        consoleLog('');
    } else {
      consoleLog(logged.error);
    }
  };

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  }; 

  if (loggedIn) {
    return (<Redirect push to={'/items'} />);
  } else {
    return (
      <nav>
        <header>Hi Stranger</header>
        <input type="text" value={username} placeholder="username" onChange={(event) => changeUsername(event)}></input>
        <input type="password" value={password} placeholder="password" onChange={(event) => changePassword(event)}></input>
        <button onClick={login}>LOGIN</button>
      </nav>
    );
  }

}

const mapStateToProps = state => (
  {
    console: state.console
  }
);

const mapDispatchToProps = dispatch => (
  {
    consoleLog: (message) => dispatch( consoleLogAction(message) )
  }
);
 

export default connect(mapStateToProps,mapDispatchToProps)( Login );
