export {}

type Parameters<T extends (...args: any) => any > = T extends (
    ...args: infer P
) => any 
  ? P
  : never;

const sayHello = (name: string, age: number) => 
    `Hello ${name}, your age is ${age}`;

type SayHelloParams = Parameters<typeof sayHello>; //[name: string, age: number]    

console.log(sayHello("Alex", 21));