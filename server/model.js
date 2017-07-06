const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/nodeApp',{
  useMongoClient:true
});

var user = mongoose.model('user',{
  email:{
    type:String,
    required:true,
    minlength:3,
    trim:true
  },
  password:{
    type:String,
    required:true,
  }
});

var user = new user({
  email:'        saurabh.singhal  ',
  password:'wfhwhfo'
});

user.save().then(function(docs){
  console.log(docs);
},function(err)
{
  console.log('error:',err);
});
