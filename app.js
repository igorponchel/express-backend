const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const stuffRoutes = require('./routes/stuff');

mongoose.connect('mongodb+srv://igouz:6mlsbG0LbxLvyxuv@cluster0.sqqorfn.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);


module.exports = app;