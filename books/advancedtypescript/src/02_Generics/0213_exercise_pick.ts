export {}

// `K extends keyof T` is type constraint that limits possible values of K
// to string literal types representing names of T properties
function pick<T, K extends keyof T>(array: T[], key: K): T[K][] {
    const results: T[K][] = [];
    for (const element of array) {
        results.push(element[key])
    }
    return results;
}

interface Person {
    name: string;
    age: number;
}

const arry: Person[] = [
    {"name": "alex", age: 19},
    {"name": "john", age: 21},
]
console.log(pick(arry, "name"));
console.log(pick(arry, "age"));
//console.log(pick(arry, "age2"));
