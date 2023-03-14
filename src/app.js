const express = require('express');

const app = express();

var usersRouter = require('./Presentation/routes/users');
var productsRouter = require('./Presentation/routes/products');
var fbRouter = require('./Presentation/routes/fb');
var googleRouter = require('./Presentation/routes/googleAuth');
var forgetPasswordMail = require('./Presentation/routes/forgetPasswordMail');

const cors = require('cors');
var cookieSession = require('cookie-session');
const  passport = require ("passport");
const { json } = require( "body-parser");

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));

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

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(
  'mongodb+srv://BioUpDataBase:4CB4OrcVWrlP1LvW@bioup.gkbagbx.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  },
  console.log('connected to database !!!!'),
);

app.use(express.json());
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/google', googleRouter);
app.use('/', googleRouter);
app.use('/forget', forgetPasswordMail)
app.use('/fb', fbRouter);


// Start the server
app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
