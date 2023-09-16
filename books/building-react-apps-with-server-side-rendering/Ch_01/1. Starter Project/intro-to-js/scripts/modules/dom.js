var header = document.getElementsByTagName("h1");
var body = document.getElementById("ResultContainer");
var footer = document.getElementsByClassName("Footer");
console.log(header);
console.log(body);
console.log(footer);

header[0].textContent = "Header Text from JS";
header[0].setAttribute('isHeader','True');
header[0].style.border = '2px solid black';
console.log(header[0]);
