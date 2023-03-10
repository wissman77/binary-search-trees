const Node = require('./node');

class Tree {
  constructor(array) {
    array = this._sort(array);
    array = this._removeDuplicates(array);
    this.root = this.buildTree(array) || null;
  }

  _sort(arr) {
    return arr.sort((a, b) => a - b);
  }

  _removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  buildTree(array) {
    if (array.length === 0) return null;
    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1));
    return node;
  }

  insert(value, node = this.root) {
    if (node === null) {
      node = new Node(value);
    }
    if (value < node.data) {
      node.left = this.insert(value, node.left);
    }
    if (value > node.data) {
      node.right = this.insert(value, node.right);
    }
    return node;
  }

  delete(value, node = this.root) {
    // base case empty tree
    if (node === null) return node;
    // travese the tree down
    if (value < node.data) {
      node.left = this.delete(value, node.left);
    } else if (value > node.data) {
      node.right = this.delete(value, node.right);
    } else {
      // node with one child
      if (node.left === null) return node.right;
      else if (node.right === null) return node.left;

      // Node with 2 children
      node.data = this._minValue(node.right);
      node.right = this.delete(node.data, node.right);
    }
    return node;
  }

  _minValue(node) {
    let minv = node.data;
    while (node.left != null) {
      minv = node.left.data;
      node = node.left;
    }
    return minv;
  }

  find(value, node = this.root) {
    if (node === null) return null;
    if (node.data === value) return node;
    // value greater than node value
    if (node.data < value) return this.find(value, node.right);
    // value is smaller than node value
    return this.find(value, node.left);
  }

  levelOrder(func = null) {
    if (this.root === null) return [];

    const queue = [];
    const results = [];

    queue.push(this.root);

    while (queue.length) {
      let current = queue.shift();

      if (func) func(current);
      else results.push(current.data);

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }

    if (!func) return results;
  }

  // node left right
  preorder(func, node = this.root, results = []) {
    if (node === null) return results;
    results.push(node.data);
    if (func) func(node);
    this.postorder(func, node.left, results);
    this.postorder(func, node.right, results);
    if (!func) return results;
  }

  // left node right
  inorder(func, node = this.root, results = []) {
    if (node === null) return results;
    this.inorder(func, node.left, results);
    results.push(node.data);
    if (func) func(node);
    this.inorder(func, node.right, results);
    if (!func) return results;
  }

  // left right node
  postorder(func, node = this.root, results = []) {
    if (node === null) return results;
    this.postorder(func, node.left, results);
    this.postorder(func, node.right, results);
    results.push(node.data);
    if (func) func(node);
    if (!func) return results;
  }

  height(node = this.root) {
    if (!node) return 0;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    let depth = 0;
    let current = this.root;
    while (current.data !== node.data) {
      depth++;
      if (node.data > current.data) {
        current = current.right;
      } else {
        current = current.left;
      }
    }
    return depth;
  }

  // balanced tree id one where the difference between heights
  // of left subtree and right subtree of every node is not more than 1.

  isBalanced(node = this.root) {
    if (node === null) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    if (this.root === null) return;
    const array = this.inorder();
    this.root = this.buildTree(array);
  }
}

module.exports = Tree;
