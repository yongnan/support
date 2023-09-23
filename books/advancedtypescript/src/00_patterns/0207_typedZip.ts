/* eslint-disable @typescript-eslint/no-explicit-any */

export {}

// function zip(array1: any[], array2: any[]){
//     const length = Math.min(array1.length, array2.length);
//     const result = [];
//     for (let i = 0; i < length; i++) {
//         result.push([array1[i], array2[i]]);
//     }
//     return result;
// }

// const arr1 = [2, 3, 4, 5, 6];
// const arr2 = [7, 8, 9];
// const arr = zip(arr1, arr2);

// console.log(arr)


function zip<TElement>(array1: TElement[], array2: TElement[]): TElement[][] {
    const length = Math.min(array1.length, array2.length);
    const result: TElement[][] = [];
    for (let i = 0; i < length; i++) {
        result.push([array1[i], array2[i]]);
    }
    return result;
}

const arr1: number[] = [2, 3, 4, 5, 6];
const arr2: number[] = [7, 8, 9];
const arr = zip<number>(arr1, arr2);
console.log(arr)
