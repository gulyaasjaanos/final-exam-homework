import itemService from '../services/itemService';

export const adderror = message => (
    {
        type : 'ERROR/ADDERROR',
        payload : message
    }
);

export const listitems = () => async dispatch => {

    const items = await itemService.list();
    dispatch(
        {
            type : 'ITEM/LISTITEMS',
            payload : items
        }
    );

};

export const getitem = (id) => async dispatch => {

    const item = await itemService.get(id);
    dispatch(
        {
            type : 'ITEM/GETITEM',
            payload : item
        }
    );

};
