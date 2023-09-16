export {}

type ReturnTypes<T> = {
    [K in keyof T] : T[K] extends (...args: any[]) => any
    ? ReturnType<T[K]>
    : never;
}

type Test = ReturnTypes<{
    a: string;
    b: (a: number) => number;
}>; // {a: never; b: number} 