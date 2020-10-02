import errorReducer from './errorReducer';
import itemReducer from './itemReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    error : errorReducer,
    item : itemReducer
});

export default rootReducer;
