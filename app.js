const path = require('path');
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const User=require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  // const user=await User.findUserById('643faad406f8c96d35daf0c4');
  // req.user=new User(user.name,user.email,user.cart,user._id);
  // console.log(user);
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
mongoose.connect(process.env.MONGO_SECRET_KEY).then(result=>{
  console.log('connected');
  app.listen(3000);
}).catch(err=>{
  console.log(err);
})
// mongoConnect(client => {
//   app.listen(3000);
// });
