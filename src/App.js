import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import QuestionList from './modules/QuestionList';
import AddQuestion from './modules/AddQuestion';
import Question from './modules/questions/Question';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      questions: [],
      answers: [],
      isLoading: false
    }

    this.getQuestions = this.getQuestions.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.addAnswerToQuestion = this.addAnswerToQuestion.bind(this);
    this.rateAnswer = this.rateAnswer.bind(this);
  }

  componentDidMount(){
    this.setState({isLoading: true});
    console.log('App component has mounted');
    this.getQuestions();
  }

  getQuestions(){
    fetch('http://localhost:8080/api/questions')
    .then(response => response.json())
    .then(json => {
      this.setState({questions: json, isLoading: false});
      console.log(this.state.questions);
    });
  }

  submitQuestion(questionerName, title, question){
    fetch('http://localhost:8080/api/questions', {
      method: 'post',
      body: JSON.stringify({
        questionerName: questionerName,
        title: title,
        question: question,
        answers: []
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log('Question submited!', json);
      this.getQuestions();
    })
  }
  addAnswerToQuestion(questionId, answerId){
    fetch(`http://localhost:8080/api/questions/${questionId}`, {
      method: 'put',
      body: JSON.stringify({
        answers: {_id: answerId}
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log('Question answered', json);
      this.getQuestions();
    })
  }

  submitAnswer(responderName, answer, questionId) {
    return new Promise((res, rej) => {
      fetch('http://localhost:8080/api/answer', {
        method: 'post',
        body: JSON.stringify({
          responderName: responderName,
          answer: answer,
          ranking: {
            votes: 0,
            liked: 0
          },
          question: {_id: questionId}
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(json => {
        console.log('Answer submited!', json);
        res(json);
      })
    })
  }
  rateAnswer(liked, answerId){
    fetch(`http://localhost:8080/api/answer/${answerId}`, {
      method: 'put',
      body: JSON.stringify({
        liked: parseInt(liked) 
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log('Answer rated', json);
      this.getQuestions();
    })
  }

  getQuestionById(id){
    let questionFound = this.state.questions.find(elm => elm._id === id);
    console.log(questionFound);
    return questionFound;
  }

  renderQuestion(props, id){
    let question = this.getQuestionById(id);
    return <Question {...props} 
              question={question} 
              submitAnswer={this.submitAnswer} 
              addAnswer={this.addAnswerToQuestion}
              rateAnswer={this.rateAnswer}            
            />
  }

  render() {
    return (
      <Router>
        <header id="main-header">
          <h1>Welcome to Back and Forth</h1>
        </header>
        <main>
          <Switch>
              <Route exact path={'/'}
                  render={(props) =>
                    <div>
                      <AddQuestion {...props} submitQuestion={this.submitQuestion}/> 
                      {
                        this.state.isLoading ? <div>Qusetions loading...</div> :
                          <QuestionList {...props} questions={this.state.questions}/>
                      } 
                    </div>
                  }
              />
              <Route exact path={'/question/:id'}
                  render={(props) =>
                    this.renderQuestion(props, props.match.params.id)
                  }
              />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
