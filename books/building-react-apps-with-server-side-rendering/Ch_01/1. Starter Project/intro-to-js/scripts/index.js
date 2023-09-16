var ResultContainer = document.getElementById("ResultContainer");

let promise2 = $.get("https://api.github.com/users/msthakkar100");
promise2.then(
    data => console.log(data),
    error => console.log(error)
);