import React from 'react'
import Modal from './Modal'

const withModal = WrappedComponent => {
  const wrapWithModal = ({
    childClassName,
    className,
    width,
    title,
    cancelBtnText,
    okBtnText,
    isVisible,
    isReadyToSubmit,
    onModalOk,
    onModalCancel,
    ...rest
  }) => {
    return (
      <Modal
        className={className}
        width={width}
        title={title}
        cancelBtnText={cancelBtnText}
        okBtnText={okBtnText}
        isVisible={isVisible}
        isReadyToSubmit={isReadyToSubmit}
        onModalOk={onModalOk}
        onModalCancel={onModalCancel}
      >
        <WrappedComponent
          className={childClassName}
          isReadyToSubmit={isReadyToSubmit}
          onModalOk={onModalOk}
          onModalCancel={onModalCancel}
          {...rest}
        />
      </Modal>
    )
  }

  return wrapWithModal
}

export default withModal
