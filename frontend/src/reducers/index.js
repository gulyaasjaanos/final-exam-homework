import consoleReducer from './consoleReducer';
import itemReducer from './itemReducer';
import sessionReducer from './sessionReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    session : sessionReducer,
    console : consoleReducer,
    items : itemReducer
});

export default rootReducer;
