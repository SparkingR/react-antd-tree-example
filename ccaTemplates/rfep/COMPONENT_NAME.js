import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./COMPONENT_NAME.module.scss";

const cx = classNames.bind(styles);

const COMPONENT_NAME = ({ className }) => {
  return <div className={cx("component_name", className)}>COMPONENT_NAME</div>;
};

COMPONENT_NAME.propTypes = {
  className: PropTypes.string
};

COMPONENT_NAME.defaultProps = {
  className: ""
};

export default COMPONENT_NAME;
