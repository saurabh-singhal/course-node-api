var {ObjectID} = require('mongodb');
var mongoose = require('./db/mongoose.js');
var {Todo} = require('./models/Todo.js');
var user = require('./models/user.js');
var id='dd95e8aa4b49d6c1fe47cec5a';

if(!ObjectID.isValid(id)){
return  console.log('not a valid id');
}
/*
user.find().then((docs)=>{
  console.log(docs);
},(error)=>{
  console.log(error);
})
*/
Todo.find({_id:id}).then(function(docs){
  console.log(docs);
},function(error){
  consol.log('error',error);
});

Todo.findOne({
  _id:id
}).then(function(result){
  console.log(result);
},(err)=>{
  console.log(err);
});
