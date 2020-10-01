import React from 'react';
import { useEffect, useState } from 'react';
import sessionService from '../services/sessionService';
import { Redirect } from 'react-router-dom';

function Login() {
    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect( () => {  
    
    if (sessionService.session()) setLoggedIn(true);

  }, [loggedIn]);

  
  const login = async () => {
    const token = await sessionService.login({ username, password });
    if (token) {
        localStorage.setItem('token',  token);
        setLoggedIn(true);
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
        <input type="text" value={username} onChange={(event) => changeUsername(event)}></input>
        <input type="password" value={password} onChange={(event) => changePassword(event)}></input>
        <button onClick={login}>LOGIN</button>
      </nav>
    );
  }
    
}

export default Login;
