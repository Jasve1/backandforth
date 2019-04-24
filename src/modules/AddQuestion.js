import React, { Component } from 'react'

export class AddQuestion extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    const question = {};
    e.target.childNodes.forEach((elm) => {
      if(elm.value){
        question[elm.name] = elm.value
      }
      elm.value = null
    })

    this.props.submitQuestion(
      question.questionerName, 
      question.title, 
      question.question
    )
  }

  render() {
    return (
      <div>
        <h2>Submit your question</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="questionerName" placeholder="Your name"/>
          <input type="text" name="title" placeholder="Question title"/>
          <textarea type="text" name="question" placeholder="Your question"/>
          <button type="submit">
            Ask your question
          </button>
        </form>
      </div>
    )
  }
}

export default AddQuestion
