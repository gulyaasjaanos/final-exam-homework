const sessionReducer = (state = localStorage.getItem('username') || 'Stranger', action) => {

    switch(action.type) {
        case 'SESSION/SETNAME':
            return action.payload;
        default:
            return state;
    }

};

export default sessionReducer;
