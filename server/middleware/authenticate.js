const {user} = require('./../models/user.js');

var authenticate = (req,res,next) =>{
  var token = req.header('x-auth');

  user.findByToken(token).then(function(user){
    if(!user){
      return Promise.reject();
    }
    console.log(user);
    req.user = user;
    req.token= token;
    next();
  }).catch((e)=>{
    res.status(401).send();
  });
};

module.exports = {authenticate};
