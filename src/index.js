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

  pop(list = this.list) {
    if (!list) return undefined;
    else if (list.nextNode) {
      if (!list.nextNode.nextNode) {
        const secondList = list.nextNode;

        list.nextNode = null;

        return secondList;
      }
    } else if (!list.nextNode) {
      const secondList = list;

      this.list = null;

      return secondList;
    }
    return this.pop(list.nextNode);
  }

  contains(value, list = this.list) {
    if (list.value === value) {
      return true;
    }
    if (!list.nextNode) return false;

    return this.contains(value, list.nextNode);
  }

  findIndex(value, list = this.list, index = 0) {
    if (value === list.value) {
      return index;
    }
    if (!list.nextNode) return -1;

    index++;
    return this.findIndex(value, list.nextNode, index);
  }

  toString(list = this.list, listStringFormat = "") {
    if (!this.list) return listStringFormat;

    listStringFormat += `(${list.value}) --> `;

    if (!list.nextNode) return `${listStringFormat}${list.nextNode}`;

    return this.toString(list.nextNode, listStringFormat);
  }

  insertAt(index, ...values) {
    if (index < 0) throw RangeError("Index below range");

    if (this.list) {
      if (index === 0) {
        values.reverse().forEach((value) => this.prepend(value));
      } else {
        const rec = (list, depth = 0) => {
          if (index - 1 === depth) {
            if (list.nextNode) {
              values.reverse().forEach((value) => {
                list.nextNode = new Node(value, list.nextNode);
              });
            } else {
              throw RangeError("Index above range");
            }
          } else {
            depth++;
            return rec(list.nextNode, depth);
          }
        };

        rec(this.list);
      }
    } else {
      if (index !== 0) throw RangeError("Index above range");

      values.forEach((value) => this.append(value));
    }
  }

  print() {
    console.log(this.list);
  }
}

const list = new LinkedList();

list.append("dog");
list.append("goat");
// list.append("snake");
list.insertAt(0, "grok", "beef");
list.prepend("hamster");
// list.prepend("grok");
// list.prepend("grok");
// console.log(list.size());
// console.log(list.head());
// console.log(list.tail());
// console.log(list.at(0));

// console.log(list.pop());
list.print();
console.log(list.toString());
