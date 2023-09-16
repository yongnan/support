export {}

interface Person {
    name: string;
    age: number;
}

const persons: Person[] = [
    { name: "John", age: 21},
    { name: "Alice", age: 25},
]


function reduce<TElement, TResult>(
    array: TElement[],
    reducer: (result: TResult, el: TElement) => TResult,
    initialResult: TResult
): TResult {
    let result = initialResult;
    for (const element of array) {
        result = reducer(result, element)
    }
    return result;
}

const total = reduce<number, number>([1,2,3,4,5], (sum,el) => sum+el, 0);
console.log(total);

const ageByName = reduce<Person, Record<string, number>>( 
    persons,
    (result, person) => ({
        ...result,
        [person.name]: person.age,
    }),
    {}
);
console.log(ageByName)    