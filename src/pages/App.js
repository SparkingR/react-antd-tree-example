import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './App.module.scss'
import { Tree } from 'antd'
import { requestTreeNode } from '../api'

const cx = classNames.bind(styles)
const TreeNode = Tree.TreeNode

class App extends Component {
  state = {
    treeData: [],
  }

  componentDidMount = () => {
    requestTreeNode('/root').then(root => this.setState({ treeData: root }))
  }

  onLoadData = treeNode =>
    treeNode.props.children || treeNode.props.isLeaf
      ? null
      : requestTreeNode(treeNode.props.eventKey).then(sonNode => {
          treeNode.props.dataRef.children = sonNode
          this.setState({
            treeData: [...this.state.treeData],
          })
        })

  renderTreeNodes = data =>
    data.map(item => (
      <TreeNode
        title={item.name}
        key={item.path}
        isLeaf={!item.isFolder}
        dataRef={item}
      >
        {item.children ? this.renderTreeNodes(item.children) : null}
      </TreeNode>
    ))

  render() {
    return (
      <Tree loadData={this.onLoadData} className={cx('app')}>
        {this.renderTreeNodes(this.state.treeData)}
      </Tree>
    )
  }
}

export default App
