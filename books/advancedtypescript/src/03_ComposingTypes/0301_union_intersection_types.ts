export {}
interface Foo {
    foo: string;
    xyz: string;
}

interface Bar {
    bar: string;
    xyz: string;
}

// simple 
const sayHello1 = (obj: Foo | Bar) => {
    /* ... */
}

// union
const sayHello2 = (obj: Foo | Bar) => {
    /* ... */
}

sayHello2({foo:"foo",xyz:"xyz"});
sayHello2({bar:"foo",xyz:"xyz"});

// intersection
const sayHello3 = (obj: Foo & Bar) => {
    /* ... */

}
sayHello3({foo:"foo", bar: "bar", xyz:"xyz"});
