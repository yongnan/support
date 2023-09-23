class Animal
{
    constructor(type){
        this.type = type;
    }
    getType(){
        return this.type;
    }
}
class Dog extends Animal{
    constructor(){
        super('dog');
    }
}
let dog = new Dog();
console.log(dog.getType());