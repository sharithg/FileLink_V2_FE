import React, { FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../actions/types";

interface IGAuthRouteProps {
  component: FunctionComponent<any>;
  exact: boolean;
  path: string;
}

const GAuthRoute: React.FC<IGAuthRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const isGoogleAuth = useSelector(
    (state: IRootState) => state.google.isGoogleAuth
  );
  return (
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
};

export default GAuthRoute;
