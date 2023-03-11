const express = require('express');

const app = express();
const passport = require('passport');

var cookieSession = require('cookie-session');//
require('./Presentation/middlwares/passport');


var usersRouter = require('./Presentation/routes/users');
var productsRouter = require('./Presentation/routes/products');
var googleRouter = require('./Presentation/routes/googleAuth');
var fbRouter = require('./Presentation/routes/fb');
var forgetPasswordMail = require('./Presentation/routes/forgetPasswordMail');
var passport = require('passport');
var cookieSession = require('cookie-session');//

const { json } = require( "body-parser");


const mongoose = require('mongoose');
require('dotenv').config({ path: `${__dirname}/.env` });

mongoose.connect(
  'mongodb+srv://BioUpDataBase:4CB4OrcVWrlP1LvW@bioup.gkbagbx.mongodb.net/?retryWrites=true&w=majority',
  console.log('connected to database !!!!'),
{
    useNewUrlParser: true
  }
);
app.use(cookieSession({
	name: 'google-auth-session',
	keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.initialize());
app.use(json());
app.set("view engine","ejs")
const session = require('express-session')
const cookieParser = require('cookie-parser')



app.set("view engine","ejs")
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
    app.use(passport.session()); 
    app.use(cookieParser());

app.use(express.json());


app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/google', googleRouter);
app.use('/forget', forgetPasswordMail)
app.use('/fb', fbRouter);
app.use('/forget', forgetPasswordMail)


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});