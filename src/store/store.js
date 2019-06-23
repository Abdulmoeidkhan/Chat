import { createStore, combineReducers } from 'redux';
import {SignInReducer,FireReducer} from "../reducers/reducers";

export default createStore(
    combineReducers({
        SignInReducer,
        FireReducer
    }),
)   