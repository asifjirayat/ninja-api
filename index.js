const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/api');

//setup express app
const app = express();

const MONGO_URI = 'mongodb://localhost:27017/ninjago';
mongoose.connect(MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, (err) => {
    if(err) {
        console.log(err);
    }
});
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
    res.status(422).send({error: err.message});
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is up.');
    
});