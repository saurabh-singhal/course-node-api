//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/nodeApp',function(error,db)
{
  if(error)
  {
    return console.log('unable to connect');
  }

//   db.collection('nodeApp').find({
//     _id:new ObjectID('595a889116fa3e2afc48d444')
//   }).toArray().then(function(docs)
//   {
//     console.log('users');
//     console.log(JSON.stringify(docs,undefined,2));
//   },function(err)
// {
// if(err)
// console.log('unable to fetch',err);
// });

db.collection('nodeApp').count().then(function(count)
{
  console.log('users count',count);
},function(err)
{
if(err)
console.log('unable to fetch',err);
});

});
