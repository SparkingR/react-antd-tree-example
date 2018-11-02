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
    fileTreeData: PropTypes.array.isRequired,
    onLoadTreeNodeChild: PropTypes.func,
    setSelectedFile: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    onLoadTreeNodeChild: () => {},
    setSelectedFile: () => {},
  }

  onSelect = (selectedKeys, event) => {
    this.props.setSelectedFile(
      !isEmpty(selectedKeys) ? event.node.props.path : ''
    )
  }

  renderTreeNodes = data =>
    data.map(item => (
      <TreeNode
        title={item.name}
        key={item.id}
        path={item.path}
        isLeaf={!item.isFolder}
        selectable={!item.isFolder}
        dataRef={item}
      >
        {item.children ? this.renderTreeNodes(item.children) : null}
      </TreeNode>
    ))

  render() {
    const { className, fileTreeData, onLoadTreeNodeChild } = this.props
    return isEmpty(fileTreeData) ? (
      <div className={cx('file-tree', className)}>
        <Spin className={cx('spin')} tip="Loading..." />
      </div>
    ) : (
      <Tree
        className={cx('file-tree', className)}
        loadData={onLoadTreeNodeChild}
        onSelect={this.onSelect}
      >
        {this.renderTreeNodes(fileTreeData)}
      </Tree>
    )
  }
}

export default FileTree
