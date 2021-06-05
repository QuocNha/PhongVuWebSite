/*
*BZ0015            060321     Setup redux-saga for projec
*BZ00017            050621     Create validaton for Yup to login user 
************************************************************************
*/
export const actionTypes = {
    LOAD_DATA: "LOAD_DATA",
    LOAD_DATA1: "LOAD_DATA1",
    LOAD_DATA_SUCCESS: "LOAD_DATA_SUCCESS",
    LOAD_DATA_FAILURE: "LOAD_DATA_FAILURE"
  };
  export interface IEmployee {
    id: number
    name: string,
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