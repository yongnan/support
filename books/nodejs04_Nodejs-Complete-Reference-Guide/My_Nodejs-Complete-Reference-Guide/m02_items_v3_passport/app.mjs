import express from 'express'
import path from 'path'
//import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import {router as routes} from './routes/index.mjs'
import {router as catagories} from './routes/catalog.mjs'
import {router as users, initPassport } from './routes/users.mjs';

import session from 'express-session';
import sessionFileStore from 'session-file-store';
const FileStore = sessionFileStore(session);
export const sessionCookieName = 'catalogcookie.sid'

import cors from 'cors'
import expressPaginate from 'express-paginate'
import passport from "passport";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
import https from 'https'
import fs from 'fs'
var app = express()
app.set('port', process.env.PORT || 3443)
var options = {key : fs.readFileSync('./ssl/catalog.pem'),
  cert : fs.readFileSync('./ssl/catalog.crt')
};
https.createServer(options, app).listen(app.get('port'));

// enable CORS
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// })
app.use(cors())

// AA
//app.use(express.session())
// app.use(session({
//   store: new FileStore({ path: "sessions" }),
//   secret: 'keyboard mouse',
//   resave: false,
//   saveUninitialized: false,
//   name: sessionCookieName
// }))
app.use(session({secret: 'keyboard mouse'}))
initPassport(app)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
//app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', routes)
app.use('/catalog', catagories)
app.use('/users', users)

//app.use(expressPaginate.middleware(limit, maxLimit)
app.use(expressPaginate.middleware(2,100))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

//module.exports = app
export default app
