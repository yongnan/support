var morgan = require('morgan');
const path = require('path');
var fs = require('fs');
var fileStreamRotator = require('file-stream-rotator');
//var accessLogDirectory = __dirname + '/accessLog';
var accessLogDirectory = path.join(__dirname ,'../accessLog');

//ensure log directory exists for acccess log
fs.existsSync(accessLogDirectory) || fs.mkdirSync(accessLogDirectory)

//use custom token for date
morgan.token('date', function () {
    return new Date();
});

//create a rotating write stream
var accessLogStream = fileStreamRotator.getStream({
    filename: accessLogDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false,
    date_format: 'YYYYMMDD'
});

morgan.stream = accessLogStream;
//morgan.format = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]';
morgan.format = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]';
morgan.options = {
    stream: accessLogStream
};
module.exports = morgan;