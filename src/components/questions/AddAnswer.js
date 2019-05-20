import React, { Component } from 'react'

export class AddAnswer extends Component {
  constructor(props) {
    super(props);

    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
  }

  handleAnswerSubmit(e){
    e.preventDefault();
    
    const answer = {};
    e.target.childNodes.forEach((elm) => {
      if(elm.value){
        answer[elm.name] = elm.value
      }
      elm.value = null
    })

    this.props.submitAnswer(
      answer.responderName,
      answer.answer,
      this.props.questionId
    )
    .then(res => {
      this.props.addAnswer(
        this.props.questionId,
        res._id
      )
    })

  }

  render() {
    return (
      <div className="add">
        <form onSubmit={this.handleAnswerSubmit}>
          <input type="text" name="responderName" placeholder="Your name"/>
          <textarea type="text" name="answer" placeholder="Your answer"/>
          <button type="submit">
            <h2>Reply to question</h2>
          </button>
        </form>
      </div>
    )
  }
}

export default AddAnswer
