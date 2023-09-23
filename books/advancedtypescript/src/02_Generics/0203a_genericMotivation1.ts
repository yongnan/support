/* eslint-disable prefer-const */

export {}

function getNames(persons: { name: string; }[]) {
    const results = [];
    for (let person of persons) {
        results.push(person.name);
    }
    return results; 
}
console.log(getNames([{ name: "John" },{ name: "Alice2" }]));