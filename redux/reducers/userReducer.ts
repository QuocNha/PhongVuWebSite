/*
*BZ0015            060321     Setup redux-saga for projec
*BZ00017            050621     Create validaton for Yup to login user 
************************************************************************
*/
import produce from "immer";
import { actionTypes } from "../actions/userActions";

const initialState = {
  listUser: null,
  error: null
};

const successLoadData = (draft: any,  {data} : any) => {
  draft.listUser = data;
};

const failureLoadData = (draft: any, { error }: any) => {
  draft.error = error;
};
//BEGIN BZ00017
const reducer = (state = initialState, action: any) => {
    console.log(typeof action.payload);
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.LOAD_DATA_GET_ALL_USER_SUCCESS:
        successLoadData(draft, action.payload);
    break;
    }
    
  });
};
//END BZ00017

export default reducer;
