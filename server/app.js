/***** LIBRARIES ******/
require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

/***** CONFIG *****/
const app = express();
const port = (process.env.PORT || 8080);
app.use(express.static(path.join(__dirname, '../build')));
app.use(morgan('combined'));

/***** DATABASE SETUP ******/
mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('DB Connected');
});

/****** MIDDLEWARE *****/
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        // respond with 200
        console.log("Allowing OPTIONS");
        res.sendStatus(200);
    } else {
        // move on
        next();
    }
});
app.use(bodyParser.json()); 

/****** DATA SCHEMA ******/
const questionSchema = mongoose.Schema({
    questionerName: String,
    title: String,
    question: String,
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer'}]
})

const answerSchema = mongoose.Schema({
    responderName: String,
    title: String,
    answer: String,
    ranking: Number,
    question: {type: Schema.Types.ObjectId, ref: 'Question'}
})

const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);

/****** ROUTES ******/
//GET
app.get('/api/questions', (req, res) => {
    Question.find({}, (err, question) => {
        if(err) return console.error(err);
        res.json(question);
    })
})
app.get('/api/questions/:id', (req, res) => {
    Question.find({ _id: req.params.id }, (err, question) => {
        if(err) return console.error(err);
        res.json(question);
    })
})

//POST
//PUT
//DELETE

/****** LISTEN ******/
app.listen(port, () => console.log(`API running on port ${port}!`));
