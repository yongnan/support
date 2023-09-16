var express = require('express');
//var url = require('url');
var app = express();


// app.get('/hello', function(request, response){
//   var getParams = url.parse(request.url, true).query;
//
//   if (Object.keys(getParams).length == 0) {
//     response.end('Hello all');
//   } else {
//     response.end('Hello ' + getParams.name);
//   }
// });

app.get('/hello1:name', function(request, response){
  response.send('Hello1 ' + request.params.name);
});

app.listen(3000);