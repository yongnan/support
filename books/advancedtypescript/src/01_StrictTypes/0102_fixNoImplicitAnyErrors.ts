// interface Person{
//     name: string;
// }


// function sayHello2(person: any){
//     console.log(`Hello, ${person.name}`);
// }    

// creating this alias is that it’s even easier to spot.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TODOPerson = any;

function sayHello2(person: TODOPerson){
    console.log(`Hello, ${person.name}`);
}    
    
sayHello2({name: "mary2"})