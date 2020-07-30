import { CREATE_MESSAGE, GET_ERRORS } from "./types";

//CREATE message
export const createMessage = (message: object) => {
  return {
    type: CREATE_MESSAGE,
    payload: message,
  };
};

// RETURN errors

export const returnErrors = (message: object, status: string) => {
  return {
    type: GET_ERRORS,
    payload: { message, status },
  };
};
