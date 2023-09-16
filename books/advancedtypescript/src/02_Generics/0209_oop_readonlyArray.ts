/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export {}

interface ReadonlyArray<T>{
    // Skipped most of the methods for brevity. 
    slice(start?: number, end?: number): T[]; 
    map<U>(
        callbackfn: (value: T, index: number, array: readonly T[]) => U,
        thisArg?: any 
    ): U[];
    reduce<U>(
        callbackfn: (
            previousValue: U, 
            currentValue: T, 
            currentIndex: number, 
            array: readonly T[]
        ) => U,
        initialValue: U 
    ):U;

    readonly [n: number]: T;
}