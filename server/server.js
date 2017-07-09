var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const _  = require('lodash');
var mongoose = require('./db/mongoose.js')
var {Todo} = require('./models/Todo.js');
var {user} = require('./models/user.js');
var {authenticate} = require('./middleware/authenticate.js');
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

app.delete('/Todo/:id',function(req,res){
  var i = req.params.id;
  Todo.findById({_id:i}).then(function(docs){
    console.log('docs',docs);                           // can be done by findByIdAndRemove
    Todo.findOneAndRemove({_id:i}).then(function(result){
      console.log(result);
    },function(err){
      console.log(err);
    });
  },function(error){
    console.log(error);
  });
})

app.patch('/Todo/:id',function(req,res){
var id = req.params.id;
  var body = _.pick(req.body,'text');
/*  if(req.params.name){
    body.text = req.params.name;
  }*/

Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then(function(docs){
  console.log(docs);
},function(error){
  console.log(error);
});

});

app.post('/users',function(req,res){
  var body = _.pick(req.body,['email','password']);

  var abc = new user(body);

  abc.save().then(function(){
    return abc.generateAuthToken();
    //res.send(docs);
    console.log(docs);
  },function(e){
    res.status(400).send(e);
    console.log(e);
  }).then(function(token){
    res.header('x-auth',token).send(abc);
  },function(error){
    console.log(error);
  }).catch((ee)=>{
    res.status(400).send(e);
  })

});



app.get('/users/me',authenticate,function(req,res){
res.send(req.user);
});

app.listen(port,()=>{
  console.log(`server started on port: ${port}`);
});
