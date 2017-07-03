const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/nodeApp',function(error,db){
  if(error)
  {
    return console.log('unable to connect');
  }
  console.log('connected successfully');
  //
  // db.collection('nodeApp').insertOne({
  //   text:'bhai bhai',
  //   connection:true
  // },function(error,result){
  //   if(error)
  //   {
  //     return console.log('unable to connect');
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,2));
  // });

  db.collection('users').insertOne({
    name:'saurabh',
    location:'india',
    age:25
  },function(err,result){
    if(err)
    return console.log('unable to insert');

    console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
  });

  db.close();
});
