interface Person {
    name: string;
    employer?: string;
}

function getEmployers(persons: Person[]): string[] {
    return persons
        .filter(
        //    (person) => person.employer !== undefined
            (person): person is Required<Person> => person.employer !== undefined
        )
        .map((person) => person.employer); // Error!
}