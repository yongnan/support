import morgan from 'morgan';
import path from 'path';
//import fs from 'fs';
import fs from 'fs-extra';
import fileStreamRotator from 'file-stream-rotator';
// Workaround for lack of __dirname in ES6 modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);
var accessLogDirectory = path.join(__dirname ,'../accessLog');

//ensure log directory exists for acccess log
fs.existsSync(accessLogDirectory) || fs.mkdirSync(accessLogDirectory)

//use custom token for date
export default morgan.token('date', function () {
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
