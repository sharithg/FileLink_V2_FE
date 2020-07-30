import { SET_CURRENT_ADD_FILE } from "./types";
import { Dispatch } from "redux";

export const setCurrentAddFile = (file_type: string) => (
  dispatch: Dispatch
) => {
  dispatch({ type: SET_CURRENT_ADD_FILE, payload: file_type });
};
