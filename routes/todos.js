var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var db = mongojs('mongodb://<dbuser>:<dbpassword>@ds139037.mlab.com:39037/meandb',['items'])

//define methods of request
//get all data
router.get('/todos',function(req,res,next){
    db.items.find(function(err,items){
        if(err){
            res.send(err)
        }else{
            res.json(items)
        }

    })
})
//get single data
router.get('/todos/:id',function(req,res,next){
    db.items.findOne({
       _id:mongojs.ObjectID(req.params.id)
    },function(err,item){
        if(err){
            res.send(err)
        }else{
            res.json(item)
        }

    })
})

//save the todo item
router.post('/todos',function(req,res,next){
    var todo = req.body
    if(!todo.text || (!todo.isCompleted + "")){
        res.status(400)
        res.json({
            "error":"invalid data"
        })} else {
            db.save(todo,function(err,result){
                if(err){
                    res.send(err)
                }else{
                    res.json(result)
                }
            })
        }
})

//update a todo
router.put('/todo/:id',function(req,res,next){
    var todo = req.body
    var objUpd = {}

    if(todo.isCompleted){
        objUpd.isCompleted = todo.isCompleted
    }
   
    if(todo.text){
        objUpd.text = todo.text
    }

    if(!objUpd){
        res.status(400)
        res.json({
            "error":"invalid data"
        })
    }else{
        db.todo.update({
            _id:mongojs.ObjectID(req.params.id)
        },objUpd,{},function(err,result){
            if(err){
                res.send(err)
            }else{
                res.json(result)
            }
        })
    }
})

//to Delete the todo item
router.delete('/todo/:id',function(req,res,next){
    db.todo.remove({
        _id:mongojs.ObjectID(req.params.id)
    },'',function(err,result){
        if(err){
            res.send(err)
        }else{
            res.json(result)
        }
    })
})

module.exports = router