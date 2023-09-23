export {}

type MyExclude<T, U> = T extends U ? never : T;

// example 1
type AB = Exclude<"A" | "B" | "C", "C">;  // 'A' | 'B'

// example 2
type SomeNumbers = MyExclude< "A" | "B" | 1 | 2, string>;  //1|2

// example 3
interface Person {
    id: number;
    name: string;
    age: number;
}

function safeSetProp<T, K extends MyExclude<keyof T, "id">>(
    obj: T,
    key: K,
    value: T[K]
) {
    obj[key] = value;
}

declare const obj:Person; 
safeSetProp(obj, "name", "Miłosz"); 
safeSetProp(obj, "id", 100);//Error!