import axios from "axios";
import { returnErrors } from "./messagesAction";
//Types
import {
  GET_CLASSES,
  DELETE_CLASS,
  ADD_CLASS,
  SET_CURR_CLASS,
  CLASSES_LOADED,
  IRootState,
  DOMAIN,
} from "./types";
import { tokenConfig } from "./authAction";
import { Dispatch } from "redux";

export const getClasses = () => (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  axios
    .get(`http://${DOMAIN}/api/driveclasses/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: GET_CLASSES, payload: res.data });
      dispatch({ type: CLASSES_LOADED, payload: true });
    })
    .catch((err) =>
      console.log(err)
    );
};

export const deleteClass = (id: Number) => (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  axios
    .delete(`http://${DOMAIN}/api/driveclasses/${id}`, tokenConfig(getState))
    .then((res) => {
      // dispatch(createMessage({ class_deleted: "Class Deleted" }));
      dispatch({
        type: DELETE_CLASS,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

export const addClass = (class_name: { name: string }) => (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  axios
    .post(
      `http://${DOMAIN}/api/driveclasses/`,
      class_name,
      tokenConfig(getState)
    )
    .then((res) => {
      // dispatch(createMessage({ class_added: 'Class Added' }));
      dispatch({
        type: ADD_CLASS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const setCurrClass = (dash_id: string) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_CURR_CLASS,
    payload: dash_id,
  });
};

export const testErr = () => (dispatch: Dispatch) => {
  dispatch(returnErrors("THis is a test", "400"))
};
