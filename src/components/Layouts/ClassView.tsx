import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getFiles } from "../../actions/filesAction";
import FileTable from "./FileTable";
import { IFiles, IRootState } from "../../actions/types";

interface IClassViewProps {
  getFiles: () => void;
  files: IFiles[];
}

const ClassView: React.FC<IClassViewProps> = (props) => {
  useEffect(() => {
    props.getFiles();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Fragment>
      <FileTable files={props.files} current_class="" />
    </Fragment>
  );
};

const mapStateToProps = (state: IRootState) => ({
  files: state.files.files,
});

export default connect(mapStateToProps, { getFiles })(ClassView);
