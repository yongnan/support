/* eslint-disable @typescript-eslint/no-unused-vars */

export {}

interface Person{
    name: string;
}

function sayHello(person: Person){
    console.log(`Hello, ${person.name}`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getName(person: any){
    return person.name
}
