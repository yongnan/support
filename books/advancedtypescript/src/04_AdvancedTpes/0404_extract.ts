export {}

type MyExtract<T, U> = T extends U ? T : never; 

//Example1
type AB = MyExtract<"A"|"B"|"C", "C">; //'C' 

//Example2
type SomeNumbers = MyExtract<"A"|"B"|1|2, string>; //'A'|'B'

//Example3
interface StrangeObj{
    foo: string;
    bar: number;
    1: string;
    42: number; 
}

function setStringProp<T, K extends MyExtract<keyof T, string>>(
    obj: T,
    key: K,
    value: T[K]
) {
    obj[Key] = value;
}

declare const obj: StrangeObj;
setStringProp(obj, "foo", "abc");
setStringProp(obj, "bar", 1);
setStringProp(obj, 42, 1); // Error!

