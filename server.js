var express = require("express")
var path = require("path")
var bodyparser = require("body-parser")
var app = express()

//routes definition
var index = require('./routes/index')
var todos = require('./routes/todos')

//view definition
app.set('views',path.join(__dirname,'views'))
app.set('viewengine','ejs')

//to use the static frontend
app.use(express.static(path.join(__dirname,'client')))

//app to intercept the payload via bodyparser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

//app url request
app.use('/',index)
app.use('/api/',todos)

//app server
app.listen(3000,function(){
    console.log("server listening in port 3000")
})

