import { call, put, takeLatest } from "redux-saga/effects";

import { actionTypes, loadDataFailure, loadDataSuccess } from "../actions/userActions";


function* loadDataSaga(name:any) {
  try {
    yield put(loadDataSuccess(name));
  } catch (err) {
    yield put(loadDataFailure(err));
  }
}
/*
*BZ0015            060321     Setup redux-saga for project
************************************************************************
*/
const sagas = [takeLatest(actionTypes.LOAD_DATA, loadDataSaga),];

export default sagas;
