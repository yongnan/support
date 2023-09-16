/* eslint-disable @typescript-eslint/no-unused-vars */
export {}
type Tree = 
| { type: "empty" }
| { type: "leaf"; value: number }
| { type: "node"; left: Tree, right: Tree }