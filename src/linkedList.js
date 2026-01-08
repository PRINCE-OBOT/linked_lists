import Node from "./node";

export default class LinkedList {
  constructor(list) {
    this.list = list;
  }

  append(key, value) {
    if (!this.list) {
      this.list = new Node(key, value);
    } else {
      const recursive = (list) => {
        if (list.nextNode) {
          recursive(list.nextNode);
        } else {
          list.nextNode = new Node(key, value);
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
          return recursive(list.nextNode, numberOfNode);
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

    const recursive = (list) => {
      if (list.nextNode) return recursive(list.nextNode);
      return list.value;
    };
    return recursive(this.list);
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

  contains(key) {
    if (!this.list) return false;
    else {
      const recursive = (list) => {
        if (list.key === key) {
          return true;
        }
        if (!list.nextNode) return false;

        return recursive(list.nextNode);
      };
      return recursive(this.list);
    }
  }

  update(key, value) {
    const recursive = (list) => {
      if (list.key === key) {
        list.value = value;
      }
      if (!list.nextNode) return;

      recursive(list.nextNode);
    };

    recursive(this.list);
  }

  get(key) {
    const recursive = (list) => {
      if (list.key === key) {
        return list.value;
      }
      if (!list.nextNode) return null;

      return recursive(list.nextNode);
    };

    return recursive(this.list);
  }

  findIndex(key) {
    if (!this.list) return -1;
    else {
      const recursive = (list, index) => {
        if (list.key === key) {
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

  removeAt(index) {
    if (index < 0) throw RangeError("Index below range");

    if (!this.list) {
      throw RangeError("Index above range");
    } else {
      if (index === 0) {
        const secondList = this.list.nextNode;
        this.list = secondList;
      } else {
        const recursive = (list, depth) => {
          if (list.nextNode) {
            if (index === depth) {
              const secondList = list.nextNode.nextNode;
              list.nextNode = secondList;
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

  display() {
    console.log(this.list);
  }
}
