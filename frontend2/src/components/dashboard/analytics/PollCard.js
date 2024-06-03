import React from 'react';
import style from './styles/PollCard.module.css';

export default function PollCard({ question, qno }) {
 
  return (
    <div className={style.container}>
      {/* Question */}
      <h2>{`1.${qno} ${question.description}`}</h2>
      {/* Options */}
      <div className={style.optionContainer}>
        {question?.options?.map((_, index) => (
          <div key={index} className={style.selectedOption}>
            <h3>{question.selectedOptions[`option${index + 1}`]}</h3>
            <span>{`Option ${index + 1}`}</span>
          </div>
        ))}
      </div>
      {/* Border */}
      <div className={style.border}></div>
    </div>
  );
}

