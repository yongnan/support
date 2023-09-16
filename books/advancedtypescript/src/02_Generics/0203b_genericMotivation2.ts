/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
export {}

interface Person {
    name: string;
    age: number;
}

const persons: Person[] = [
    { name: "John", age: 19},
    { name: "Alice", age: 23},
]
const names0 = persons.map(person => person.name);
console.log(names0);

// the magic map
function map(items: any[], mappingFunction: (item: any) => any ): any[]{
    const results = [];
    for(let item of items) {
        results.push(mappingFunction(item))
    }
    return results;
}

//WorkswitharrayofPersons
const names = map(persons, (person) => person.name)
console.log(names);

//Workswitharrayofnamestoo
const uppercaseNames = map(names, (name) => name.toUpperCase());
console.log(uppercaseNames);

//Worksevenwithanarrayofnumbers!
const evenNumbers = map([1,2,3,4,5], (n) => n*2);
console.log(evenNumbers);

//Error: 'hello' is not an array
//map("hello", (person:Person) => person.name); 

//Error:1000 is not a function 
//map(persons, 1000);
