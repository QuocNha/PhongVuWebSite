/*
*BZ0015            060321     Setup redux-saga for projec
*BZ00017           050621     Create validaton for Yup to login user 
*BZ00019           060621     Using Token login for next reset
*BZ00020            060621     Get All User
*BZ00021            060621     Paganation for List User

************************************************************************
*/
export const actionTypes = {
    LOAD_DATA: "LOAD_DATA",
    LOAD_DATA1: "LOAD_DATA1",
    LOAD_DATA_SUCCESS: "LOAD_DATA_SUCCESS",
    LOAD_DATA_FAILURE: "LOAD_DATA_FAILURE",

    //BEGIN BZ00019
    CHECK_TOKEN:"CHECK_TOKEN",
    //END BZ00019
    //BEGIN BZ00020
    GET_ALL_USER:"GET_ALL_USER",
    LOAD_DATA_GET_ALL_USER_SUCCESS:"LOAD_DATA_GET_ALL_USER_SUCCESS"
    //END BZ00020
  };
  export interface IEmployee {
    id: number
    name: string,
}
export interface IUser {
  number: number
  userType: string,
  userName:string
}
export interface UserState {
  readonly data: IUser[]
}
//BEGIN BZ00017 
export interface ErrorUser {
  error: [],
}
export function getUser(users) {
    return {
      type: actionTypes.LOAD_DATA,
      payload:users

    };
  }
  
  export interface EmployeeState {
    readonly data: IEmployee[]
  }
  export function loadDataSuccess(data: IEmployee[]) {
    return {
      type: actionTypes.LOAD_DATA_SUCCESS,
      payload: {
        data: data
      }
    };
  }
  
  export function loadDataFailure(data: ErrorUser) {
    return {
      type: actionTypes.LOAD_DATA_FAILURE,
      payload: {
        error: data
      }
    };
  }
  //END BZ00017
  //BEGIN BZ00019
  export function checkTokenUser() {
    return {
      type: actionTypes.CHECK_TOKEN,
      payload:{}

    };
  }
  //END BZ00019
 //BEGIN BZ00020
  export function  getAllUser(page,limit) {
    return {
      type: actionTypes.GET_ALL_USER,
      //BEGIN BZ00021
      payload:{
        page:page,
        limit:limit
      }//END BZ00021

    };
  }
  export function loadDataGetAllUseSuccess(data: IUser[]) {
    return {
      type: actionTypes.LOAD_DATA_GET_ALL_USER_SUCCESS,
      payload: {
        data: data
      }
    };
  }
  
  //END BZ00020