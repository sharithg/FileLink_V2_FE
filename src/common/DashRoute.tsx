import React, { FunctionComponent } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";

interface IDashRouteProps {
  component: FunctionComponent<any>;
  exact: boolean;
  path: string;
}

const DashRoute: React.FC<IDashRouteProps> = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props: RouteComponentProps<{ dashId: string }>) => {
      console.log(rest);
      if (
        props.match.params.dashId !== "schedule" &&
        props.match.params.dashId !== "quicklinks"
      )
        return <Redirect to="/404" />;
      return <Component {...props} />;
    }}
  />
);

export default DashRoute;
