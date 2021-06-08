/*
*BZ0015            060321     Setup redux-saga for projec
*BZ00017           050621     Create validaton for Yup to login user 
*BZ00019           060621     Using Token login for next reset
*BZ00020            060621     Get All User
*BZ00021            060621     Paganation for List User
*BZ00025            080621     Create AddUser API

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
    LOAD_DATA_GET_ALL_USER_SUCCESS:"LOAD_DATA_GET_ALL_USER_SUCCESS",
    //END BZ00020
    //BEGIN BZ00025
    ADD_USER:"ADD_USER",
    LOAD_DATA_ADDUSER_SUCCESS:'LOAD_DATA_ADDUSER_SUCCESS',
    LOAD_DATA_ADDUSER_FAILD:'LOAD_DATA_ADDUSER_FAILD'
    //END BZ00025
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
export interface IUserForAdd {
  email:String,
  firstName:String,
  lastName:String,
  address1:String,
  img:String
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
  export function loadDataGetAllUseSuccess(data: IUser[],userAllDataLength) {
    return {
      type: actionTypes.LOAD_DATA_GET_ALL_USER_SUCCESS,
      payload: {
        data: data,
        userAllDataLength:userAllDataLength
      }
    };
  }
  
  //END BZ00020

  //BEGIN BZ00025
  export function addUser(user: IUserForAdd) {
    return {
      type: actionTypes.ADD_USER,
      payload: user
    

    };
  }
  export function loadDataAddUseSuccess(checkAddUser:boolean) {
    return {
      type: actionTypes.LOAD_DATA_ADDUSER_SUCCESS,
      payload: {
        checkAddUser
      }
    };
  }
  export function loadDataAddUseFaild(checkAddUser:boolean) {
    return {
      type: actionTypes.LOAD_DATA_ADDUSER_FAILD,
      payload: {
        checkAddUser
      }
    };
  }
  
  
  
  //END BZ00025