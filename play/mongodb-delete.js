const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/nodeApp',function(error,db){
  if(error)
  {
    return console.log('unable to connect');
  }

  // db.collection('nodeApp').deleteMany({text:'saurabh'}).then(function(result){
  //   console.log(result);
  // });

  db.collection('nodeApp').findOneAndDelete({connection:true}).then(function(result){
    console.log(result);
  });
});
