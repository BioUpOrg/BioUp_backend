
const express = require('express');


const app = express();
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./Presentation/middlwares/passport');


var usersRouter = require('./Presentation/routes/users');
var productsRouter = require('./Presentation/routes/products');
var googleRouter = require('./Presentation/routes/googleAuth');

// Set up database connection
const mongoose = require('mongoose');
require('dotenv').config({ path: `${__dirname}/.env` });

mongoose.connect(
  // `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}/?retryWrites=true&w=majority`,
  'mongodb+srv://BioUpDataBase:4CB4OrcVWrlP1LvW@bioup.gkbagbx.mongodb.net/?retryWrites=true&w=majority',
  console.log('connected to database !!!!'),
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);
app.use(cookieSession({
	name: 'google-auth-session',
	keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());
	


app.use(express.json());
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/google', googleRouter);


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});