/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

function foo1(bar: any){
    const a: string = bar; // no error
    const b: number = bar; // no error
    const c: { name: string } = bar; // no error
}    

// function foo2(bar: unknown){
//     const a: string = bar; // Type 'unknown' is not assignable to type 'string'.(2322) 
//     const b: number = bar; // Type 'unknown' is not assignable to type 'number'.(2322) 
//     const c: { name: string } = bar; 
//     // Type 'unknown' is not assignable to type '{ name:string;}'.(2322)
// }    

//On the other hand, all types are assignable to unknown. 
let x: unknown;
x = 123; //no error 
x = "abc"; //noerror 
x = true; //noerror