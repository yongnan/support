//Type '5' is not assignable to type'string'. 
//const foo: string = 5;

export interface Foo {
    a: { 
        b: { 
            c: {
                d: number;
            };
        };
    };
}

function wooot(foo: Foo) {}

const foo = {
    a: { 
        b: { 
            c: {
                d: "abc",
            },
        },
    },
};

// Error!
wooot(foo);