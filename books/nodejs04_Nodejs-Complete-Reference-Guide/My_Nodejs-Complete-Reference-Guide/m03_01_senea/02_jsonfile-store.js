'use strict'

var seneca = require('seneca')({ log: "silent" })
var entities = require('seneca-entity')
seneca.use(entities)
seneca.use('jsonfile-store', {
    folder:'/Users/yongnan/Sync/sandbox/tech/nodejs/codes/bk04_Nodejs-Complete-Reference-Guide/m03_01_senea/data'
})
//.use(entities)

seneca.ready(function(err){
    var apple = seneca.make$('fruit')
    apple.name  = 'Pink Lady2'
    apple.price = 2.99
    apple.save$(function(err,apple){
        if( err ) return console.log(err);
        console.log( "apple = "+apple  )
    })
})

seneca.close(function(err){
    console.log('database closed!')
})
