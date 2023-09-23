export {}

interface Person {
    name: string;
    age: number;
}

type Readonly<T> = {
    readonly [P in keyof T]: T[P]
}

type ReadonlyPerson = Readonly<Person>;

type DeepReadonly<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>
};

type Employment = DeepReadonly<{
    person: Person;
    company: string;
}>

declare const employment: Employment;
employment.person.name = "Milosz";  // Error!