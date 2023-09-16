// for
for(let i=0;i<8;i++){
    if(i==1){
        continue;
    }
    console.log("i: " + i);
    if(i==4){
        break;
    }
}

// forEach
let fruits = ['Apple','Grapes','Watermelon'];
fruits.forEach((fruit, index) => {
    console.log(index + ': ' + fruit);
})

// while
let fruits = ['Apple', 'Grapes', 'Watermelon'];
let i = 0;
while (i < fruits.length) {
    console.log(i + ': ' + fruits[i]);
    i++;
}

// do...while
let fruits = ['Apple', 'Grapes', 'Watermelon'];
let i = 0;
do{
    console.log(i + ': ' + fruits[i]);
    i++;
}while (i < fruits.length);