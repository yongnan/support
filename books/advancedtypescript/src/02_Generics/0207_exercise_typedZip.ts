/* eslint-disable @typescript-eslint/no-explicit-any */

export {}

function zip<T1, T2>(array1: T1[], array2: T2[]): [T1, T2][] {
    const length = Math.min(array1.length, array2.length);
    const result: [T1, T2][] = [];
    for (let i = 0; i < length; i++) {
        result.push([array1[i], array2[i]]);
    }
    return result;
}

const arr1 = [2, 3, 4, 5, 6];
const arr2 = [7, 8, 9, 11];
const arr = zip(arr1, arr2);
console.log(arr)
