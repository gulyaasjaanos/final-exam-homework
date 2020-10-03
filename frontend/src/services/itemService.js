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

const validateParams = ({ itemname, description, url, price }) => {

    const regexItemname = /\w{2,}/;
    const regexDescription = /\w{2,}/;
    const regexPrice = /^[+]?\d*$/;
    const regexUrl = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
    if (!regexItemname.test(itemname)) return {error: 'Itemname has to be at least 2 characters.'};
    if (!regexDescription.test(description)) return {error: 'Description has to be at least 2 characters.'};
    if (!regexUrl.test(url)) return {error: 'URL has to be in valid format.'};
    if (!regexPrice.test(price)) return {error: 'Price has to be a positive whole number.'};
    return false;

};

const sell = async ({itemname, description, url, price}) => {

    const validationError = validateParams({ itemname, description, url, price }).error;
    if (validationError) return {error: validationError};
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
