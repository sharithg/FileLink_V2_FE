import {
  SET_CURRENT_ADD_FILE,
  IReactState,
  IActionReact,
} from "../actions/types";

const initialState: IReactState = {
  current_add_file: null,
};

const reactReducer = (
  state = initialState,
  action: IActionReact
): IReactState => {
  switch (action.type) {
    case SET_CURRENT_ADD_FILE:
      return {
        ...state,
        current_add_file: action.payload,
      };
    default:
      return state;
  }
};

export default reactReducer;
