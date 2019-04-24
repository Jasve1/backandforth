import React, { Component } from 'react'

import AnswerList from './AnswersList';

export class Question extends Component {
  render() {
    let question = this.props.question
    return (
      <div>
        <h2>{question.title}</h2>
        <strong>{question.questionerName} is asking:</strong>
        <p>{question.question}</p>
        <AnswerList answers={question.answers}/>
      </div>
    )
  }
}

export default Question
