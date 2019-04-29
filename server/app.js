/***** LIBRARIES ******/
require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
const questionSchema = new Schema({
    questionerName: String,
    title: String,
    question: String,
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer'}]
})

const answerSchema = new Schema({
    responderName: String,
    answer: String,
    ranking: {
        votes: Number,
        liked: Number
    },
    question: {type: Schema.Types.ObjectId, ref: 'Question'}
})

const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);

/****** ROUTES ******/
//GET
app.get('/api/questions', (req, res) => {
    Question.find({})
    .populate('answers')
    .exec((err, questions) => {
        if(err) return console.error(err);
        res.json(questions);
    })
})


//POST
app.post('/api/questions', (req, res) => {
    let newQuestion = new Question({
        questionerName: req.body.questionerName,
        title: req.body.title,
        question: req.body.question,
        answers: req.body.answers
    });
    newQuestion.save((err, question) => {
        if(err) return console.error(err);
        console.log(question);
    });
    Question.find({}, (err, questions) => {
        if(err) return console.error(err);
        res.json(questions);
    })
})
app.post('/api/answer', (req, res) => {
    let newAnswer = new Answer({
        responderName: req.body.responderName,
        answer: req.body.answer,
        ranking: req.body.ranking,
        question: req.body.question
    });
    console.log(req.body);
    newAnswer.save((err, answer) => {
        if(err) return console.error(err);
        console.log(answer);
        res.json(answer);
    });
})

//PUT
app.put('/api/questions/:id', (req, res) => {
    Question.findOne({ _id: req.params.id }, (err, question) => {
        if(err) return console.error(err);
        question.answers.push(req.body.answers);
        question.save((err, question) => {
            if(err) return console.error(err);
            console.log(question);
        });
        res.json(question);
    })
})

app.put('/api/answer/:id', (req, res) => {
    Answer.findOne({ _id: req.params.id }, (err, answer) => {
        if(err) return console.error(err);
        answer.ranking.votes += 1;
        answer.ranking.liked += req.body.liked;
        answer.save((err, answer) => {
            if(err) return console.error(err);
            console.log(answer);
        })
        res.json(answer);
    })
})

/**** Reroute all unknown requests to the React index.html ****/
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });

/****** LISTEN ******/
app.listen(port, () => console.log(`API running on port ${port}!`));
