/*
*BZ0015            060321     Setup redux-saga for project
************************************************************************
*/
import { combineReducers } from 'redux';

import users from './userLoginReducers';
import usersGetALL from './userReducer';


export default combineReducers({
    users,
    usersGetALL,
    
});
