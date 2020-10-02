const itemReducer = (state = '', action) => {

    switch(action.type) {
        case 'ITEM/LISTITEMS':
            return action.payload;
        default:
            return state;
    }

};

export default itemReducer;
