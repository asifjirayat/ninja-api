const express = require('express');

const routes = require('./routes/api');

//setup express app
const app = express();

app.use('/api', routes);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is up.');
    
});