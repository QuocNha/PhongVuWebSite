/*
*BZ0015            060321     Setup redux-saga for projec
*BZ00017            050621     Create validaton for Yup to login user 
************************************************************************
*/
import produce from "immer";
import { actionTypes } from "../actions/userActions";

const initialState = {
  users: null,
  error: null
};

const successLoadData = (draft: any, { data }: any) => {
  draft.users = data;
};

const failureLoadData = (draft: any, { error }: any) => {
  draft.error = error;
};
//BEGIN BZ00017
const reducer = (state = initialState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.LOAD_DATA_SUCCESS:
        successLoadData(draft, action.payload);
        break;
      case actionTypes.LOAD_DATA_FAILURE:
        failureLoadData(draft, action.payload);
      break;
    }
    
  });
};
//END BZ00017

export default reducer;
