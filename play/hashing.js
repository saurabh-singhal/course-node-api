var {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data={
  id:14104036
};

var token = jwt.sign(data,'saurabh');
console.log(token);

var decoded = jwt.verify(token,"saurabh1");
console.log(decoded);
/*
var message = 'hii i am saurabh';
var hash = SHA256(message).toString();

console.log(`message:`,message);
console.log('hash:',hash);
*/
