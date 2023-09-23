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

// Generic map
function map<TElement, TResult> (
    items: TElement[], 
    mappingFunction: (item:TElement) => TResult ): TResult[] {
    return items.map(mappingFunction);
}

// calling generic function
// provide types
const names = map<Person, string>(persons, person => person.name);
console.log(names);

// infer types
const ages = map(persons, person => person.age);
console.log(ages);


//Error! Operator '+' cannot be applied to Person and 5.
//map(persons, (n) => n+5 );
