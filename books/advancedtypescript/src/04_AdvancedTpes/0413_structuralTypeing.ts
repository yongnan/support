/* eslint-disable @typescript-eslint/no-unused-vars */

// Structural typing
interface Cat {
    name: string;
    breed: string;
}

interface Dog {
    name: string;
    breed: string;
}

const cat: Cat = { name: "Filemon", breed: "Chartreux"}
const dog: Dog = cat;  // No error

// With nominal typing, even the line below would result in an error:
// cat' type is "object literal" is not allow assign to Cat 

// const cat: Cat = {name:"Filemon", breed:"Chartreux"};  //Error