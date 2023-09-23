import { of, map, last } from 'rxjs';

const source = of(1, 2, 3, 4, 5).pipe(
    map((x) => x * 2),
    //last  // Error!
    last()
)

console.log(source)