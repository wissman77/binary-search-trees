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

  _removeDuplicates(array) {
    return [...new Set(arr)];
  }

  buildTree(array) {}
}
