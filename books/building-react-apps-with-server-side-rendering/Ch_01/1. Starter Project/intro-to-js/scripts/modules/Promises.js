let promise = new Promise(function(resolve, reject){
    setTimeout(resolve,100,'Resolved');
    //setTimeout(reject,100,'Rejected');
});
promise.then(
    value => console.log('Success: ' + value),
    error => console.log('Error: ' + error)
);

let promise2 = $.get("https://api.github.com/users/msthakkar100");
promise2.then(
    data => console.log(data),
    error => console.log(error)
);