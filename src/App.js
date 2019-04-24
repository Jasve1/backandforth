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

  getQuestionById(id){
    let questionFound = this.state.questions.find(elm => elm._id === id);
    console.log(questionFound);
    return questionFound;
  }

  renderQuestion(props, id){
    let question = this.getQuestionById(id);
    return <Question {...props} question={question}/>
  }

  render() {
    return (
      <Router>
        <h1>Welcome to Back and Forth</h1>
        <Switch>
            <Route exact path={'/'}
                render={(props) =>
                  <div>
                    {
                      this.state.isLoading ? <div>Qusetions loading...</div> :
                        <QuestionList {...props} questions={this.state.questions}/>
                    }
                     <AddQuestion {...props} submitQuestion={this.submitQuestion}/> 
                  </div>
                }
            />
            <Route exact path={'/question/:id'}
                render={(props) =>
                  this.renderQuestion(props, props.match.params.id)
                }
            />
        </Switch>
      </Router>
    );
  }
}

export default App;
