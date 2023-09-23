/* eslint-disable @typescript-eslint/no-unused-vars */
export {}

// NonNullable<T> 
// is a function that takes a type and returns the same type 
// with null and undefined removed from the domain.
type X1 = NonNullable<string | undefined>; // X1 = string

// Partial 
// takes a type and returns a type with the same properties as the source, 
// but each one optional.
type X2 = Partial<{ name: string; age: number }>; //X2 = { name: string; age: number }

// ReturnType 
// takes a function type and returns the return type of that function.
function square(x: number): number{
    return x*x;
}
type X3 = ReturnType<typeof square>;  // X3 = number