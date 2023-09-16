var fruits = ['Watermelon','Grapes'];
fruits[2] = {
    "Apple1": "Red Apple",
    "Apple2":"Green Apple"
};
console.log(fruits);

var fruits = ['Watermelon','Apple','Grapes'];
console.log('Array: ' + fruits.toString());
fruits.sort();
console.log('Sorted Array: ' + fruits.toString());
console.log('forEach:');
fruits.forEach(element => {
    console.log(element);
});
fruits.push('Strawberry');
console.log('Push: ' + fruits.toString());
fruits.pop();
console.log('Pop: ' + fruits.toString());
fruits.shift();
console.log('Shift: ' + fruits.toString());
fruits.unshift('Apple')
console.log('Unshift: ' + fruits.toString());
console.log('isArray? ' + Array.isArray(fruits));
var moreFruits = ['Strawberry'];
fruits = fruits.concat(moreFruits);
console.log('Concatenate: ' + fruits.toString());
fruits.splice(0,0,'Guava');
console.log('Splice: ' + fruits.toString());
var top3fruits = fruits.slice(0,3);
console.log('Slice: ' + top3fruits.toString());