var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose.js')
var {Todo} = require('./models/Todo.js');
var user = require('./models/user.js');

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

app.listen(3000,()=>{
  console.log('server started');
});
