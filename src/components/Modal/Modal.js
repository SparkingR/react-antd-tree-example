import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Modal.module.scss'
import { Modal as AntdModal } from 'antd'

import ModalHeader from './ModalHeader/ModalHeader'
import ModalFooter from './ModalFooter/ModalFooter'

const cx = classNames.bind(styles)

class Modal extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    width: PropTypes.string,
    title: PropTypes.string,
    cancelBtnText: PropTypes.string,
    okBtnText: PropTypes.string,
    isVisible: PropTypes.bool,
    isReadyToSubmit: PropTypes.bool,
    onModalOk: PropTypes.func,
    onModalCancel: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    width: '50%',
    title: '',
    cancelBtnText: 'Cancel',
    okBtnText: '',
    isVisible: true,
    isReadyToSubmit: true,
    onModalOk: () => {},
    onModalCancel: () => {},
  }

  state = {
    loading: false,
  }

  handleOk = async () => {
    this.setState((prevState, props) => ({
      loading: true,
    }))
    await this.props.onModalOk()
    this.setState((prevState, props) => ({
      loading: false,
    }))
  }

  handleCancel = () => {
    !this.state.loading && this.props.onModalCancel()
  }

  render() {
    const { loading } = this.state
    const {
      className,
      children,
      width,
      title,
      cancelBtnText,
      okBtnText,
      isVisible,
      isReadyToSubmit,
      onModalCancel,
    } = this.props

    return (
      <AntdModal
        className={cx('modal', className)}
        width={width}
        visible={isVisible}
        footer={null}
        mask={false}
        centered
        destroyOnClose
      >
        <ModalHeader title={title} onModalCancel={onModalCancel} />
        {children(this.state)}
        <ModalFooter
          isReadyToSubmit={isReadyToSubmit}
          isSubmitting={loading}
          okBtnText={okBtnText}
          cancelBtnText={cancelBtnText}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </AntdModal>
    )
  }
}

export default Modal
