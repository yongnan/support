# Type-Level-Typescript

# 2. Types are just data

## [Five categories of types](https://type-level-typescript.com/types-are-just-data#five-categories-of-types)

TypeScript provides us with 5 main categories of types: **primitive** types, **literal** types, **data structure** types, **union** types, and **intersection** types.

### [Primitive types](https://type-level-typescript.com/types-are-just-data#primitive-types)

```ts
type Primitives =
  | number
  | string
  | boolean
  | symbol
  | bigint
  | undefined
  | null;
```

### [Literal types](https://type-level-typescript.com/types-are-just-data#literal-types)

Literal types are "exact" types, which encompass a **single possible value**.

```ts
type Literals =
  | 20
  | "Hello"
  | true
  | 10000n
  /* | ... */;
```

### [Data structures](https://type-level-typescript.com/types-are-just-data#data-structures)

In our type-level world, we have four built-in data structures at our disposal: **objects**, **records**, **tuples** and **arrays**.

```ts
type DataStructures =
  | { key1: boolean; key2: number } // objects
  | { [key: string]: number } // records
  | [boolean, number] // tuples
  | number[]; // arrays
```

- **Object types** describe objects with a finite set of keys, and these keys contain values of potentially different types.
- **Record types** are similar to object types, except they describe objects with an unknown number of keys, and all values in a record share the same type. For example, in `{ [key: string]: number }`, all values are numbers.
- **Tuple types** describe arrays with a fixed length. They can have a different type for each index.
- **Array types** describe arrays with an unknown length. Just like with records, all values share the same type.

### [Unions and Intersections](https://type-level-typescript.com/types-are-just-data#unions-and-intersections)

```ts
type Union = X | Y;

type Intersection = X & Y;
```

## [Types are Sets](https://type-level-typescript.com/types-are-just-data#types-are-sets)

### [Unions join sets together](https://type-level-typescript.com/types-are-just-data#unions-join-sets-together)

If you know a bit of Set Theory, you know that the union of two sets is the set containing those 2 sets, so `A | B` is the type containing all values of type `A` and all values of type `B`:

![The union of two sets.](https://type-level-typescript.com/_next/static/media/unions.ac78d1bf.svg)

We can join **any** 2 sets together, including other union types! For example, we can join `CanCross` and `ShouldStop` from the previous example into a `TrafficLight` union type:

![The union of CanCross and ShouldStop.](https://type-level-typescript.com/_next/static/media/union-traffic-light-dark.a9fe56f6.svg)

```ts
// this is equivalent to "green" | "orange" | "red"
type TrafficLight = CanCross | ShouldStop;

let canCross: CanCross = "green";
let shouldStop: ShouldStop = "red";

let trafficLight: TrafficLight;
trafficLight = shouldStop; // ✅
trafficLight = canCross; // ✅
```

![The string set contains the literal types 'Hi' and 'Hello'.](https://type-level-typescript.com/_next/static/media/string-sets.6b35387c.svg)

### [`unknown` — the top of the subtyping hierarchy](https://type-level-typescript.com/types-are-just-data#unknown--the-top-of-the-subtyping-hierarchy)

`unknown` contains each and every type you will ever use in TypeScript.

![the unknown type contains every other types](https://type-level-typescript.com/_next/static/media/unknown-set.8abdc1f0.svg)

You can assign anything to a variable of type `unknown`:

```ts
let something: unknown;

something = "Hello";            // ✅
something = 2;                  // ✅
something = { name: "Alice" };  // ✅
something = () => "?";          // ✅
```

The union of any type `A` with `unknown` will always evaluate to `unknown`. That makes sense because, by definition, `A` is already contained in `unknown`:

```js
A | unknown = unknown
```

![Any type A is contained in unknown.](https://type-level-typescript.com/_next/static/media/unknown-contains-A.e3d5fb57.svg)

But what about intersections?

The intersection of any type `A` with `unknown` is the type `A`:

```js
A & unknown = A
```

That's because intersecting a set `A` with a set `B` means **extracting** the part of `A` that also belongs to `B`! Since any type `A` is inside `unknown`, `A & unknown` is just `A`.

![Intersecting with unknown is a no-op.](https://type-level-typescript.com/_next/static/media/unknown-A-intersection-dark.1585c043.svg)


### [Intersections](https://type-level-typescript.com/types-are-just-data#intersections)

Intersections are just the opposite of unions: `A & B` is the type of all values that simultaneously **belong to `A` and to `B`**:

![intersection of sets](https://type-level-typescript.com/_next/static/media/intersections.05ebe520.svg)

Intersections are particularly convenient with object types because the intersection of 2 objects `A` and `B` is the set of objects that have **all properties of `A` and all properties of `B`**:

![intersection of objects](https://type-level-typescript.com/_next/static/media/intersection-objects.f3b4f38c.svg)

That's why we sometimes use intersections to merge object types together [2](https://type-level-typescript.com/types-are-just-data#user-content-fn-2):

```ts
type WithName = { name: string };
type WithAge = { age: number };

function someFunction(input: WithName & WithAge) {
  // `input` is both a `WithName` and a `WithAge`!
  input.name; // ✅ property `name` has type `string`
  input.age; // ✅ property `age` has type `number`
}
```

But what happens if we try to **intersect** two types that **do not overlap** at all? What does it even mean to intersect `string` and `number` for instance?

![Diagram representing the string type and number type.](https://type-level-typescript.com/_next/static/media/string-number-intersection-dark.4261e32e.svg)

### [`never` — the empty set](https://type-level-typescript.com/types-are-just-data#never--the-empty-set)

The type `never` doesn't contain any value, so we can use it to represent values that should *never* exist at runtime. For instance, a function that always throws will return a value of type `never`:

```ts
function panic(): never {
  throw new Error("🙀");
}

const oops: never = panic(); // ✅
```

```js
A | never = A
```

If you **intersect** a type `A` with `never` however, you will always get back `never`:

```js
A & never = never
```

### [What about `any`?](https://type-level-typescript.com/types-are-just-data#what-about-any)

You may have noticed that I have been omitting `any` from all the examples I've given so far. Why?

Everyone knows that using `any` is considered a **bad practice** in TypeScript. It's used as an **escape hatch** to bypass type-checking. We sometimes use it anyway, maybe because we don't know how to properly type a piece of code, or because we don't have the time necessary to find the right way to fix a type error. But where does `any` fit in our subtyping mental model, and why does it bypass type-checking anyway?

To be honest, `any` doesn't fit well in our mental model because it doesn't respect the laws of Set Theory. `any` is both the supertype **and** the subtype of **every other TypeScript type**. `any` is *all over the place*:

![the any type in the subtyping hierarchy](https://type-level-typescript.com/_next/static/media/any-set.5949397f.svg)

```js
A | any = any
A & any = any
```

### [Summary](https://type-level-typescript.com/types-are-just-data#summary)

What a chapter! We have already covered some of the most important concepts needed to become a TypeScript expert. Let me summarize what we've learned so far:

1. In our type-level programs, **types** are just data.
2. There are 5 main categories of types: **primitives**, **literals**, **data structures**, **unions**, and **intersections**.
3. **Types are sets**. Once you wrap your head around this concept, everything starts to make sense!
4. Union types are **data structures** that join sets together.
5. `unknown` is the **final superset** — it contains every other type.
6. `never` is the **empty set** — it is contained in every other type.
7. `any` is weird because it's the subset **and** the superset of every type.

## Objects and Records

 ### Reading several properties at once

```ts
  type NameOrAge = User["name" | "age"]; // => string | number
  type NameOrAge2 = User["name"] | User["age"]; // => string | number
  type Keys = keyof User; // "name" | "age" | "isAdmin"
  type UserValues = User[keyof User]; //  string | number | boolean
```

 ### The keyof keyword

```ts
  //type ValueOf<Obj> = Obj[keyof Obj];
  type UserValues2 = ValueOf<User>; //  string | number | boolean
```
### Optional properties

```ts
  type BlogPost = { title: string; tags?: string[] };
  //                                   ^ this property is optional!

  //type BlogPost = { title: string; tags: string[] | undefined };
  // ✅ No `tags` property

  const blogBost1: BlogPost = { title: "introduction" };
  // ✅ `tags` contains a list of strings
  const blogBost2: BlogPost = {
			title: "part 1",
			tags: ["#easy", "#beginner-friendly"],
  };
```
### Merging object types with intersections (&)

```ts
  ///intersection of two objects contains the union of their key
  type WithName = { name: string };
  type WithAge = { age: number };
  type WithRole = { isAdmin: boolean };
 
  type User = WithName & WithAge & WithRole;
  type Organization = WithName & WithAge; // organizations don't have a isAdmin
```
### Intersections of objects and unions of keys

```ts
  type A = { a: string };
  type KeyOfA = keyof A; // => 'a'
  type B = { b: number };
  type KeyOfB = keyof B; // => 'b'
  
  type C = A & B;
  type KeyOfC = keyof C; // => 'a' | 'b'
```
### Union of two objects contains the intersection of their keys:

```ts
  type A = { a: string; c: boolean };
  type KeyOfA = keyof A; // => 'a' | 'c'
  type B = { b: number; c: boolean };
  type KeyOfB = keyof B; // => 'b' | 'c'
  
  type C = A | B;
  type KeyOfC = keyof C; // => ('a' | 'c') & ('b' | 'c') <=> 'c'
```

General rule:

```ts
keyof (A & B) = (keyof A) | (keyof B)
keyof (A | B) = (keyof A) & (keyof B)
```

### Records

```ts
type Record<K, V> = { [Key in K]: V };
```

### [Partial](https://type-level-typescript.com/objects-and-records#partial)

The `Partial` generic takes an object type and returns another one that's identical except that all of its properties are optional:

```ts
type Props = { value: string; focused: boolean; edited: boolean };

type PartialProps = Partial<Props>;
// is equivalent to:
type PartialProps = { value?: string; focused?: boolean; edited?: boolean };
```

### [Required](https://type-level-typescript.com/objects-and-records#required)

The `Required` generic does the opposite of `Partial`. It takes an object and returns another one that's identical except that all of its properties are required:

```ts
type Props = { value?: string; focused?: boolean; edited?: boolean };

type RequiredProps = Required<Props>;
// is equivalent to:
type RequiredProps = { value: string; focused: boolean; edited: boolean };
```

### [Pick](https://type-level-typescript.com/objects-and-records#pick)

The `Pick` generic removes all keys that **aren't assignable** to the type of key given as second argument:

```ts
type Props = { value: string; focused: boolean; edited: boolean };

type ValueProps = Pick<Props, "value">;
// is equivalent to:
type ValueProps = { value: string };

type SomeProps = Pick<Props, "value" | "focused">;
// is equivalent to:
type SomeProps = { value: string; focused: boolean };
```

### [Omit](https://type-level-typescript.com/objects-and-records#omit)

The `Omit` generic removes all object properties that **are assignable** to the type given as second argument. It does the opposite of `Pick`!

```ts
type Props = { value: string; focused: boolean; edited: boolean };

type ValueProps = Omit<Props, "value">;
// is equivalent to:
type ValueProps = { edited: boolean; focused: boolean };

type OtherProps = Omit<Props, "value" | "focused">;
// is equivalent to:
type OtherProps = { edited: boolean };
```

### [Summary](https://type-level-typescript.com/objects-and-records#summary)

Here are some notions we covered:

- Object types and Records both represent **sets of JavaScript objects**.
- Object types are sets of objects containing **at least** all properties defined on this type, but they can also contain more properties.
- Record types are sets of objects that share **the same type** for all properties.
- Intersections let us "merge" objects together in types containing all of their properties.
- TypeScript provides several built-in functions like `Partial`, `Required`, `Pick` and `Omit` to transform object types.

## Arrays & Tuples

### Tuples

Tuples are essentially **lists of types**! 

```ts
type Empty = [];
type One = [1];
type Two = [1, "2"]; // types can be different!
type Three = [1, "2", 1]; // tuples can contain duplicates
```

####Reading indices of a tuple

```ts
type SomeTuple = ["Bob", 28];
type Name = SomeTuple[0]; // "Bob"
type Age = SomeTuple[1]; // 28 
```
####Reading several indices

```ts
type User = { name: string; age: number; isAdmin: true };
type NameOrAge = User["name" | "age"]; // => string | number 
type SomeTuple2 = ["Bob", 28, true];
type NameOrAge2 = SomeTuple2[0 | 1]; // => "Bob" | 28
```
####Can we use keyof?

```ts
type Keys = keyof ["Bob", 28]; // "0" | "1" | "map" | "filter" | ...
const key: Keys = "map"; // ✅ 😬
```
####Concatenating tuples

```ts
type Tuple1 = [4, 5];
type Tuple2 = [1, 2, 3, ...Tuple1];
// => [1, 2, 3, 4, 5]
type TupleA1 = [1, 2, 3];
type TupleA2 = [4, 5];
type Tuple3 = [...TupleA1, ...TupleA2];
// => [1, 2, 3, 4, 5]
```
#### Named Indices
```ts
type User2 = [firstName: string, lastName: string]; 
```
####Optional indices

```ts
type OptTuple = [string, number?];
//                             ^ optional index!
const tuple1: OptTuple = ["Bob", 28]; // ✅
const tuple2: OptTuple = ["Bob"]; // ✅
const tuple3: OptTuple = ["Bob", undefined]; // ✅
//    ^ we can also explicitly set it to `undefined` 
```

### Array

