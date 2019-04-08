import React, { Component } from 'react'
import { BrowserRouter as Link} from "react-router-dom";

export class QuestionList extends Component {
  render() {
    let list = [];
    let questions = this.props.questions;

    if(!questions === null){
        questions.forEach(question => {
            list.push(
                <li>
                    <Link to={`question/${question._id}`}>{question.title}</Link>
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
            <p>There are currently no questions to anwer</p>
        )
    }
  }
}

export default QuestionList
