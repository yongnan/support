export {}

/**
 * Partial
 * Partial<T> returns a type that has the same properties as T but all of them are optional. 
 * This is most useful when the strictNullChecks flag is enabled.
 */

type Partial<T> = {
    [P in keyof T] ? : T[P]
};

interface Settings {
    width: number;
    autoHeight: boolean;
}

const defaultSettings: Settings = {};

function getSettings(custom: Partial<Settings>) : Partial<Settings> {
    return { ...defaultSettings, ...custom}
}

/** 
 * Required
 * Required<T> removes optionality from T’s properties. 
 */

type Required<T> = {
    [P in keyof T]-? : T[P]
};

type Foo = Required<{ name?: string }>; // { name: string; }

/**
 * Pick
 * create an interface that contains only a subset of properties of T.
 */

type Pick<T, K extends keyof T> = {
    [P in K] : T[P];
};

interface Person {
    name: string;
    age: number;
    id: number;
}

type NameAndAge = Pick<Person, "name" | "age">; // {name: string; age: number}

/**
 * Record
 *  that doesn’t actually map over any source type. Instead, 
 *  it creates a completely new object type out of thin air.
 */

 type Record<K extends keyof any, T> = { 
     [P in K] :T;
 };

 type StringDictionary = Record<string, string>; //[x: string]: string;
 type ABCNumbers = Record<"a" | "b" | "c", number>; // {a: number; b: number, c: number}