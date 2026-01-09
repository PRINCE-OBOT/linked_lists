import Node from "./node";

export default class LinkedList {
  constructor(list) {
    this.list = list;
  }

  append(key, value) {
    if (!this.list) {
      this.list = new Node(key, value);
    } else {
      const recursive = (node) => {
        if (node.nextNode) {
          recursive(node.nextNode);
        } else {
          node.nextNode = new Node(key, value);
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
      const recursive = (node, numberOfNode) => {
        if (node.nextNode) {
          numberOfNode++;
          return recursive(node.nextNode, numberOfNode);
        }
        return numberOfNode;
      };
      return recursive(this.list, 1);
    }
  }

  head() {
    return this.list === null ? undefined : this.list.value;
  }

  tail() {
    if (!this.list) return undefined;

    const recursive = (node) => {
      if (node.nextNode) return recursive(node.nextNode);
      return node.value;
    };
    return recursive(this.list);
  }

  at(index) {
    if (index < 0 || !this.list) return undefined;
    else {
      const recursive = (node, depth) => {
        if (index === depth) {
          return node.value;
        }

        if (!node.nextNode) {
          return undefined;
        } else {
          depth++;
          return recursive(node.nextNode, depth);
        }
      };

      return recursive(this.list, 0);
    }
  }

  pop() {
    if (!this.list) return undefined;
    else {
      const recursive = (node) => {
        if (node.nextNode) {
          if (!node.nextNode.nextNode) {
            const secondList = node.nextNode;

            node.nextNode = null;

            return secondList;
          }
        } else {
          const secondList = node;

          this.list = null;

          return secondList;
        }
        return recursive(node.nextNode);
      };

      return recursive(this.list);
    }
  }

  contains(value) {
    if (!this.list) return false;
    else {
      const recursive = (node) => {
        if (node.value === value) {
          return true;
        }
        if (!node.nextNode) return false;

        return recursive(node.nextNode);
      };
      return recursive(this.list);
    }
  }

  findIndex(value) {
    if (!this.list) return -1;
    else {
      const recursive = (node, index) => {
        if (node.value === value) {
          return index;
        }
        if (!node.nextNode) return -1;

        index++;
        return recursive(node.nextNode, index);
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
        const recursive = (node, depth) => {
          if (node.nextNode) {
            if (index === depth) {
              values.reverse().forEach((value) => {
                node.nextNode = new Node(value, node.nextNode);
              });
            } else {
              depth++;
              return recursive(node.nextNode, depth);
            }
          } else {
            throw RangeError("Index above range");
          }
        };

        recursive(this.list, 1);
      }
    }
  }

  removeAt(index) {
    if (index < 0) throw RangeError("Index below range");

    if (!this.list) {
      throw RangeError("Index above range");
    } else {
      if (index === 0) {
        const secondList = this.list.nextNode;
        this.list = secondList;
      } else {
        const recursive = (node, depth) => {
          if (node.nextNode) {
            if (index === depth) {
              const secondList = node.nextNode.nextNode;
              node.nextNode = secondList;
            } else {
              depth++;
              return recursive(node.nextNode, depth);
            }
          } else {
            throw RangeError("Index above range");
          }
        };

        recursive(this.list, 1);
      }
    }
  }

  display() {
    console.log(this.list);
  }
}
