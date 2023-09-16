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
import favicon from 'serve-favicon';
//import logger from 'morgan';
import fs from 'fs-extra';
import http from 'http';
import url from 'url';

// import {router as index} from './routes/index';
// import {router as users, initPassport} from './routes/users';
// import {router as notes} from './routes/notes';

import { socketio as indexSocketio, router as index } from './routes/index';
import { router as users, initPassport } from './routes/users';
import { socketio as notesSocketio, router as notes } from './routes/notes';

import passportSocketIo from 'passport.socketio';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
const FileStore = sessionFileStore(session);
export const sessionCookieName = 'notescookie.sid';
const sessionSecret = 'keyboard mouse';
const sessionStore = new FileStore({ path: "sessions" });

// Workaround for lack of __dirname in ES6 modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();
export default app;

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
import socketio from 'socket.io';
const io = socketio(server);
io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,
  key: sessionCookieName,
  secret: sessionSecret,
  store: sessionStore
}));

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Integrate Passport authentication into Socket.IO
app.use(session({
  store: sessionStore,
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true,
  name: sessionCookieName
}));
initPassport(app);

indexSocketio(io);
notesSocketio(io);

// setup the logger
app.use(morgan (morgan.format, morgan.options));

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

app.use('/', index);
app.use('/users', users);
app.use('/notes', notes);

// io.on('connection', function(socket){
//   debug('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

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

process.on('unhandledRejection', (reason, p) => {
  error(`Unhandled Rejection at: ${util.inspect(p)} reason: ${reason}`);
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

// error handler
app.use(function(err, req, res, next) {
  error(`APP ERROR HANDLER ${err.stack}`);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) { // named pipe
    return val;
  }
  if (port >= 0) { // port number
    return port;
  }
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') { throw error; }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' +
      port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}