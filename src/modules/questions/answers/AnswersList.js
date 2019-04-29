import React, { Component } from 'react'

import Answer from './Answer';

export class AnswersList extends Component {
  render() {
    let list = [];
    let answers = this.props.answers;

    if(answers.length > 0){
        answers.forEach(answer => {
            list.push(
                <Answer answer={answer} rateAnswer={this.props.rateAnswer}/>
            )
        });

        return (
            <div id="answers">
                <ul>
                    {list}
                </ul>
            </div>
        )
    }else{
        return(
            <p>There are currently no answers to this question</p>
        )
    }
  }
}

export default AnswersList
