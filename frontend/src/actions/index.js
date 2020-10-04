import itemService from '../services/itemService';

export const consoleLogAction = message => (
    {
        type : 'CONSOLE/LOG',
        payload : message
    }
);

export const listItemsAction = () => async dispatch => {

    const items = await itemService.list();
    dispatch(
        {
            type : 'ITEM/LISTITEMS',
            payload : items
        }
    );

};

export const setNameAction = username => (
    {
        type : 'SESSION/SETNAME',
        payload : username
    }
);
