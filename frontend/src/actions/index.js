import itemService from '../services/itemService';
import sessionService from '../services/sessionService';

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

export const setUserDataAction = () => async dispatch => {
    
    const userData = await sessionService.userData();
    dispatch(
        {
            type : 'SESSION/SETDATA',
            payload : userData
        }
    );

};
