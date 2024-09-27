export class Person {
  //export untuk memperbolehkan class digunakan di script lain
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  //Method
  printData = () => {
    console.log(`Name: ${this.name} | ${this.age}`);
  };
}

//Export Method
let subtract = (x, y) => {
  return x - y;
};

export { subtract };
