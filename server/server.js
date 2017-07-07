var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var mongoose = require('./db/mongoose.js')
var {Todo} = require('./models/Todo.js');
var user = require('./models/user.js');

const port = process.env.PORT||3000;

var app = express();
app.use(bodyParser.json());

app.post('/Todo',function(req,res){

  var todo = new Todo({
    text:req.body.text
  });

  todo.save().then(function(docs){
    res.send(docs);
  },function(error){
    res.send(error);
  });
});


app.get('/Todo',function(req,res){
Todo.find().then(function(docs){
res.send(docs);
},function(err){
  console.log('error',err);
});
});


app.get('/Todo/:id',function(req,res){

  if(!ObjectID.isValid(req.params.id))
  return res.status(404).send();

  Todo.findById({_id:req.params.id}).then(function(docs){
    if(!docs)
    return res.status(404).send();
    res.send(docs);
    console.log(docs);
  },function(error){
    res.status(404).send();
    console.log('error',error);
  }).catch((e)=>{
    res.status(400).send();
  })

});

app.listen(port,()=>{
  console.log(`server started on port: ${port}`);
});
