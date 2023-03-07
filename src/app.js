// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var http = require('http');

// var indexRouter = require('./Presentation/routes/index');
// var usersRouter = require('./Presentation/routes/users');

// var app = express();

// //import database ;
// require("./Infrastructure/Database/mongodb");

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   res.status(err.status || 500);
// });

// // Get port from environment and store in Express.
// var port = normalizePort(process.env.PORT || '5000');
// app.set('port', port);

// /**
//  * Create HTTP server.
//  */

// var server = http.createServer(app);

// /**
//  * Normalize a port into a number, string, or false.
//  */

// function normalizePort(val) {
//   var port = parseInt(val, 10);

//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }

//   if (port >= 0) {
//     // port number
//     return port;
//   }

//   return false;
// }

// /**
//  * Event listener for HTTP server "error" event.
//  */

// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }

//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port;

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// /**
//  * Event listener for HTTP server "listening" event.
//  */

// // function onListening() {
// //   var addr = server.address();
// //   var bind = typeof addr === 'string'
// //     ? 'pipe ' + addr
// //     : 'port ' + addr.port;
// //   debug('Listening on ' + bind);
// // }

// // Listen on provided port, on all network interfaces.
// server.listen(port);
// // server.on('error', onError);
// // server.on('listening', onListening);

// module.exports = app;




// last update 
const express = require('express');
// const connect = require('./Infrastructure/Database/mongodb');
// const makeCreateUser = require('./Application/UseCases/user/createUser');
// const UserRepository = require('./Domain/IRepositories/UserRepository');
// const makeUserController = require('./Presentation/Controllers/userController');
// const makeUserRoutes = require('./Presentation/Routes/userRoutes');
// const UserModel = require('./Infrastructure/Models/UserModel');

const app = express();
var usersRouter = require('./Presentation/routes/users');
var productsRouter = require('./Presentation/routes/products');

// Set up database connection
const mongoose = require('mongoose');
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

// Set up dependencies
// const userRepository = new UserRepository({ userModel: UserModel });
// const createUser = makeCreateUser({ userRepository });
// const userController = makeUserController({ createUser });
// const userRoutes = makeUserRoutes({ userController });

// Add middleware and routes to the app
app.use(express.json());
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/google', googleRouter);
app.use('/', googleRouter);

//


// app.use(userRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
