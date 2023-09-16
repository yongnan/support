export {}

const sum = [1, 2, 3, 4, 5].reduce((sum, el) => sum + el, 0);
console.log(sum);

interface Person {
    name: string;
    age: number;
}

const persons: Person[] = [
    { name: "John", age: 19},
    { name: "Alice", age: 23},
]

const ageByPerson = persons.reduce(
    (result, person) => ({
        ...result,
        [person.name]: person.age,
    }),
    {}
);
console.log(ageByPerson)