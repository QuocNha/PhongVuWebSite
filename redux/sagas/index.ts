/*
*BZ0015            060321     Setup redux-saga for project
************************************************************************
*/
import { all, fork } from "redux-saga/effects";
 import User from "./userSagas";

export default function* rootSaga() {
  yield all([...User]);
}