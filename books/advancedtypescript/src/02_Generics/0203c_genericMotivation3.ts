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

function map(items: any[], mappingFunction: (item: any) => any ): any[]{
    return items.map(mappingFunction);
}

//The second argument is a function that only works on numbers, 
// not on `Person` objects.

//The result doesn't make sense.
console.log(map(persons,(n)=>n+5));

//We tell TypeScript that `ages` is an array of strings 
// while in fact it will be an array of numbers.

//The second line results in a runtime error.
const ages: string[] = map(persons, (person) => person.age);
console.log(ages[1].toLowerCase());
