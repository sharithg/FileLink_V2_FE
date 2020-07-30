import {
  GOOGLE_AUTH,
  LOGOUT_GOOGLE,
  IGoogleState,
  IActionGoogle,
} from "../actions/types";

const initialState: IGoogleState = {
  isGoogleAuth: null,
};

function googleReducer(
  state = initialState,
  action: IActionGoogle
): IGoogleState {
  switch (action.type) {
    case GOOGLE_AUTH:
      return {
        ...state,
        isGoogleAuth: true,
      };
    case LOGOUT_GOOGLE:
      return { ...state, isGoogleAuth: false };
    default:
      return state;
  }
}

export default googleReducer;
