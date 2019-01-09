import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './ModalFooter.module.scss'
import Button from '../ModalButton/ModalButton'

const cx = classNames.bind(styles)

const ModalFooter = ({
  className,
  isReadyToSubmit,
  isSubmitting,
  okBtnText,
  cancelBtnText,
  handleOk,
  handleCancel,
}) => {
  const okBtn = okBtnText ? (
    <Button
      className={cx('modal-footer__ok-button')}
      isLoading={isSubmitting}
      isDisabled={isSubmitting || !isReadyToSubmit}
      onClick={handleOk}
    >
      {okBtnText}
    </Button>
  ) : null

  const cancelBtn = cancelBtnText ? (
    <Button
      className={cx('modal-footer__cancel-button')}
      isDisabled={isSubmitting}
      onClick={handleCancel}
    >
      {cancelBtnText}
    </Button>
  ) : null

  return okBtn || cancelBtn ? (
    <div className={cx('modal-footer', className)}>
      {okBtn}
      {cancelBtn}
    </div>
  ) : null
}

ModalFooter.propTypes = {
  className: PropTypes.string,
  isReadyToSubmit: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  okBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
}

ModalFooter.defaultProps = {
  className: '',
  isReadyToSubmit: false,
  isSubmitting: false,
  okBtnText: '',
  cancelBtnText: '',
  handleOk: () => {},
  handleCancel: () => {},
}

export default React.memo(ModalFooter)
