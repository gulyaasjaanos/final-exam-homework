const errorReducer = (state = 'no error', action) => {

    switch(action.type) {
        case 'ERROR/ADDERROR':
            return action.payload;
        default:
            return state;
    }

};

export default errorReducer;
