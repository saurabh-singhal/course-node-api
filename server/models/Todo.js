var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
  text:{
    type:String
  },
  compelte:
  {
    type:Boolean,
    default:true
  }
});

module.exports={Todo};
