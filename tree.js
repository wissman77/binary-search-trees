const Node = require('./node');

class Tree {
  constructor(array) {
    array = this._sort(array);
    array = this._removeDuplicates(array);
    this.root = this.buildTree(array, 0, array.length - 1) || null;
  }

  _sort(arr) {
    return arr.sort((a, b) => a - b);
  }

  _removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  buildTree(array, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);
    return node;
  }
}

module.exports = Tree;
