import {combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import contacts from './contactReducer';




export default combineReducers({
    form: formReducer
});