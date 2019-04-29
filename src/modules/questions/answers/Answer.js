import React, { Component } from 'react'

import Ranking from './Ranking';

export class Answer extends Component {
  render() {
    let answer = this.props.answer;
    return (
      <li>
          <h4>{answer.responderName}'s answer:</h4>
          <p>{answer.answer}</p>
          <Ranking answer={answer} rateAnswer={this.props.rateAnswer}/>
      </li>
    )
  }
}

export default Answer
