var mongoose = require('./db/mongoose.js');
var {Todo} = require('./models/Todo.js');

Todo.findOneAndRemove({_id:'595bf07691500a1a70e2025f'}).then(function(docs){
  console.log(docs);
},function(error){
  console.log(error);
})

Todo.remove({compelte:true}).then(function(docs){
console.log(docs);
},function(error){
  console.log(error);
})
