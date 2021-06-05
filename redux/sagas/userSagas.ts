/*
*BZ0015            060321     Setup redux-saga for project
*BZ00017            050621     Create validaton for Yup to login user 
************************************************************************
*/
import { call, put, takeLatest } from "redux-saga/effects";
import { actionTypes, loadDataFailure, loadDataSuccess } from "../actions/userActions";
import loginUser from "../../constant.config.api/loginUser";
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

const sagas = [takeLatest(actionTypes.LOAD_DATA, loadDataSaga),];

export default sagas;
