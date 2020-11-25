import axios from "axios";
import {
  ADD_EVENT,
  GET_EVENTS,
  EVENTS_LOADED,
  IEvents,
  IRootState,
  DOMAIN,
} from "./types";
import { tokenConfig } from "./authAction";
import { Dispatch } from "redux";

export const addEvent = (event: IEvents) => (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  console.log(event);
  axios
    .post(`http://${DOMAIN}/api/events/`, event, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: ADD_EVENT, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const getEvents = () => (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  axios
    .get(`http://${DOMAIN}/api/events/`, tokenConfig(getState))
    .then((res) => {
      console.log("Data: ", res.data);
      dispatch({ type: GET_EVENTS, payload: res.data });
      dispatch({ type: EVENTS_LOADED });
    })
    .catch((err) => console.log(err));
};
