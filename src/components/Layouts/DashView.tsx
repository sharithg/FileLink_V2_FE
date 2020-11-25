import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { setCurrClass } from "../../actions/classAction";
import QuickLinks from "./QuickLinks";
import Schedule from "./Schedule";

interface IDashViewProps extends RouteComponentProps<{ dashId: string }> {
  setCurrClass: (curr_class: string) => void;
}

const DashView: React.FC<IDashViewProps> = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrClass(props.match.params.dashId));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (props.match.params.dashId === "schedule") return <Schedule />;
  if (props.match.params.dashId === "quicklinks") return <QuickLinks />;
  else return <React.Fragment />;
};

export default DashView;
