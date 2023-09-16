/* eslint-disable @typescript-eslint/no-unused-vars */

interface Person {
    hello(): void;
}

// const n: number = undefined;  //error
// const f: string = null;       //error
// const person: Person = null;    //error

// person.hello();  //runtime error

function foo(person: Person){
    person.hello();
}

//foo(null); // error

function bar(person: Person | null ){
    // person.hello(); //error
    if (person != null){
        person.hello()
    }
}
bar(null);