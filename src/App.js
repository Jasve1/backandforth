import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import QuestionList from './QuestionList';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      questions: [],
      answers: []
    }
  }

  componentDidMount(){
    console.log('App component has mounted');
    this.getQuestions();
  }

  getQuestions(){
    fetch('http://localhost:8080/api/questions')
    .then(response => response.json())
    .then(json => {
      this.setState({questions: json});
      console.log(this.state.questions);
    });
  }

  render() {
    return (
      <Router>
        <Switch>
        <Route exact path={'/'}
              render={(props) =>
                <QuestionList {...props} 
                questions={this.state.questions}/>
              }
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
