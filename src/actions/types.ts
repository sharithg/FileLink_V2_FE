export const DOMAIN =
  "http://ec2-3-12-132-64.us-east-2.compute.amazonaws.com:8000";

export const GET_FILES = "GET_FILES";

export const DELETE_FILE = "DELETE_FILE";

export const ADD_FILE = "ADD_FILE";

export const GET_ERRORS = "GET_ERRORS";

export const CLOSE_SNACK = "CLOSE_SNACK";

export const CREATE_MESSAGE = "CREATE_MESSAGE";

export const USER_LOADING = "USER_LOADING";

export const USER_LOADED = "USER_LOADED";

export const AUTH_ERROR = "AUTH_ERROR";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export const REGISTER_FAIL = "REGISTER_FAIL";

export const CLEAR_LEADS = "CLEAR_LEADS";

export const GOOGLE_AUTH = "GOOGLE_AUTH";

export const LOGOUT_GOOGLE = "LOGOUT_GOOGLE";

export const GET_CLASSES = "GET_CLASSES";

export const DELETE_CLASS = "DELETE_CLASS";

export const ADD_CLASS = "ADD_CLASS";

export const SET_CURR_CLASS = "SET_CURR_CLASS";

export const CLASSES_LOADED = "CLASSES_LOADED";

export const FILES_LOADING = "FILES_LOADING";

export const SET_CURRENT_ADD_FILE = "SET_CURRENT_ADD_FILE";

export const PASSWORD_EMAIL_SENT = "PASSWORD_EMAIL_SENT";

export const PASSWORD_RESET_COMPLETE = "PASSWORD_RESET_COMPLETE";

export const RESET_PASSWORD_LOADING = "RESET_PASSWORD_LOADING";

export const ADD_EVENT = "ADD_EVENT";

export const GET_EVENTS = "GET_EVENTS";

export const EVENTS_LOADED = "EVENTS_LOADED";
/** Redux state types */
export interface IFiles {
  id: number;
  file_id: string;
  file_type: string;
  file_name: string;
  file_view_link: string;
  file_icon_link: string;
  file_created_at: string;
  college_class: number;
}
export interface IFilesState {
  files: Array<IFiles>;
  isLoading: boolean;
}

export interface IErrorsState {
  message: any;
  status: string | null;
  open: boolean;
}

export interface IMessagesState {
  message: any;
  status: string | null;
}

export interface IAuthState {
  token: string | null;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  user: { id: number; username: string; email: string } | null;
  password_email_sent: boolean;
  new_password_set: boolean;
  isResetLoading: boolean;
}

export interface IGoogleState {
  isGoogleAuth: boolean | null;
}

export interface IClasses {
  id?: number;
  name: string;
  owner?: number;
  color?: string;
}
export interface IClassesState {
  classes: Array<IClasses>;
  current_class: string;
  classes_loaded: boolean;
}

export interface IEvents {
  id?: number;
  title: string;
  start: string;
  end: string;
  description: string;
}

export interface IEventsState {
  events: Array<IEvents>;
  eventsLoaded: boolean;
}

export interface IReactState {
  current_add_file: string | null;
}

export interface IRootState {
  files: IFilesState;
  errors: IErrorsState;
  messages: IMessagesState;
  auth: IAuthState;
  google: IGoogleState;
  classes: IClassesState;
  react: IReactState;
  events: IEventsState;
}

/** Redux action types */

export interface IActionAuth {
  type:
    | typeof USER_LOADING
    | typeof USER_LOADED
    | typeof LOGIN_SUCCESS
    | typeof LOGOUT_SUCCESS
    | typeof AUTH_ERROR
    | typeof LOGIN_FAIL
    | typeof REGISTER_SUCCESS
    | typeof PASSWORD_EMAIL_SENT
    | typeof PASSWORD_RESET_COMPLETE
    | typeof RESET_PASSWORD_LOADING
    | typeof REGISTER_FAIL;
  payload?: any;
}

export interface IActionClasses {
  type:
    | typeof GET_CLASSES
    | typeof DELETE_CLASS
    | typeof ADD_CLASS
    | typeof SET_CURR_CLASS
    | typeof CLASSES_LOADED;
  payload?: any;
}

export interface IActionEvents {
  type: typeof ADD_EVENT | typeof GET_EVENTS | typeof EVENTS_LOADED;
  payload?: any;
}

export interface IActionErrors {
  type: typeof GET_ERRORS | typeof CLOSE_SNACK;
  payload?: any;
}

export interface IActionFiles {
  type:
    | typeof GET_FILES
    | typeof DELETE_FILE
    | typeof ADD_FILE
    | typeof FILES_LOADING;
  payload?: any;
}

export interface IActionGoogle {
  type: typeof GOOGLE_AUTH | typeof LOGOUT_GOOGLE;
  payload?: any;
}

export interface IActionMessages {
  type: typeof CREATE_MESSAGE;
  payload?: any;
}

export interface IActionReact {
  type: typeof SET_CURRENT_ADD_FILE;
  payload?: any;
}

export interface ConfigTypes {
  headers: {
    "Content-Type": string;
    Authorization?: string;
  };
}

export interface CredentialTypes {
  username: string;
  password: string;
  email: string;
}
