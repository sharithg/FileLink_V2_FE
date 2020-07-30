import {
  GET_CLASSES,
  DELETE_CLASS,
  ADD_CLASS,
  SET_CURR_CLASS,
  CLASSES_LOADED,
  IClassesState,
  IActionClasses,
  IClasses,
} from "../actions/types";

const initialState: IClassesState = {
  classes: [],
  current_class: null,
  classes_loaded: false,
};

function classesReducer(
  state = initialState,
  action: IActionClasses
): IClassesState {
  switch (action.type) {
    case CLASSES_LOADED:
      return {
        ...state,
        classes_loaded: action.payload,
      };
    case GET_CLASSES:
      let classes: IClasses[] = action.payload;
      const colors = [
        "#800000",
        "#008080",
        "#000080",
        "#FFFF00",
        "#FF0000",
        "#008000",
        "#00FFFF",
        "#800080",
        "#808000",
        "#00FF00",
        "#FF00FF",
        "#0000FF",
      ];
      classes.map((the_class, index) => {
        the_class.color = colors[index];
      });
      return {
        ...state,
        classes: classes,
      };
    case DELETE_CLASS:
      return {
        ...state,
        classes: state.classes.filter(
          (oneclass) => oneclass.id !== action.payload
        ),
      };
    case ADD_CLASS:
      return {
        ...state,
        classes: [...state.classes, action.payload],
      };
    case SET_CURR_CLASS:
      return {
        ...state,
        current_class: action.payload,
      };
    default:
      return state;
  }
}

export default classesReducer;
