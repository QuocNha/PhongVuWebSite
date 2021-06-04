import produce from "immer";
import { actionTypes } from "../actions/userActions";

const initialState = {
  users: null,
  error: null
};

/*
*BZ0015            060321     Setup redux-saga for project
************************************************************************
*/
const successLoadData = (draft: any, { data }: any) => {
  draft.users = data;
};

const failureLoadData = (draft: any, { error }: any) => {
  draft.error = error;
};

const reducer = (state = initialState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.LOAD_DATA_SUCCESS:
        successLoadData(draft, action.payload);
        break;
    }
  });
};

export default reducer;
