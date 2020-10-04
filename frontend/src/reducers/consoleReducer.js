const consoleReducer = (state = '', action) => {

    switch(action.type) {
        case 'CONSOLE/LOG':
            return action.payload;
        default:
            return state;
    }

};

export default consoleReducer;
