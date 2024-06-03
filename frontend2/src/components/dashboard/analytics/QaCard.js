import React from 'react';
import style from './styles/QaCard.module.css';


export default function QaCard({ question, qno }) {
  return (
    <div className={style.container}>
      {/* Question */}
      <h2>{`1.${qno} ${question.description}`}</h2>
      {/* Options */}
      <div className={style.optionContainer}>
        <div className={style.answerOption}>
          <h3>{question?.correctAnswered + question?.incorrectAnswered}</h3>
          <span>People Attempted the question</span>
        </div>
        <div className={style.answerOption}>
          <h3>{question?.correctAnswered}</h3>
          <span>People Answered Correctly</span>
        </div>
        <div className={style.answerOption}>
          <h3>{question?.incorrectAnswered}</h3>
          <span>People Answered InCorrectly</span>
        </div>
      </div>
      {/* Border */}
      <div className={style.border}></div>
    </div>
  );
}
