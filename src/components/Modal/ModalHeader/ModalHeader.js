import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './ModalHeader.module.scss'
import { ReactComponent as IconClose } from '../../../assets/close.svg'

const cx = classNames.bind(styles)

const ModalHeader = ({ className, title, onModalCancel }) => {
  return title ? (
    <div className={cx('modal-header', className)}>
      <span className={cx('modal-header__title')}>{title}</span>
      <button
        className={cx('modal-header__close-button')}
        type="button"
        onClick={onModalCancel}
      >
        <IconClose />
      </button>
    </div>
  ) : null
}

ModalHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onModalCancel: PropTypes.func,
}

ModalHeader.defaultProps = {
  className: '',
  title: true,
  onModalCancel: () => {},
}

export default React.memo(ModalHeader)
