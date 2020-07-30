import React, { FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { IRootState } from "../actions/types";

interface IGAuthRouteProps {
  component: FunctionComponent<any>;
  googleAuth: { isGoogleAuth: boolean | null };
  exact: boolean;
  path: string;
}

const GAuthRoute: React.FC<IGAuthRouteProps> = ({
  component: Component,
  googleAuth: { isGoogleAuth },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (!isGoogleAuth || isGoogleAuth === null) {
        return <Component {...props} />;
      } else {
        return <Redirect to="/dashboard/schedule" />;
      }
    }}
  />
);

const mapStateToProps = (state: IRootState) => ({
  googleAuth: state.google,
});

export default connect(mapStateToProps)(GAuthRoute);
