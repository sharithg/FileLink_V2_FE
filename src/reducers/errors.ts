import { GET_ERRORS, IErrorsState, IActionErrors } from "../actions/types";

const initialState: IErrorsState = {
  message: {},
  status: null,
};

const errorMessage = (
  state = initialState,
  action: IActionErrors
): IErrorsState => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        message: action.payload.message,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export default errorMessage;
