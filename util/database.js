const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let db;
const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://ashupn10:AsRv1P3Xz0JH6r97@sandbox.wa2fc.mongodb.net/shop?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log('Connected!');
      db=client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};
const getDb=()=>{
  if(db){
    return db;
  }else{
    throw new Error("There is not database");
  }
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;