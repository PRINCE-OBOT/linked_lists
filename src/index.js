class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.list = null;
  }

  append(value, list = this.list) {
    if (!list) {
      list = new Node(value);
    } else if (list.nextNode) {
      this.append(value, list.nextNode);
    } else {
      list.nextNode = new Node(value);
    }

    this.list = list;
  }

  prepend(value) {
    this.list = new Node(value, this.list);
  }

  size(numberOfNode = 1, list = this.list) {
    if (list.nextNode) {
      numberOfNode++;
      return this.size(numberOfNode, list.nextNode);
    }
    return numberOfNode;
  }

  head() {
    return this.list === null ? undefined : this.list.value;
  }

  tail(list = this.list) {
    return this.list === null
      ? undefined
      : list.nextNode
      ? this.tail(list.nextNode)
      : list.value;
  }

  at(index, list = this.list, depth = 0) {
    if (!list.nextNode) {
      return undefined;
    } else if (index === depth) {
      return list.value;
    } else {
      depth++;
      return this.at(index, list.nextNode, depth);
    }
  }

  print() {
    console.log(this.list);
  }
}

const list = new LinkedList();

list.append("dog");
list.append("snake");
list.append("goat");
list.prepend("hamster");
// console.log(list.size());
// console.log(list.head());
// console.log(list.tail());
console.log(list.at(0));

// list.print();
