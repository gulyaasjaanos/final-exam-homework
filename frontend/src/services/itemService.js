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

const sell = async ({itemname, description, url, price}) => {
    const result =  
        await fetch(`${env.BACKEND_URL}/api/items`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                token: localStorage.getItem('token'),
            },
            body: JSON.stringify({
                "itemname" : itemname,
                "description" : description,
                "url" : url,
                "price" : price
            })
          })
            .then(result => result.json());
    return result;
};

const itemService = {
    list,
    get,
    buy,
    sell
};

export default itemService;
