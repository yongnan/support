let request = new XMLHttpRequest();
request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
        console.log(request.response);
    }
}
request.open('GET', 'https://api.github.com/users/msthakkar121');
request.send();
