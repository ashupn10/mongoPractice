const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let db;
const mongoConnect = callback => {
  MongoClient.connect(process.env.MONGO_SECRET_KEY)
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