import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./COMPONENT_NAME.module.scss";

const cx = classNames.bind(styles);

class COMPONENT_NAME extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: ""
  };

  render() {
    const { className } = this.props;
    return (
      <div className={cx("component_name", className)}>COMPONENT_NAME</div>
    );
  }
}

export default COMPONENT_NAME;
