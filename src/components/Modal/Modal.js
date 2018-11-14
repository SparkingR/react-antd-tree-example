import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Modal.module.scss'
import { Modal as AntdModal, Button } from 'antd'

const cx = classNames.bind(styles)

class Modal extends Component {
  static propTypes = {
    className: PropTypes.string,
    visible: PropTypes.bool,
    width: PropTypes.string,
    title: PropTypes.string,
    cancelBtnText: PropTypes.string,
    okBtnText: PropTypes.string,
    loading: PropTypes.bool,
    prepareToSubmit: PropTypes.bool,
    onModalOk: PropTypes.func,
    onModalClose: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    visible: true,
    width: '50%',
    title: '',
    cancelBtnText: 'Cancel',
    okBtnText: 'Ok',
    loading: false,
    prepareToSubmit: true,
    onModalOk: () => {},
    onModalClose: () => {},
  }

  handleOk = () => {
    this.props.onModalOk()
  }

  handleCancel = () => {
    !this.props.loading && this.props.onModalClose()
  }

  render() {
    const {
      className,
      visible,
      width,
      title,
      cancelBtnText,
      okBtnText,
      loading,
      prepareToSubmit,
    } = this.props
    return (
      <AntdModal
        className={cx('modal', className)}
        visible={visible}
        width={width}
        title={title}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        centered
        destroyOnClose
        footer={[
          <Button key="cancel" disabled={loading} onClick={this.handleCancel}>
            {cancelBtnText}
          </Button>,
          <Button
            key="ok"
            type="primary"
            loading={loading}
            disabled={!prepareToSubmit}
            onClick={this.handleOk}
          >
            {okBtnText}
          </Button>,
        ]}
      >
        {this.props.children}
      </AntdModal>
    )
  }
}

export default Modal
