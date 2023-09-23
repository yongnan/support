function sum(...inputs) {
    var result = 0;
    for(let i of inputs){
        result += i;
    }
    return result;
}
ResultContainer.innerHTML = sum(5, 10, 5, 5);