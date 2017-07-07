const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/nodeApp',{
  useMongoClient:true
});

var Todo = mongoose.model('Todo',{
  text:{
    type:String,
    trim:true
  },
  complete:{
    type:Boolean,
    default:false
  }
});

var app = express();
app.use(bodyParser.json());

app.get('/Todo/:id',function(req,res){

  if(!ObjectID.isValid(req.params.id)){
  return res.status(404).send();
  }
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


app.listen(3000,()=>{
  console.log('server started');
})
