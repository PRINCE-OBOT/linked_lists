import HashMap from "./hashMap";

const hashMap = new HashMap();

console.log(hashMap.set("Prince", "We are happy"));
console.log(hashMap.set("okay", "We are good"));
console.log(hashMap.set("joh", "We are very happy"));
console.log(hashMap.remove("oka"));

hashMap.display();
