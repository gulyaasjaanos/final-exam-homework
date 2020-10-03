import { env } from '../env';

const list = async () => {
    const result =  
        await fetch(`${env.BACKEND_URL}/api/items`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                token: localStorage.getItem('token'),
            },
          })
            .then(result => result.json());
    return result;
};

const get = async (id) => {
    const result =  
        await fetch(`${env.BACKEND_URL}/api/items/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                token: localStorage.getItem('token'),
            },
          })
            .then(result => result.json());
    return result;
};

const buy = async (id) => {
    const result =  
        await fetch(`${env.BACKEND_URL}/api/items/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                token: localStorage.getItem('token'),
            },
          })
            .then(result => result.json());
    return result;
};

const itemService = {
    list,
    get,
    buy
};

export default itemService;
