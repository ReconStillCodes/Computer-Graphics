//Variables
var num1 = 10;

{
  let num1 = 20;
  num1 = 30;
  console.log(num1);
}

console.log(num1);

const num3 = 40; //Tidak dapat diubah
// num3 = 50; //-> error
console.log(num3);

//Function

let sum = function (x, y) {
  return x + y;
};

console.log(`sum: ${sum(5, 10)}`);

let multiply = (x, y) => {
  return x * y;
};

console.log(`multiply: ${multiply(2, 4)}`);

//Methods for Array

let arr = [1, 100, 37, 40, 55, 84];

let even = (value) => {
  return value % 2 == 0;
};

console.log(arr.find(even)); //Mendapatkan valuenya
console.log(arr.findIndex(even)); //Mendapatkan indexnya

//Class
class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  //Method
  printData = () => {
    console.log(`Name: ${this.name} | ${this.age}`);
  };
}

let student1 = new Student("Matthew", 20);
let student2 = new Student("Patricia", 19);

student1.printData();
student2.printData();

//Module
//Bikin di index.html memiliki type = "module"
import { Person } from "./person.js"; //Import class dari script lain

let person1 = new Person("Saputra", 7);
person1.printData();

import { subtract } from "./person.js";

console.log(`20 - 17 = ${subtract(20, 17)}`);

//Promise
//Memecahkan permasalahan synchronus

let promise = new Promise((resolve, reject) => {
  //Menerima parameter function(resolve, reject)
  setTimeout(() => resolve("Promise Done"), 2000); //Wait 2000 ms
  setTimeout(() => reject("Promise Reject"), 1500); // wait 1500 ms
});

promise.then(
  (result) => console.log(result), //If resolved
  (error) => console.log(error) //if reject
);

//Karena reject lebih cepat, maka promise akan print reject

//Spreading - menggabungkan array
let list = [1, 2, 3];
let list1 = [4, 5, 6];

// list = list.concat(list1); //cara 1 pakai concat
list = [...list, ...list1]; //cara 2 pakai Spreading
//(...) is called spread operator

console.log(list);

//Destructing array
let sentences = ["hi", "hello", "olla"];

//get value from index
let w1 = sentences[0];
let w2 = sentences[1];

console.log(w1, w2);

//
let [word1, word2] = sentences; //Mengimpan valud dari idx 0 & 1 ke word1 & word2
console.log(word1, word2);

let [word3, , word4] = sentences; //cara untuk skip index
console.log(word3, word4);

let [word5, ...word6] = sentences; //Spreading di array destructuring

console.log(word5, word6);

//let [word7, word8] = ["hi"]; //word8 akan undefined karena tidak ada lagi value setelahnya
let [word7 = "hello", word8 = "olla"] = ["hi"]; //Bila tidak ada value, pakai value default

console.log(word7, word8);

//Object Destructuring
let p = { name: "Steven", age: "18" }; //Buat object
console.log(p.name, p.age); // access name & age
