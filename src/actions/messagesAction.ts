import { CREATE_MESSAGE, GET_ERRORS } from "./types";

//CREATE message
export const createMessage = (message: string) => {
  return {
    type: CREATE_MESSAGE,
    payload: message,
  };
};

// RETURN errors

export const returnErrors = (message: string, status: string) => {
  return {
    type: GET_ERRORS,
    payload: { message, status },
  };
};
