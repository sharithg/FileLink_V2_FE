import {
  GET_ERRORS,
  CLOSE_SNACK,
  IErrorsState,
  IActionErrors,
} from "../actions/types";

const initialState: IErrorsState = {
  message: {},
  status: null,
  open: false,
};

const errorMessage = (
  state = initialState,
  action: IActionErrors
): IErrorsState => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status,
        open: true,
      };
    case CLOSE_SNACK:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default errorMessage;
