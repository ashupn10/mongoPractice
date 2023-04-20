const Product = require('../models/product');
const mongodb=require('mongodb');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = async (req, res, next) => {
  try{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product= new Product(title,price,description,imageUrl,req.user._id);
    const result = await product.save();
    console.log(result,'created Product');
    res.redirect('/admin/add-product');
  }catch(err){
    throw new Error(err);
  }
};

exports.getEditProduct =async (req, res, next) => {
  try{
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const prodId = req.params.productId;
    const product=await Product.findById(prodId);
    if(!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  }catch(err){
    console.log(err);
  }
};

exports.postEditProduct =async (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  await Product.updateProduct(prodId,updatedTitle,updatedPrice,updatedDesc,updatedImageUrl);
  res.redirect('/admin/products');
};

exports.getProducts =async (req, res, next) => {
  try{
    const products=await Product.fetchAll()
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }catch(err){
    console.log(err);
  }
};

exports.postDeleteProduct =async (req, res, next) => {
  try{
    const prodId = req.body.productId;
    await Product.deleteProduct(prodId);
    res.redirect('/admin/products');
  }catch(err){
    console.log(err);
  }
};
