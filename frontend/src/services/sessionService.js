import { env } from '../env';

const session =  () => {

    if (!localStorage.getItem('token')) return false;
    const result =  
        fetch(`${env.BACKEND_URL}/api/session`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              token: localStorage.getItem('token'),
            },
          })
            .then(result => result.json())
            .then(json => json.token);
    return (result.userid)? true : false;

};

const login = async({ username, password }) => {

    const result =  
        await fetch(`${env.BACKEND_URL}/api/session`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
          })
            .then(result => result.json())
            .then(json => json.token);
    return result;

};

const sessionService = {
    session,
    login
};

export default sessionService;
