/*
*BZ0015            060321     Setup redux-saga for project
*BZ00017           050621     Create validaton for Yup to login user
*BZ00019           060621     Using Token login for next reset
*BZ00020            060621     Get All User
*BZ00021            060621     Paganation for List User
*BZ00025            080621     Create AddUser API


************************************************************************
*/
import { call, put, takeLatest } from "redux-saga/effects";
import { actionTypes, loadDataFailure, loadDataSuccess,loadDataGetAllUseSuccess,loadDataAddUseSuccess,loadDataAddUseFaild } from "../actions/userActions";
import loginUser from "../../constant.config.api/loginUser";
import checkToKen from "../../constant.config.api/checkToKen";
import getAllUserAPI from "../../constant.config.api/getAllUserAPI";
import addUserAPI from "../../constant.config.api/addUserAPI";//BZ00025
import ShowToast from "../../utils/showToast";
import loading from "../../utils/loading";

import Router from 'next/router';
function* loadDataSaga(name:any) {
  try { 
    const response = yield call(loginUser,name.payload);
    //BEGIN BZ00017  
    if(response!=null && response.status==400){
      ShowToast(response.data.errors,'warning');
      yield put(loadDataFailure(response.data));
      // console.log("response.data",response.data);
      
    }else if(response!=null && response.status==200){
      yield put(loadDataSuccess(response.data));
      ShowToast("Login user Sussucess.Please await for time loading.",'success');
      Router.push('/components/homePages/adminPages'); 
    }
    //END BZ00017
  } catch (err) {
    ShowToast(err,'err');
  yield put(loadDataFailure(err));    
  }
}
//BZ00019
function* loadDataCheckToken(name:any) {
  try {
    const response = yield call(checkToKen);
    //BEGIN BZ00017  
    if(response!=null && response.status==400){
      ShowToast(response.data.errors,'warning');
       yield put(loadDataFailure(response.data)); 
    }else if(response!=null && response.status==200){
       ShowToast("Login with user-token for Sussucess.Please await for time loading.",'success');
       yield put(loadDataSuccess(response.data));
    }
    //END BZ00017
  } catch (err) {
    ShowToast(err,'err');
     yield put(loadDataFailure(err));
  }
}

//BEGIN BZ00020
function* loadDataGetAllUser(payload:any) {
  try {
    ShowToast('Please await load user List','info');
    loading(true);
    const response = yield call(getAllUserAPI,payload.payload.page,payload.payload.limit);//BZ00021
    if(response!=null && response.status==400){
      ShowToast(response.data.errors,'warning');
       yield put(loadDataFailure(response.data)); 
    }else if(response!=null && response.status==200){
       ShowToast("Loading DataUser Sussucess.Please await for time.",'success');
       yield put(loadDataGetAllUseSuccess(response.data.data,response.data.dataLenght));
    }
    
  } catch (err) {
    // yield put(loadDataFailure(err));
  }
}
//END BZ00020
//BEGIN BZ00025
function* loadDataAddUser(payload:any) {
  try {
    // console.log("payload.user",payload.payload);
    const response = yield call(addUserAPI,payload);
    if(response!=null && response.status==400){
      yield put(loadDataAddUseFaild(false)); 
    }else if(response!=null && response.status==200){
        yield put(loadDataAddUseSuccess(true));
    }
    
  } catch (err) {
     yield put(loadDataAddUseFaild(false));
  }
}
//END BZ00025

const sagas = [
  takeLatest(actionTypes.LOAD_DATA, loadDataSaga),
  takeLatest(actionTypes.CHECK_TOKEN, loadDataCheckToken),//BZ00019
  takeLatest(actionTypes.GET_ALL_USER, loadDataGetAllUser),
  // takeLatest(actionTypes.ADD_USER, loadDataAddUser),
];

export default sagas;
