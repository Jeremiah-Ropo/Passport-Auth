const express = require('express');

const app = express();


// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



app.listen(3000,function () { 
    console.log('Server started on port 3000')
});
