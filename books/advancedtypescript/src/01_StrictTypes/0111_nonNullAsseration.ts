export {}

interface Person {
    hello(): void;
}

function sayHello(person: Person | undefined) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    person!.hello();  // no errors!!
}    

sayHello(undefined);