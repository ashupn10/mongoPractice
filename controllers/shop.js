const Product = require('../models/product');

exports.getProducts =async (req, res, next) => {
  try{
    const products=await Product.fetchAll()
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }catch(err){
    console.log(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try{
    console.log(req.params);
    const product=await Product.findById(req.params.productId);
    console.log('Newproduct',product);
    console.log('title',product.title);
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  }catch(err){
    console.log(err);
  }
};

exports.getIndex = async (req, res, next) => {
  try{
    const products=await Product.fetchAll()
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }catch(err){
    console.log(err);
  }
};

exports.getCart =async (req, res, next) => {
  const products=await req.user.getCart();
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    products: products
  });
};

exports.postCart = async (req, res, next) => {
  try{
    const prodId = req.body.productId;
    const product=await Product.findById(prodId);
    const result =await req.user.addToCart(product);
    res.redirect('/cart');
  }catch(err){
    console.log(err);
  }
};

exports.postCartDeleteProduct =async (req, res, next) => {
  try{
    const prodId = req.body.productId;
    await req.user.removeItemCart(prodId);
    res.redirect('/cart');
  }catch(err){
    console.log(err);
  }
};

// exports.postOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then(cart => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then(products => {
//       return req.user
//         .createOrder()
//         .then(order => {
//           return order.addProducts(
//             products.map(product => {
//               product.orderItem = { quantity: product.cartItem.quantity };
//               return product;
//             })
//           );
//         })
//         .catch(err => console.log(err));
//     })
//     .then(result => {
//       return fetchedCart.setProducts(null);
//     })
//     .then(result => {
//       res.redirect('/orders');
//     })
//     .catch(err => console.log(err));
// };

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders({include: ['products']})
//     .then(orders => {
//       res.render('shop/orders', {
//         path: '/orders',
//         pageTitle: 'Your Orders',
//         orders: orders
//       });
//     })
//     .catch(err => console.log(err));
// };
