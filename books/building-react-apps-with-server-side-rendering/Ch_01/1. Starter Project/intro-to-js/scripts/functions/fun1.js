function fun() {
    console.log('Regular JS Function.');
}

let functionExpr = function(){
    console.log('Function Expression.');
}

let arrFunction = () => {
    console.log('Arrow Function.');
}
fun();
functionExpr();
arrFunction();