'use strict'

const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

// Allow to use the defined static folders
app.use(express.static('node_modules/materialize-css'));
app.use(express.static('views'));

// Connect to mongoose
mongoose.connect('mongodb://localhost/watchjot-dev')
    .then(() =>  console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Index Route
app.get('/', (req, res) => {
    const title ='Welcome'
    res.render('index', {
        title: title
    });
});

// About Route
app.get('/about', (req, res) => {
    res.render('about');
});

// todo/add Route
app.get('/add', (req, res) => {
    res.render('add');
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});