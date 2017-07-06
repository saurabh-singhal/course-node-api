const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017/nodeApp',function(err,db){
  if(err)
  return console.log('unable to connect');

  db.collection('nodeApp').findOneAndUpdate({
    _id :new ObjectID('595a888668ff9a27e8b15b90')
  },{
    $set:{connection:true},
    $inc:{number:50}
  }
    ,{
    returnOriginal:false
  }).then(function(result)
{
  console.log(result);
})
});
