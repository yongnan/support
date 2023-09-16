/* eslint-disable @typescript-eslint/no-unused-vars */
import { map, prop } from 'ramda';
export {}

interface Person {
    id: string;
    name: string;
    birthYear: number;
}

// function getIds(persons: Person[]) {
//     return persons.map((person) => person.id)
// }

// generalize version
// function getIds<T extends Record<"id", string>>(elements: T[]) {
//     return elements.map((el) => el.id)
// }

// ramda version
const getIds = map(prop("id"))

// TypeScript (pre 3.4) compatible
// the type of getIds will infer to:
//   <T>(list: readonly Record<"id", T>[]) => T[]. 
//const getIds = map<Record<"id", string>, string>(prop("id"));