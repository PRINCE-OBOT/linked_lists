import LinkedList from "./linkedList";

const list = new LinkedList();

list.append("dog");
list.append("cat");

list.insertAt(1, "mirror", "socket");

list.prepend("Chair");

console.log(list.size());

console.log(list.head());

console.log(list.tail());

console.log(list.at(2));

console.log(list.pop());

console.log(list.findIndex("socket"));

console.log(list.toString());

list.display();
