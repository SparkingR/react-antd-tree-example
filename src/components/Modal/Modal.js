import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Modal.module.scss'
import { Modal as AntdModal, Button } from 'antd'

const cx = classNames.bind(styles)

class Modal extends Component {
  static propTypes = {
    className: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    width: PropTypes.string,
    title: PropTypes.string,
    cancelBtnText: PropTypes.string,
    okBtnText: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    prepareToSubmit: PropTypes.bool,
    onModalOk: PropTypes.func.isRequired,
    onCloseModal: PropTypes.func.isRequired,
  }

  static defaultProps = {
    className: '',
    width: '50%',
    title: '',
    cancelBtnText: 'Cancel',
    okBtnText: 'Ok',
    prepareToSubmit: true,
  }

  handleOk = () => {
    this.props.onModalOk()
  }

  handleCancel = () => {
    !this.props.loading && this.props.onCloseModal()
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
