import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './FileTree.module.scss'
import { Tree, Spin } from 'antd'
import { isEmpty } from 'lodash'

const cx = classNames.bind(styles)
const DirectoryTree = Tree.DirectoryTree
const TreeNode = Tree.TreeNode

class FileTree extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    selectableType: PropTypes.oneOf(['file', 'folder', 'both']),
    selectedFile: PropTypes.string,
    setSelectedFile: PropTypes.func,
    rootFolder: PropTypes.string.isRequired,
    getNodeChild: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    isDisabled: false,
    selectableType: 'both',
    selectedFile: '',
    setSelectedFile: () => {},
    getNodeChild: () => {},
  }

  state = {
    fileTreeData: [],
    loading: false,
  }

  // Todo : error handling
  async componentDidMount() {
    const { selectableType, rootFolder, getNodeChild } = this.props
    this.setState((prevState, props) => ({
      loading: true,
    }))
    const treeRoot = await getNodeChild(rootFolder)
    this.setState((prevState, props) => ({
      fileTreeData: treeRoot,
      loading: false,
      isFileSelectable: ['both', 'file'].includes(selectableType),
      isFolderSelectable: ['both', 'folder'].includes(selectableType),
    }))
  }

  // Todo : error handling
  onClickNode = treeNode => {
    const { getNodeChild } = this.props
    return getNodeChild(treeNode.props.path).then(childNodes => {
      if (!childNodes) return Promise.resolve()
      treeNode.props.dataRef.children = childNodes
      this.setState((prevState, props) => ({
        fileTreeData: [...this.state.fileTreeData],
      }))
    })
  }

  onSelect = (selectedKeys, event) => {
    this.props.setSelectedFile(
      !isEmpty(selectedKeys) ? event.node.props.path : ''
    )
  }

  renderTreeNodes = data => {
    const { isFileSelectable, isFolderSelectable } = this.state
    return data.map(item => (
      <TreeNode
        title={item.name}
        key={item.path}
        path={item.path}
        isLeaf={!item.isFolder}
        selectable={item.isFolder ? isFolderSelectable : isFileSelectable}
        dataRef={item}
      >
        {item.children ? this.renderTreeNodes(item.children) : null}
      </TreeNode>
    ))
  }

  renderTree = () => {
    const { fileTreeData } = this.state
    const { isDisabled, selectedFile, rootFolder } = this.props
    let nowPath = selectedFile ? selectedFile : rootFolder.concat(' > ')
    nowPath = nowPath.slice(1).replace(/\//g, ' > ')

    return isEmpty(fileTreeData) ? (
      <div className={cx('file-tree__empty')}>Empty</div>
    ) : (
      <>
        <div
          className={cx(
            'file-tree__selected-file',
            nowPath.length < 80
              ? 'file-tree__selected-file--normal-height'
              : 'file-tree__selected-file--double-height'
          )}
        >
          {nowPath}
        </div>
        <div className={cx('file-tree__tree')}>
          <DirectoryTree
            disabled={isDisabled}
            loadData={this.onClickNode}
            onSelect={this.onSelect}
          >
            {this.renderTreeNodes(fileTreeData)}
          </DirectoryTree>
        </div>
      </>
    )
  }

  render() {
    const { loading } = this.state
    const { className } = this.props

    return (
      <div className={cx('file-tree', className)}>
        {loading ? (
          <Spin className={cx('file-tree__spin')} tip="Loading..." />
        ) : (
          this.renderTree()
        )}
      </div>
    )
  }
}

export default FileTree
