#!/usr/bin/node

const prettyPrint = require('./prettyPrint');
const Tree = require('./tree');

const randomNumbers = (size) => {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 101));
  }
  return array;
};

const tree = new Tree(randomNumbers(50));

prettyPrint(tree.root);

console.log(`Is this tree balanced? ${tree.isBalanced()}`);
console.log(`Elements in level: ${tree.levelOrder()}`);
console.log(`Elements in preorder: ${tree.preorder()}`);
console.log(`Elements in inorder: ${tree.inorder()}`);
console.log(`Elements in postorder: ${tree.postorder()}`);

for (let i = 0; i < 10; i++) {
  tree.insert(Math.floor(Math.random() * 300));
}

console.log(`Is this tree balanced? ${tree.isBalanced()}`);

tree.rebalance();

console.log('After rebalance the tree');
console.log(`Is this tree balanced? ${tree.isBalanced()}`);
console.log(`Elements in level: ${tree.levelOrder()}`);
console.log(`Elements in preorder: ${tree.preorder()}`);
console.log(`Elements in inorder: ${tree.inorder()}`);
console.log(`Elements in postorder: ${tree.postorder()}`);
prettyPrint(tree.root);
