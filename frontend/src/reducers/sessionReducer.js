const sessionReducer = (state = {username: 'Guest', balance: 0}, action) => {

    switch(action.type) {
        case 'SESSION/SETDATA':
            return action.payload;
        default:
            return state;
    }

};

export default sessionReducer;
