const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//var uri = 'mongodb://<saurabh>:<123456>@ds151222.mlab.com:51222/node-api-course';
mongoose.connect('mongodb://localhost:27017/nodeApp',{
  useMongoClient:true
});

module.exports.mongoose;
