import React from 'react';
import style from './QuizChip.module.css';
import impression from '../../images/impression.png';
import { formattedDate } from '../../utility/dateFormatter';


export default function QuizChip({ quiz }) {
  // Format the date of creation
  const date = formattedDate(quiz?.createdAt);

  return (
    <div className={style.container}>
      <div className={style.upperContainer}>
        {/* Quiz name */}
        <h3>{quiz.quizzName}</h3>
        {/* Impression count */}
        <div className={style.impressionContainer}>
          <p>{quiz.impression}</p>
          <img src={impression} alt="impression" />
        </div>
      </div>
      {/* Creation date */}
      <span>{`Created on : ${date}`}</span>
    </div>
  );
}
