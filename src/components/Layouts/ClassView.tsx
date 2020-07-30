import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { setCurrClass } from "../../actions/classAction";
import { getFiles } from "../../actions/filesAction";
import PropTypes from "prop-types";
import FileTable from "./FileTable";
import { IFiles, IRootState } from "../../actions/types";

interface IClassViewProps {
  getFiles: () => void;
  files: IFiles[];
}

const ClassView: React.FC<IClassViewProps> = (props) => {
  useEffect(() => {
    props.getFiles();
  }, []);
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
