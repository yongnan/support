/* eslint-disable @typescript-eslint/no-unused-vars */

const add = (x: number, y: number) => x + y;
const adds = (x: string, y: number) => x + y;

function sub(x:number,y:number){
    return x - y;
}

const operation: (x:number, y:number) => number = sub;

//Don'tdothis!
const operation2: Function = sub;