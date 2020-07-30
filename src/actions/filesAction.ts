import axios from "axios";
import { returnErrors, createMessage } from "./messagesAction";
//Types
import {
  GET_FILES,
  DELETE_FILE,
  ADD_FILE,
  FILES_LOADING,
  IRootState,
  DOMAIN,
} from "./types";
import { tokenConfig } from "./authAction";
import { Dispatch } from "redux";

export const getFiles = () => (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  axios
    .get(`http://${DOMAIN}/api/drivelinks/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: GET_FILES, payload: res.data });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteFile = (id: Number) => (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  axios
    .delete(`http://${DOMAIN}/api/drivelinks/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ file_deleted: "File Deleted" }));
      dispatch({
        type: DELETE_FILE,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

export const addFile = (file: object) => (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  console.log(file);
  dispatch({ type: FILES_LOADING });
  axios
    .post(`http://${DOMAIN}/api/drivelinks/`, file, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ file_added: "File Added" }));
      dispatch({
        type: ADD_FILE,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};
// console.log("THEN: ", res.data.redirect);

// file, tokenConfig(getState)

// dispatch(createMessage({ file_added: "File Added" }));
// dispatch({
// 	type: ADD_FILE,
// 	payload: res.data,
// });
