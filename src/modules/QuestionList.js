import React, { Component } from 'react'
import {Link} from "react-router-dom";

export class QuestionList extends Component {
  render() {
    let list = [];
    let questions = this.props.questions;

    if(questions.length > 0){
        questions.forEach(question => {
            list.push(
                <Link to={`question/${question._id}`}>
                    <li>
                        <h3>
                            {question.title}
                        </h3>
                        <p>{question.question}</p>
                    </li>
                </Link>
            )
        });

        return (
            <div className="questions">
                <header>
                    <h2>Questions:</h2>
                </header>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }else{
        return(
            <div className="questions">
              <p>There are currently no questions to anwer</p>  
            </div>
        )
    }
  }
}

export default QuestionList
