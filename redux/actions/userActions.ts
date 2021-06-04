/*
*BZ0015            060321     Setup redux-saga for project
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
export function getUser(users) {
    console.log("get user" +users);
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
  
  export function loadDataFailure(error: any) {
    return {
      type: actionTypes.LOAD_DATA_FAILURE,
      payload: {
        error: error
      }
    };
  }