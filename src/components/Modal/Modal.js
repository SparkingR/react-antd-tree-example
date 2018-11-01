import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Modal.module.scss'
import { Modal, Button } from 'antd'

const cx = classNames.bind(styles)

class ModalWrap extends Component {
  static propTypes = {
    className: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    width: PropTypes.string,
    title: PropTypes.string,
    cancelBtnText: PropTypes.string,
    okBtnText: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    prepareToSubmit: PropTypes.bool,
    onModalOk: PropTypes.func,
    onCloseModal: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    width: '50%',
    title: '',
    cancelBtnText: 'Cancel',
    okBtnText: 'Ok',
    prepareToSubmit: true,
    onModalOk: () => ({}),
    onCloseModal: () => ({}),
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
      <div className={cx('modal', className)}>
        <Modal
          visible={visible}
          width={width}
          title={title}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
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
        </Modal>
      </div>
    )
  }
}

export default ModalWrap
