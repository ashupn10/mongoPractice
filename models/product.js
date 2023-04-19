const getDb=require('../util/database').getDb;
const mongodb=require('mongodb');
class Product{
  constructor(title,price,description,imageUrl){
    this.title=title;
    this.price=price;
    this.description=description;
    this.imageUrl=imageUrl;
  }
  save(){
    try{
      const db=getDb();
      return db.collection('products').insertOne(this);
    }catch(err){
      console.log(err);
    }
  }
  static fetchAll(){
    try{
      const db=getDb();
      return db.collection('products').find().toArray();
    }catch(err){
      console.log(err);
    }
  }
  static async findById(id){
    try{
      const db=getDb();
      return await db.collection('products').findOne({_id:new mongodb.ObjectId(`${id}`)});
    }catch(err){
      console.log(err);
    }
  }
  static deleteProduct(id){
    try{
      const db=getDb();
      return db.collection('products').deleteOne({_id:new mongodb.ObjectId(id)});
    }catch(err){
      console.log(err);
    }
  }
  static updateProduct(id,title,price,description,imageUrl){
    try{
      const db=getDb();
      return db.collection('products').updateOne(
        {_id:new mongodb.ObjectId(`${id}`)},
        {$set:{          
          title:title,
          price:price,
          description:description,
          imageUrl:imageUrl
        }}
      )
    }catch(err){
      console.log(err);
    }
  }
}

module.exports = Product;
