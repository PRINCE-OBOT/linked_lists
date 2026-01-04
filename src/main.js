import LinkedList from "./linkedList";

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

list.insertAt(3, 100, 59);

list.prepend("Chair");

console.log(list.size());

console.log(list.head());

console.log(list.tail());

console.log(list.at(4));

console.log(list.pop());

console.log(list.findIndex("snake"));

console.log(list.toString());

list.display();
