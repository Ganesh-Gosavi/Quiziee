import React, { useEffect, useState } from 'react';
import style from './styles/Score.module.css';
import trophy from '../../images/trophy.png';
import { submitQuiz } from '../../apis/quiz';

export default function Score({ quizId, quizzType, selectedOptions, totalQz }) {
  // State variables to manage score, submission status, and loading indicator
  const [score, setScore] = useState(0);
  const [submittedAnswered, setSubmittedAnswered] = useState(false);

  // Function to fetch score from the server
  const fetchScore = async () => {
    try {
      const result = await submitQuiz(quizId, selectedOptions);
      if (result) {
        // Set score and update submission status if successful
        if (quizzType === "Q&A") {
          setScore(result.data?.score);
        } 
        setSubmittedAnswered(true);
      }
    } catch (error) {
      console.error("Error fetching score:", error);
      // Handle error here (e.g., display error message)
    }
  };
  
  useEffect(() => {
    fetchScore();
  }, []);

  return (
    <div className={style.container}>
      {
        // Display appropriate content based on quiz type and submission status
        submittedAnswered && (
          quizzType !== "Poll" ? (
            // Display score if the quiz type is Q&A and submission status is true
            <>
              <p>Congrats Quiz is completed</p>
              <img src={trophy} alt="trophy" />
              <p className={style.score}>Your Score is <span>{`${score}/${totalQz}`}</span></p>
            </>
          ) : (
            // Display poll submission message if the quiz type is Poll and submission status is true
            <div className={style.pollContainer}>
              <span>Thank you for participating in the Poll</span>
            </div>
          )
      )}
    </div>
  );
}
