import {
  CREATE_MESSAGE,
  IMessagesState,
  IActionMessages,
} from "../actions/types";

const initialState: IMessagesState = {
  message: {},
  status: null,
};

const messageReducer = (
  state = initialState,
  action: IActionMessages
): IMessagesState => {
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
};

export default messageReducer;
