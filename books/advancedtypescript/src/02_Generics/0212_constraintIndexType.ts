/* eslint-disable @typescript-eslint/no-unused-vars */
export {}

interface Person {
    name: string;
    age: number;
}

type PersonKeys = keyof Person; // "name" | "age"

function get<T, K extends keyof T>(object: T, key: K): T[K]{
    return object[key];
}

declare const person: Person;
get(person, "name")  // No errors
//get(person, "foo")  // Error!