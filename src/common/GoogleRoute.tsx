import React, { FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "./Loader";
import { IGoogleState, IFilesState, IRootState } from "../actions/types";

interface IGoogleRouteProps {
  component: FunctionComponent<any>;
  googleAuth: IGoogleState;
  files: IFilesState;
  exact: boolean;
  path: string;
}

const GoogleRoute: React.FC<IGoogleRouteProps> = ({
  component: Component,
  googleAuth,
  files,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (!googleAuth.isGoogleAuth || googleAuth.isGoogleAuth === null) {
        return <Redirect to="/dashboard/gauth/googleauth" />;
      } else if (files.isLoading) {
        return <Loader />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state: IRootState) => ({
  googleAuth: state.google,
  files: state.files,
});

export default connect(mapStateToProps)(GoogleRoute);
