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

  append(value) {
    if (!this.list) {
      this.list = new Node(value);
    } else {
      const recursive = (list) => {
        if (list.nextNode) {
          recursive(list.nextNode);
        } else {
          list.nextNode = new Node(value);
        }
      };

      recursive(this.list);
    }
  }

  prepend(value) {
    this.list = new Node(value, this.list);
  }

  size() {
    if (!this.list) {
      return 0;
    } else {
      const recursive = (list, numberOfNode) => {
        if (list.nextNode) {
          numberOfNode++;
          return this.size(list.nextNode, numberOfNode);
        }
        return numberOfNode;
      };
      return recursive(this.list, 1);
    }
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

  at(index) {
    if (index < 0 || !this.list) return undefined;
    else {
      const recursive = (list, depth) => {
        if (index === depth) {
          return list.value;
        }

        if (!list.nextNode) {
          return undefined;
        } else {
          depth++;
          return recursive(list.nextNode, depth);
        }
      };

      return recursive(this.list, 0);
    }
  }

  pop() {
    if (!this.list) return undefined;
    else {
      const recursive = (list) => {
        if (list.nextNode) {
          if (!list.nextNode.nextNode) {
            const secondList = list.nextNode;

            list.nextNode = null;

            return secondList;
          }
        } else {
          const secondList = list;

          this.list = null;

          return secondList;
        }
        return recursive(list.nextNode);
      };

      return recursive(this.list);
    }
  }

  contains(value) {
    if (!this.list) return false;
    else {
      const recursive = (list) => {
        if (list.value === value) {
          return true;
        }
        if (!list.nextNode) return false;

        return recursive(list.nextNode);
      };
      return recursive(this.list);
    }
  }

  findIndex(value) {
    if (!this.list) return -1;
    else {
      const recursive = (list, index) => {
        if (list.value === value) {
          return index;
        }
        if (!list.nextNode) return -1;

        index++;
        return recursive(list.nextNode, index);
      };

      return recursive(this.list, 0);
    }
  }

  toString() {
    if (!this.list) return "";
    else {
      const recursive = (list, listStringFormat) => {
        listStringFormat += `(${list.value}) -> `;

        if (!list.nextNode) return `${listStringFormat}${list.nextNode}`;

        return recursive(list.nextNode, listStringFormat);
      };

      return recursive(this.list, "");
    }
  }

  insertAt(index, ...values) {
    if (index < 0) throw RangeError("Index below range");

    if (!this.list) {
        if (index !== 0) throw RangeError("Index above range");
        
      values.forEach((value) => this.append(value));
    } else {
      if (index === 0) {
        values.reverse().forEach((value) => this.prepend(value));
    } else {
        const recursive = (list, depth) => {
            if (list.nextNode) {
                if (index === depth) {
                    values.reverse().forEach((value) => {
                        list.nextNode = new Node(value, list.nextNode);
                    });
                } else {
                    depth++;
                    return recursive(list.nextNode, depth);
                }
            } else {
            throw RangeError("Index above range");
          }
        };

        recursive(this.list, 1);
      }
    }
  }

  print() {
    console.log(this.list);
  }
}

const list = new LinkedList();

list.append("dog");
list.append("goat");
list.append("snake");
// list.insertAt(0, "grok", "beef");
// list.prepend("hamster");
// list.prepend("grok");
// list.prepend("grok");
// console.log(list.size());
// console.log(list.head());
// console.log(list.tail());
// console.log(list.at(1));

// console.log(list.pop());
// console.log(list.findIndex("gat"));
list.insertAt(3, 'k')
list.print();
console.log(list.toString());
