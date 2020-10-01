import { env } from '../env';

/*const isAuthenticated = () => {
  return new Promise(resolve => {
    fetch(`${env.BACKEND_URL}/api/auth`, {
      method: 'POST',
      headers: {
        TRIBES_TOKEN: localStorage.getItem('TRIBES_TOKEN'),
      },
    })
      .then(result => result.json())
      .then(json => {
        if (json.userId) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
  });
};

export const authService = {
  isAuthenticated,
};*/

const session =  () => {

    if (!localStorage.getItem('token')) return false;
    const result =  
        fetch(`${env.BACKEND_URL}/api/session`, {
            method: 'POST',
            headers: {
              token: localStorage.getItem('token'),
            },
          })
            .then(result => result.json())
            .then(json => json.token);
    return (result.userid)? true : false;

};

const sessionService = {
    session,

};

export default sessionService;
