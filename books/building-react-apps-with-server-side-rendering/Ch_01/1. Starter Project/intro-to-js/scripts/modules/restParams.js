/* Rest parameter */
function sum(...inputs) {
    var result = 0;
    for(let i of inputs){
        result += i;
    }
    return result;
}

function sum(input1, input2, ...remainingInputs) {
    var result = input1 + input2;
    for(let i of remainingInputs){
        result += i;
    }
    return result;
}
ResultContainer.innerHTML = sum(5, 10, 5, 5);
