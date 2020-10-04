const itemReducer = (state = [], action) => {

    switch(action.type) {
        case 'ITEM/LISTITEMS':
            return Object.assign([], state, action.payload);
        default:
            return state;
    }

};

export default itemReducer;
