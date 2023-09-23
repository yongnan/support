export {}

// It accepts a function type, T, 
// and it extracts the return type of the function using the infer keyword. 
//

type ReturnType<T extends (...args: any) => any> = T extends (
    ...args: any
) => infer R
    ? R : any;

const sayHello = (name: string, age: number) => 
    `Hello ${name}, your age is ${age}`;

type SayHelloReturnType = ReturnType<typeof sayHello>; // string

// Redux samples
function fetchDataSuccess(data:string[]){ return {
    type: "fetchDataSuccess",
    payload: data, };
}    

function reduceFetchDataSuccess(
    state: State,
    { payload }: ReturnType<typeof fetchDataSuccess>
){
    return "Empty"
}