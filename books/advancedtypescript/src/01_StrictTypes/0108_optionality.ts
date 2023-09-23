/* eslint-disable @typescript-eslint/no-unused-vars */
export {}

interface Person {
    name: string;
}

function hello(person?: Person){
    person;
}

interface Employee {
    id: number;
    name: string;
    supervisorId?: number;
}

hello();
const employee: Employee = {
    id: 1,
    name: "john"
};

employee.supervisorId;

function sayHello(name?: string){
    if (name){
        console.log(name)
    }
}
sayHello("");
sayHello();