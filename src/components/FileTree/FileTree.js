import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './FileTree.module.scss'

import { Tree, Spin } from 'antd'
import { isEmpty } from 'lodash'

const cx = classNames.bind(styles)
const TreeNode = Tree.TreeNode

class FileTree extends Component {
  static propTypes = {
    className: PropTypes.string,
    fileSelectable: PropTypes.bool,
    folderSelectable: PropTypes.bool,
    initTreeRoot: PropTypes.func.isRequired,
    getNodeChild: PropTypes.func,
    setSelectedFile: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    fileSelectable: true,
    folderSelectable: true,
    getNodeChild: () => {},
    setSelectedFile: () => {},
  }

  state = {
    fileTreeData: [],
  }

  componentDidMount = () => {
    const { initTreeRoot } = this.props
    initTreeRoot().then(treeRoot =>
      // aync request simulation
      setTimeout(() => {
        this.setState((prevState, props) => ({
          fileTreeData: treeRoot,
          loading: false,
        }))
      }, 500)
    )
  }

  onClickNodeChild = treeNode => {
    const { getNodeChild } = this.props
    return !treeNode.props.children && !treeNode.props.isLeaf
      ? getNodeChild(treeNode.props.path).then(childNodes => {
          treeNode.props.dataRef.children = childNodes
          this.setState((prevState, props) => ({
            fileTreeData: [...this.state.fileTreeData],
          }))
        })
      : null
  }

  onSelect = (selectedKeys, event) => {
    const { setSelectedFile } = this.props
    setSelectedFile(!isEmpty(selectedKeys) ? event.node.props.path : '')
  }

  renderTreeNodes = data => {
    const { fileSelectable, folderSelectable } = this.props
    return data.map(item => (
      <TreeNode
        title={item.name}
        key={item.path}
        path={item.path}
        isLeaf={!item.isFolder}
        selectable={item.isFolder ? folderSelectable : fileSelectable}
        dataRef={item}
      >
        {item.children ? this.renderTreeNodes(item.children) : null}
      </TreeNode>
    ))
  }

  render() {
    const { fileTreeData } = this.state
    const { className } = this.props
    return isEmpty(fileTreeData) ? (
      <div className={cx('file-tree', className)}>
        <Spin className={cx('spin')} tip="Loading..." />
      </div>
    ) : (
      <Tree
        className={cx('file-tree', className)}
        loadData={this.onClickNodeChild}
        onSelect={this.onSelect}
      >
        {this.renderTreeNodes(fileTreeData)}
      </Tree>
    )
  }
}

export default FileTree
