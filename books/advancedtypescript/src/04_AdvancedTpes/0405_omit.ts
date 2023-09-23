export {}

// Omit: take an object type and remove some properties from it.

interface Person {
    id: number;
    name: string;
    age: number;
}

type AnonymousPerson = Omit<Person, "id">;

const anonymousPerson: AnonymousPerson = {
    id: 1, name: "John", age: 33 };  //Error!