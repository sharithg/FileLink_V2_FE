import React, { FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { IRootState } from "../actions/types";

interface IPrivateRouteProps {
  component: FunctionComponent<any>;
  exact?: boolean;
  path: string;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticated
  );
  const isLoading = useSelector((state: IRootState) => state.auth.isLoading);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) {
          console.log("here2");
          return <Loader />;
        } else if (!isAuthenticated || isAuthenticated === null) {
          return <Redirect from="/dashboard" to="/login" />;
        } else {
          console.log("here");
          return <Component {...props} />;
        }
      }}
    />
  );
};
export default PrivateRoute;
