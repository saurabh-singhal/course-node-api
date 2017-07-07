const express = require('express');
const bodyParser = require('body-parser');

var mongoose = require('./db/mongoose.js');
var {Todo} = require('./models/Todo.js');

var app = express();
app.use(bodyParser.json());

app.post('/Todo',function(req,res){

console.log(req.body.text);
var t = new Todo({
  text:req.body.text
});

t.save().then(function(docs){
  res.send(docs);
},function(error){
  console.log('unable to write:',error);
});

});

app.get('/Todo',function(req,res){
Todo.find().then(function(docs){
res.send(docs);
},function(err){
  console.log('error',err);
});
});

app.listen(3000,()=>
{
  console.log('started server');
});
