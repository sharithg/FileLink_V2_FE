import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { setCurrClass } from "../../actions/classAction";
import QuickLinks from "./QuickLinks";
import Schedule from "./Schedule";

interface IDashViewProps extends RouteComponentProps<{ dashId: string }> {
  setCurrClass: (curr_class: string) => void;
}

const DashView: React.FC<IDashViewProps> = (props) => {
  useEffect(() => {
    props.setCurrClass(props.match.params.dashId);
  }, []);
  if (props.match.params.dashId === "schedule") return <Schedule />;
  if (props.match.params.dashId === "quicklinks") return <QuickLinks />;
  else return <React.Fragment />;
};

export default connect(null, { setCurrClass })(DashView);
