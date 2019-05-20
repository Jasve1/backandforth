import React, { Component } from 'react'
import {Link} from 'react-router-dom';

import AnswerList from './answers/AnswersList';
import AddAnswer from './AddAnswer';

export class Question extends Component {
  render() {
    let question = this.props.question
    if(!question){
      return <div>Question loading...</div>
    }
    return (
      <div id="question">
        <Link to={'/'}>Back</Link>
        <article>
          <header>
            <h2>{question.title}</h2>
          </header>
          <strong>{question.questionerName} is asking:</strong>
          <p>{question.question}</p>
          <div className="answer-box">
            <header>
              <h3>Answers</h3>
            </header>
            <AnswerList answers={question.answers} rateAnswer={this.props.rateAnswer}/>
          </div>
        </article>
        <AddAnswer 
            questionId={question._id} 
            submitAnswer={this.props.submitAnswer} 
            addAnswer={this.props.addAnswer}
        />
      </div>
    )
  }
}

export default Question
