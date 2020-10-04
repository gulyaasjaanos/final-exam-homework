import { env } from '../env';

const session = async () => {

    if (!localStorage.getItem('token')) return false;
    const userid = await fetch(`${env.BACKEND_URL}/api/session`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              token: localStorage.getItem('token'),
            },
        })
        .then(result => result.json())
        .then(json => json.token)
        .then(token => token.userid);
    return (userid)? true : false;

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
            .then(result => result.json());
    return result;

};

const userData = async () => {

    const userData = await fetch(`${env.BACKEND_URL}/api/session`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              token: localStorage.getItem('token'),
            },
        })
        .then(result => result.json())
        .then(json => json.userData);
    return (userData);

};

const sessionService = {
    session,
    login,
    userData
};

export default sessionService;
