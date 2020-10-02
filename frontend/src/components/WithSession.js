import React,{useState,useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import sessionService from '../services/sessionService';

const WithSession = (Component) => {
    return function WithSessionComponent({...props}) {

        const [loggedIn, setLoggedIn] = useState(null)

        useEffect( () => {  

            sessionService.session()
            .then( session => {
                if (session) {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            });

        }, []);

        if (loggedIn === null) return null;
        if (!loggedIn) return (<Redirect push to={'/'} />);
        if (loggedIn) return ( <Component {...props} /> );
    };
};

export default WithSession;
