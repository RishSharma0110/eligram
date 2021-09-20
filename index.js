// ! Core Modules imports
const path = require('path');

// ! NPM  Modules imports
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

// ! Util Imports
const DB_CONNECT = require('./utils/db');

// ! App settings
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', 'views');
const store = MongoDBStore({
  uri: process.env.A_DB_URI,
  collection: 'sessionstorecollection',
});

// ! App Middlewares
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'qetuoadgjl',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(flash());

// ! Route Imports
const authRoutes = require('./routes/auth');
const homeRoute = require('./routes/home');

// ! Route Middlewares
app.use('/auth', authRoutes);
app.use('/', homeRoute);

// ! Test Route
app.get('/test', (req, res) => {
  res.render('login', {
    accountCreated: '',
  });
});

DB_CONNECT(process.env.A_DB_URI)
  .then(() => {
    console.log(`DB Connected`);
    return app.listen(PORT);
  })
  .then(() => {
    console.log(`Server Started at ${PORT}`);
  })
  .catch((err) => {
    console.log('Could not connect to database');
  });
