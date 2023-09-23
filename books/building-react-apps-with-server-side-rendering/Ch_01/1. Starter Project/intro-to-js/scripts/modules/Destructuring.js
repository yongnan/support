/* Destructuring and Spread */
let fruits = ['Apple', 'Watermelon', 'Grapes'];
let [fruit1, fruit2, fruit3] = fruits;
ResultContainer.innerHTML = fruit2;  // Watermelon

// skip element
let [fruit1, , fruit2] = fruits;
ResultContainer.innerHTML = fruit2;  // Grapes

// let [fruit1, ...OtherFruits] = fruits;
ResultContainer.innerHTML = OtherFruits;  // Watermelon, Grapes

// Objects can be destructured
let Fruits = {Fruit1: 'Apple', Fruit2: 'Watermelon'};
let {Fruit1, Fruit2} = Fruits;
ResultContainer.innerHTML = Fruit1;  // Apple

// destructuring in functions
function sum(a, b, c){
    return a+b+c;
}
let input = [5,9,6];
ResultContainer.innerHTML = sum(...input);  //20
