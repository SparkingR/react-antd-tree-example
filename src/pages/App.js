import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './App.module.scss'

import { Button } from 'antd'
import Modal from '../components/Modal/Modal'
import FileTree from '../components/FileTree/FileTree'
import { getNodeChild } from '../api'
import { rootFolder } from '../config'

const cx = classNames.bind(styles)

class App extends Component {
  state = {
    modalVisible: false,
    modalLoading: false,
    selectedFile: '',
    submitFile: '',
  }

  showModal = () => {
    this.setState((prevState, props) => ({
      modalVisible: true,
    }))
  }

  onModalClose = () => {
    this.setState((prevState, props) => ({
      modalVisible: false,
      selectedFile: '',
    }))
  }

  onModalOk = () => {
    this.setState((prevState, props) => ({
      modalLoading: true,
    }))

    // aync request simulation
    setTimeout(() => {
      this.setState((prevState, props) => ({
        modalVisible: false,
        modalLoading: false,
        selectedFile: '',
        submitFile: prevState.selectedFile,
      }))
    }, 500)
  }

  setSelectedFile = path => {
    this.setState((prevState, props) => ({
      selectedFile: path,
    }))
  }

  render() {
    const { modalVisible, modalLoading, selectedFile, submitFile } = this.state
    return (
      <div className={cx('app')}>
        <div className={cx('submit-file')}>
          {submitFile ? 'Submit : ' + submitFile : null}
        </div>
        <Button
          className={cx('upload-btn')}
          type="primary"
          onClick={this.showModal}
        >
          Show Modal
        </Button>

        <Modal
          visible={modalVisible}
          title={'Please choose a file or a folder'}
          okBtnText={'Submit'}
          loading={modalLoading}
          prepareToSubmit={Boolean(selectedFile.length)}
          onModalClose={this.onModalClose}
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
