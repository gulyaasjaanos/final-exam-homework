import consoleReducer from './consoleReducer';
import itemReducer from './itemReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    console : consoleReducer,
    items : itemReducer
});

export default rootReducer;
