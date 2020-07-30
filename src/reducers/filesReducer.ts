import {
  GET_FILES,
  DELETE_FILE,
  ADD_FILE,
  FILES_LOADING,
  IFilesState,
  IActionFiles,
} from "../actions/types";

const initialState: IFilesState = {
  files: [],
  isLoading: false,
};

function filesReducer(state = initialState, action: IActionFiles): IFilesState {
  switch (action.type) {
    case GET_FILES:
      return {
        ...state,
        isLoading: false,
        files: action.payload,
      };
    case DELETE_FILE:
      return {
        ...state,
        isLoading: false,
        files: state.files.filter((file) => file.id !== action.payload),
      };
    case FILES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_FILE:
      return {
        ...state,
        files: [...state.files, action.payload],
        isLoading: false,
      };
    default:
      return state;
  }
}

export default filesReducer;
