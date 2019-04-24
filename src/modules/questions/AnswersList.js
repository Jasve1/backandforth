import React, { Component } from 'react'

export class AnswersList extends Component {
  render() {
    let list = [];
    let answers = this.props.answers;

    if(answers.length > 0){
        answers.forEach(answer => {
            list.push(
                <li>
                  <h3>{answer.responderName}'s answer:</h3>
                  <p>{answer.answer}</p>
                </li>
            )
        });

        return (
            <div>
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
