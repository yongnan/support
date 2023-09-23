type isSring<T> = T extends string ? true : false;

type A = isSring<string>;
type B = isSring<"abc">;
type C = isSring<123>;

// built-in type
// type NonNullable<T> = T extends null | undefined ? never : T;
type Foo = NonNullable<number | string>;
type Foo2 = NonNullable<string | undefined>;
type Foo3 = NonNullable<undefined>;

//const fff: Foo3 = 2;

