import React, { Component, Fragment } from "react";
// React redux imports

import { connect } from "react-redux";
// Action imports
import { getClasses } from "../../actions/classAction";
// To use props
import { Sidebar } from "../Layouts";
import { IRootState, IClasses } from "../../actions/types";

interface IClassesProps {
  classes: IClasses[];
}

class Classes extends Component<IClassesProps, {}> {
  componentDidMount() {
    getClasses();
  }

  render() {
    return (
      <Fragment>
        <Sidebar classes={this.props.classes} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  classes: state.classes.classes,
});

export default connect(mapStateToProps, { getClasses })(Classes);
