import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './App.module.scss'
import { Button } from 'antd'
import Modal from '../components/Modal/Modal'
import FileTree from '../components/FileTree/FileTree'
import { requestTreeNode, submitModelConfig } from '../api'

const cx = classNames.bind(styles)

class App extends Component {
  state = {
    modalVisible: false,
    modalLoading: false,
    selectedFile: '',
    fileTreeData: [],
  }

  // For Modal
  showModal = () => {
    this.initTreeData()
    this.setState((prevState, props) => ({
      modalVisible: true,
    }))
  }

  onCloseModal = () => {
    this.setState((prevState, props) => ({
      modalVisible: false,
      selectedFile: '',
    }))
  }

  onModalOk = () => {
    this.setState((prevState, props) => ({
      modalLoading: true,
    }))
    // submitModelConfig()
    return new Promise(resolve => {
      setTimeout(() => {
        this.setState((prevState, props) => ({
          modalVisible: false,
          modalLoading: false,
        }))
        resolve()
      }, 3000)
    })
  }

  // For FileTree
  initTreeData = () => {
    requestTreeNode('/root').then(treeRoot =>
      this.setState((prevState, props) => ({
        fileTreeData: treeRoot,
      }))
    )
  }

  onLoadTreeNodeChild = treeNode =>
    treeNode.props.children || treeNode.props.isLeaf
      ? null
      : requestTreeNode(treeNode.props.path).then(childNodes => {
          treeNode.props.dataRef.children = childNodes
          this.setState({
            fileTreeData: [...this.state.fileTreeData],
          })
        })

  setSelectedFile = path => {
    this.setState((prevState, props) => ({
      selectedFile: path,
    }))
  }

  render() {
    const {
      modalVisible,
      modalLoading,
      selectedFile,
      fileTreeData,
    } = this.state
    return (
      <div className={cx('app')}>
        <Button
          className={cx('upload-btn')}
          type="primary"
          onClick={this.showModal}
        >
          Choose a file
        </Button>
        <Modal
          visible={modalVisible}
          title={'Please choose a file'}
          okBtnText={'Submit'}
          loading={modalLoading}
          prepareToSubmit={selectedFile.length > 0}
          onCloseModal={this.onCloseModal}
          onModalOk={this.onModalOk}
        >
          <FileTree
            fileTreeData={fileTreeData}
            setSelectedFile={this.setSelectedFile}
            onLoadTreeNodeChild={this.onLoadTreeNodeChild}
          />
          <div className={cx('selected-file')}>
            {selectedFile ? 'Selected file : ' + selectedFile : null}
          </div>
        </Modal>
      </div>
    )
  }
}

export default App
