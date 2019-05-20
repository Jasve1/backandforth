import React, { Component } from 'react'

export class Rating extends Component {

  calculateScore = (votes, liked) =>{
    let score = parseInt((liked / votes) * 100);
    if(score){
      return `${score}% liked this answer`;
    }
    return "No one has voted on this answer";
  }

  handleRanking = (e) => {
    e.preventDefault();
    this.props.rateAnswer(
      e.target.value,
      this.props.answer._id
    )
  }

  render() {
    let ranking = this.props.answer.ranking;
    let score = this.calculateScore(ranking.votes, ranking.liked);
    return (
      <div>
        <p><strong>Votes:</strong> {ranking.votes}</p>
        <p>{score}</p>
        <button onClick={this.handleRanking} value="1">
          Like answer
        </button>
        <button onClick={this.handleRanking} value="0">
          Dislike answer
        </button>
      </div>
    )
  }
}

export default Rating
