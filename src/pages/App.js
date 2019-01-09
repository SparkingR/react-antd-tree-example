import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './App.module.scss'
import { Button } from 'antd'

import FileTree from '../components/FileTree/FileTree'
import Modal from '../components/Modal/Modal'
import { getNodeChild } from '../api'
import { rootFolder } from '../config'
import { delay } from '../utils'

const cx = classNames.bind(styles)

class App extends Component {
  state = {
    isModalOpen: false,
    isModalReadyToSubmit: false,
    selectedFile: '',
    submitFile: '',
  }

  openModal = () => {
    this.setState((prevState, props) => ({
      isModalOpen: true,
    }))
  }

  closeModal = () => {
    this.setState((prevState, props) => ({
      isModalOpen: false,
      isModalReadyToSubmit: false,
      selectedFile: '',
    }))
  }

  onModalSubmit = () => {
    this.setState((prevState, props) => ({
      isModalOpen: false,
      isModalReadyToSubmit: false,
      selectedFile: '',
      submitFile: prevState.selectedFile,
    }))
  }

  setSelectedFile = path => {
    this.setState((prevState, props) => ({
      isModalReadyToSubmit: true,
      selectedFile: path,
    }))
  }

  render() {
    const {
      isModalOpen,
      isModalReadyToSubmit,
      selectedFile,
      submitFile,
    } = this.state

    return (
      <div className={cx('app')}>
        <div className={cx('submit-file')}>
          {submitFile ? 'Submit : ' + submitFile : null}
        </div>
        <Button
          className={cx('upload-btn')}
          type="primary"
          onClick={this.openModal}
        >
          Show Modal
        </Button>

        <Modal
          width={'600px'}
          className={cx('file-tree-with-modal')}
          title="Please choose a file"
          okBtnText="Submit"
          cancelBtnText="Cancel"
          isVisible={isModalOpen}
          isReadyToSubmit={isModalReadyToSubmit}
          onModalCancel={this.closeModal}
          onModalOk={delay(1000)(this.onModalSubmit)}
        >
          {modalState => (
            <FileTree
              selectableType={'file'}
              isDisabled={modalState.loading}
              rootFolder={rootFolder}
              getNodeChild={delay(500)(getNodeChild)}
              selectedFile={selectedFile}
              setSelectedFile={this.setSelectedFile}
            />
          )}
        </Modal>
      </div>
    )
  }
}

export default App
