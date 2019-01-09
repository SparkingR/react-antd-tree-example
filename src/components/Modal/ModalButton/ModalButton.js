import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './ModalButton.module.scss'

const cx = classNames.bind(styles)

const ModalButton = ({
  className,
  children,
  type,
  onClick,
  isDisabled,
  isLoading,
}) => {
  return (
    <button
      className={cx(
        'modal-button',
        className,
        isDisabled || isLoading
          ? 'modal-button--disable'
          : 'modal-button--normal'
      )}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading && <div className={cx('modal-button__loading')} />}
      {children}
    </button>
  )
}

ModalButton.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
}

ModalButton.defaultProps = {
  className: '',
  type: 'button',
  onClick: () => {},
  isDisabled: false,
  isLoading: false,
}

export default React.memo(ModalButton)
