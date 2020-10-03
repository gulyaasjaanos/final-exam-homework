import errorReducer from './errorReducer';
import itemReducer from './itemReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    error : errorReducer,
    items : itemReducer
});

export default rootReducer;
