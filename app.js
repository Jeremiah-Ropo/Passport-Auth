const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

//DB config
const db = require('./config/key').MongoURI;

// Connect mongoose
mongoose.connect(db, { useNewUrlParser: true})
    .then(() => console.log('mongoose connect...'))
    .catch((err) => console.log(err));


//EJS
app.use(expressLayout);
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({extended: false}));


// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



app.listen(3000,function () { 
    console.log('Server started on port 3000')
});
