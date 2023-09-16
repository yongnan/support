class Dog {
    constructor(id){
        this.id = id;
    }
}

let dog = new Dog(100);
console.log(dog.id);
dog.id = 200;
console.log(dog.id);