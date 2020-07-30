import React, { FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "./Loader";
import { IAuthState, IRootState } from "../actions/types";

interface IPrivateRouteProps {
  component: FunctionComponent<any>;
  auth: IAuthState;
  exact?: boolean;
  path: string;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  component: Component,
  auth,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <Loader />;
      } else if (!auth.isAuthenticated && auth.isAuthenticated !== null) {
        return <Redirect from="/dashboard" to="/login" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state: IRootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
