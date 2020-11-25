import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFiles } from "../../actions/filesAction";
import FileTable from "./FileTable";
import { IRootState } from "../../actions/types";

const ClassView: React.FC = (props) => {
  const files = useSelector((state: IRootState) => state.files.files);
  const current_class = useSelector(
    (state: IRootState) => state.classes.current_class
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFiles());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Fragment>
      <FileTable files={files} current_class={current_class} />
    </Fragment>
  );
};

export default ClassView;
