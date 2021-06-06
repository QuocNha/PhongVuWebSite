/*
*BZ0015            060321     Setup redux-saga for project
*BZ00017           050621     Create validaton for Yup to login user
*BZ00019           060621     Using Token login for next reset
*BZ00020            060621     Get All User

************************************************************************
*/
import { call, put, takeLatest } from "redux-saga/effects";
import { actionTypes, loadDataFailure, loadDataSuccess,loadDataGetAllUseSuccess } from "../actions/userActions";
import loginUser from "../../constant.config.api/loginUser";
import checkToKen from "../../constant.config.api/checkToKen";
import getAllUserAPI from "../../constant.config.api/getAllUserAPI";

import Router from 'next/router';
function* loadDataSaga(name:any) {
  try {
    const response = yield call(loginUser,name.payload);
    //BEGIN BZ00017  
    if(response!=null && response.status==400){
      yield put(loadDataFailure(response.data)); 
    }else if(response!=null && response.status==200){
      yield put(loadDataSuccess(response.data));
      Router.push('/components/homePages/adminPages'); 
    }
    //END BZ00017
  } catch (err) {
    yield put(loadDataFailure(err));
  }
}
//BZ00019
function* loadDataCheckToken(name:any) {
  try {
    const response = yield call(checkToKen);
    //BEGIN BZ00017  
    if(response!=null && response.status==400){
       yield put(loadDataFailure(response.data)); 
    }else if(response!=null && response.status==200){
       yield put(loadDataSuccess(response.data));
    }
    //END BZ00017
  } catch (err) {
     yield put(loadDataFailure(err));
  }
}

//BEGIN BZ00020
function* loadDataGetAllUser(payload:any) {
  try {
    const response = yield call(getAllUserAPI);
      
    if(response!=null && response.status==400){
       yield put(loadDataFailure(response.data)); 
    }else if(response!=null && response.status==200){
       yield put(loadDataGetAllUseSuccess(response.data.data));
    }
    
  } catch (err) {
    // yield put(loadDataFailure(err));
  }
}
//END BZ00020
const sagas = [
  takeLatest(actionTypes.LOAD_DATA, loadDataSaga),
  takeLatest(actionTypes.CHECK_TOKEN, loadDataCheckToken),//BZ00019
  takeLatest(actionTypes.GET_ALL_USER, loadDataGetAllUser),
];

export default sagas;
