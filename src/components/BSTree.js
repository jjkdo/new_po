import React, { useState, useEffect } from 'react'
import BSTMenu from './BSTMenu'
import BST from './DataStructure'
import useDelError from '../hooks/useDelError'
import useTraversal from '../hooks/useTraversal'

function BSTree(props) {
	//hooks
	const [tree, setTree] = useState()
	const [treeHtml, setTreeHtml] = useState()
	const [delError, setDelError] = useDelError(treeHtml)
	const [searchError, setSearchError] = useDelError(treeHtml)
	const [traversalList, traversalDispatch] = useTraversal(tree)

	useEffect(() => {
		let tempTree = new BST()
		setTree(tempTree)
		return () => {
			setTree(null)
			setTreeHtml(null)
		}
	}, [])

	const insert = val => {
		val = parseInt(val)
		if (!val) return
		let tempTree = tree
		tempTree.insert(val)
		setTree(tempTree)
		setTreeHtml(tree.root.html)
		traversalDispatch('clear')

	}

	const remove = val => {
		val = parseInt(val)
		let tempTree = tree
		setDelError(false)
		if (!tempTree.search(val)) {
			setDelError(true)
			return
		}
		tempTree.remove(val)
		setTree(tempTree)
		if (tree.root) setTreeHtml(tree.root.html)
		else setTreeHtml(null)
		traversalDispatch('clear')

	}

	const search = val => {
		val = parseInt(val)
		let tempTree = tree

		setSearchError(false)
		if (!tempTree.search(val)) {
			setSearchError(true)
			return
		}
		
		tempTree.search(val)
		setTree(tempTree)
		if (tree.root) setTreeHtml(tree.root.html)
		else setTreeHtml(null)
	}

	const random = num => {
		num = parseInt(num)
		if (num < 0) return
		let tempTree = new BST(num)
		setTree(tempTree)

		if (num) setTreeHtml(tempTree.root.html)
		else setTreeHtml(null)
		traversalDispatch('clear')

	}

	return (
		<div>
			<header>
				<h1 className="heading">
					Binary Search Tree
				</h1>
			</header>
			<BSTMenu
				insert={insert}
				remove={remove}
				search={search}
				random={random}
				traversal={traversalDispatch}
				delError={delError ? 'error' : ''}
				seaError={searchError ? 'error' : ''}
			/>
			<div className="traversal">
				{traversalList.list.length ? (
					<ul>
						{' '}
						{traversalList.op}:
						{traversalList.list.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				) : (
					<p>No Traversal Performed</p>
				)}
			</div>
			<div className="tree">
				<ul>{treeHtml}</ul>
			</div>
		</div>
	)
}

export default BSTree
