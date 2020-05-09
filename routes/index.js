var express = require('express')
var router = express.Router()
//var mongojs = require('mongojs')


//define methods of request
router.get('/',function(req,res,next){
    res.send('index')
})

module.exports = router