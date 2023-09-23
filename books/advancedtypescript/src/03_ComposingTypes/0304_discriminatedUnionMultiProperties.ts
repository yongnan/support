export {}

type Foo = 
| { kind: "A", type: "X", abc: string }
| { kind: "A", type: "Y", xyz: string }
| { kind: "B", type: "Z", rty: string };

declare const foo: Foo;

if (foo.kind === "A" && foo.type === "X"){
    console.log(foo.abc);
}