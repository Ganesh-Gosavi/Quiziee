import React, { useEffect, useState } from 'react';
import style from './styles/Questions.module.css';
import OptionsCard from './OptionsCard';
import Score from './Score';
import { getQuizQuestions } from '../../apis/quiz';
import { useParams } from 'react-router-dom';

export default function Questions() {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState({}); // State to store quiz data
  const [qno, setQno] = useState(0); // State to track current question number
  const [selectedOptions, setSelectedOptions] = useState({}); // State to store selected options
  const [timer, setTimer] = useState("OFF"); // State to manage timer
  const [initialTimer, setInitialTimer] = useState("OFF"); // State to store initial timer value

  // Function to fetch quiz questions
  const fetchQuestions = async () => {
    const result = await getQuizQuestions(quizId);
    if (result) {
      // Set quiz data and timer if available
      if (result?.timer !== "OFF") {
        setTimer(Number(result?.timer));
        setInitialTimer(Number(result?.timer));
      }
      setQuizData(result);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  // Effect to manage timer countdown
  useEffect(() => {
    if (timer !== "OFF") {
      const countdown = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  // Effect to automatically move to next question when timer reaches 0
  useEffect(() => {
    if (timer === 0) {
      nextQuestionHandler();
    }
  }, [timer]);

  // Function to handle next question button click
  const nextQuestionHandler = () => {
    if (qno <= quizData?.questions?.length - 1) {
      setQno(qno + 1);
      setTimer(initialTimer); // Reset timer to initial value for each question
    } 
  };

  return (
    Object.keys(quizData).length !== 0 && (
      <div className={style.container}>
        {/* Render questions */}
        {qno < quizData?.questions?.length ? (
          <>
            <div className={style.totalQuestion}>
              <span className={style.questionNo}>{`${qno + 1}/${quizData?.questions?.length}`}</span>
              {/* Render timer if available */}
              {initialTimer !== "OFF" && (
                <span className={style.timer}>{`00:${timer < 10 ? `0${timer}` : timer}s`}</span>
              )}
            </div>
            {/* Render question details and options */}
            <div className={style.questionDetails}>
              <p>{quizData?.questions[qno]?.description}</p>
              <OptionsCard 
                id={quizData?.questions[qno]._id}
                options={quizData?.questions[qno]?.options}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                optionType={quizData?.questions[qno]?.optionType}
              />
              <button className={style.button} onClick={nextQuestionHandler}>{qno === quizData?.questions?.length - 1 ? "Submit" : "Next"}</button>
            </div>
          </>
        ) : (
          // Render score component when all questions are answered
          <Score quizId={quizData?._id} quizzType={quizData?.quizzType} selectedOptions={selectedOptions} totalQz={qno}/>
        )}
      </div>
    )
  );
}
