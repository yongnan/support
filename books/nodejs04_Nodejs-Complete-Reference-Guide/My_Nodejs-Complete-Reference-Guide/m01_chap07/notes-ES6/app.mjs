import express from 'express';
import hbs from 'hbs';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import util from 'util';
import morgan from './utility/morganLogger';
import DBG from 'debug';
const debug = DBG('notes:debug');
const error = DBG('notes:error');
//import favicon from 'serve-favicon';
//import logger from 'morgan';
//import fs from 'fs-extra';

import {router as index} from './routes/index';
// const users = require('./routes/users');
import {router as notes} from './routes/notes';

// Workaround for lack of __dirname in ES6 modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();

// setup the logger
//app.use(morganLogger());
app.use(morgan (morgan.format, morgan.options));

// //app.use(logger('dev'));
// import rfs from 'rotating-file-stream';
// var logStream;
// // Log to a file if requested
// if (process.env.REQUEST_LOG_FILE) {
//   (async () => {
//     let logDirectory = path.dirname(process.env.REQUEST_LOG_FILE);
//     await fs.ensureDir(logDirectory);
//     logStream = rfs(process.env.REQUEST_LOG_FILE, {
//       size: '1M',     // rotate every 10 MegaBytes written
//       interval: '1d',  // rotate daily
//       compress: 'gzip' // compress rotated files
//     });
//     //app.use(logger(process.env.REQUEST_LOG_FORMAT || 'dev'));
//     app.use(logger(process.env.REQUEST_LOG_FORMAT || 'dev', {
//       stream: logStream ? logStream : process.stdout
//     }));
//   })().catch(err => {
//       console.error(err);
//   });
// }
// // Morgan documentation suggests this, but not rotate:
// // create a write stream (in append mode)
// //var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
// //app.use(logger('combined', {stream: accessLogStream}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'partials'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/users', users);
app.use('/notes', notes);

//app.use('/assets/vendor/bootstrap', express.static(
//    path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
//app.use('/assets/vendor/bootstrap', express.static(
//    path.join(__dirname, 'theme', 'bootstrap-4.1.0', 'dist')));
app.use('/assets/vendor/bootstrap/js', express.static(
    path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/assets/vendor/bootstrap/css', express.static(
    path.join(__dirname, 'minty')));

app.use('/assets/vendor/jquery', express.static(
    path.join(__dirname, 'node_modules', 'jquery')));
app.use('/assets/vendor/popper.js', express.static(
    path.join(__dirname, 'node_modules', 'popper.js', 'dist')));
app.use('/assets/vendor/feather-icons', express.static(
    path.join(__dirname, 'node_modules', 'feather-icons', 'dist')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Uncaught exceptions
process.on('uncaughtException', function(err) {
  error("I've crashed!!! - "+ (err.stack || err));
});
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    // utility.log(err.message);
    res.status(err.status || 500);
    error((err.status || 500) +' '+ error.message);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
app.use(function(err, req, res, next) {
  // utility.log(err.message);
  res.status(err.status || 500);
  error((err.status || 500) +' '+ error.message);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

process.on('unhandledRejection', (reason, p) => {
  error(`Unhandled Rejection at: ${util.inspect(p)} reason: ${reason}`);
});

//At the minimum, we can print an error message such as the following:
//    notes:error Unhandled Rejection at: Promise {
//    notes:error <rejected> TypeError: model(...).keylist is not a function
//} reason: TypeError: model(...).keylist is not a function +3s

export default app;
