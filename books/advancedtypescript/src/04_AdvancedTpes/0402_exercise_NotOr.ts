export {}

// Define Not and Or

// type Not<T> = never;
// type Or<T> = never;

type Not<T> = T extends false ? true : false;

type Or<T> = T extends [true, true]
  ? true
  : T extends [true, false]
  ? true
  : T extends [false, true]
  ? true
  : T extends [false, false]
  ? false
  : never;

//The following assignments should compile correctly
const foo: Not<true> = false;
const foo2: Not<false> = true;

const bar: Or<[true, false]> = true;
const bar2: Or<[false, false]> = false;  
