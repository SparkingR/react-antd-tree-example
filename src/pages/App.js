import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './App.module.scss'

import { Button } from 'antd'
import Modal from '../components/Modal/Modal'
import FileTree from '../components/FileTree/FileTree'
import { getNodeChild } from '../api'
import { rootFolder } from '../config'
import { sleep } from '../utils'

const cx = classNames.bind(styles)

class App extends Component {
  state = {
    isModalOpen: false,
    isReadyToSubmit: false,
    selectedFile: '',
    submitFile: '',
  }

  openModal = () => {
    this.setState((prevState, props) => ({
      isModalOpen: true,
    }))
  }

  onModalCancel = () => {
    this.setState((prevState, props) => ({
      isModalOpen: false,
      selectedFile: '',
      isReadyToSubmit: false,
    }))
  }

  // aync request simulation
  onModalOk = () =>
    sleep(1000).then(() => {
      this.setState((prevState, props) => ({
        isModalOpen: false,
        selectedFile: '',
        submitFile: prevState.selectedFile,
        isReadyToSubmit: false,
      }))
    })

  setSelectedFile = path => {
    this.setState((prevState, props) => ({
      selectedFile: path,
      isReadyToSubmit: true,
    }))
  }

  render() {
    const {
      isModalOpen,
      selectedFile,
      submitFile,
      isReadyToSubmit,
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
          isVisible={isModalOpen}
          title={'Please choose a file or a folder'}
          okBtnText={'Submit'}
          isReadyToSubmit={isReadyToSubmit}
          onModalCancel={this.onModalCancel}
          onModalOk={this.onModalOk}
        >
          <FileTree
            initTreeRoot={() => getNodeChild(rootFolder)}
            getNodeChild={getNodeChild}
            setSelectedFile={this.setSelectedFile}
          />
          <div className={cx('selected-file')}>
            {selectedFile ? 'Selected : ' + selectedFile : null}
          </div>
        </Modal>
      </div>
    )
  }
}

export default App
