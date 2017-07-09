const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var userSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    minlength:3,
    trim:true,
    unique:true,
    validate:{
      validator:function(value){
        return validator.isEmail(value);
      },
      message:`{value} is not a valid email`
    }
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});

userSchema.methods.toJSON = function(){
  var user = this;
  var object = user.toObject();

  return _.pick(object,['_id','email']);
};

userSchema.methods.generateAuthToken = function()
{
  var user = this;
  var token = jwt.sign({_id:user._id.toHexString(),access},"saurabh").toString();
  var access = 'auth';
  user.tokens.push({access,token});

  return user.save().then(()=>{
    return token;
  });
};

userSchema.statics.findByToken = function(token){
  var user = this;
  var d;

  try{
    d = jwt.verify(token,'saurabh');
  }catch(e){
    return Promise.reject();
  }

  return user.findOne({
    '_id' : d._id,
    'tokens.token': token,
    'tokens.access':'auth'
  });
};

var user = mongoose.model('user',userSchema);

module.exports = {user};
