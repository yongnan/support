try{
    var fruit = new Fruit();
}
catch(e){
    console.log('ERROR: ' + e.message);
}
console.log('rest of the code!');

try{
    throw new Error('Custom Developer Error!');
}
catch(e){
    console.log('ERROR: ' + e.message);
}