import React, { useState } from 'react';
import style from './styles/CreateQuiz.module.css';
import QuestionCard from './QuestionCard'; // Import QuestionCard component
import { useQuizz } from '../../../hooks/useQuizz';
import ShareQuiz from './ShareQuiz';

export default function CreateQuiz() {
  const {
    quizzData,
    quizzDataChangeHandler,
    onSubmitHandler,
    onCancelHandler,
    nextpage,
    setNextpage,
  } = useQuizz();
  
  const [quizzId, setQuizzId] = useState("");

  const nextpageHandle = (quizzId) => {
    setNextpage(nextpage + 1);
    setQuizzId(quizzId);
  };

  return (
    <>
      {nextpage === 0 && (
        <div className={style.popupContainer}>
          <div className={style.inputContainer}>
            <input
              placeholder="Quiz name"
              className={style.quizzName}
              name="quizzName"
              value={quizzData.quizzName}
              onChange={quizzDataChangeHandler}
            />
            <div className={style.choiceContainer}>
              <span>Quiz Type</span>
              <button
                className={`${style.qaChoice} ${quizzData.quizzType === "Q&A" ? style.active : ""}`}
                name="quizzType"
                value="Q&A"
                onClick={quizzDataChangeHandler}
              >
                Q & A
              </button>
              <button
                className={`${style.pollChoice} ${quizzData.quizzType === "Poll" ? style.active : ""}`}
                name="quizzType"
                value="Poll"
                onClick={quizzDataChangeHandler}
              >
                Poll Type
              </button>
            </div>
          </div>
          <div className={style.buttonContainer}>
            <button className={style.cancelButton} onClick={onCancelHandler}>Cancel</button>
            <button className={style.continueButton} onClick={onSubmitHandler}>Continue</button>
          </div>
        </div>
      )}
      {nextpage === 1 && (
        <QuestionCard quizzData={quizzData} nextpageHandle={nextpageHandle} />
      )}
      {nextpage === 2 && (
        <ShareQuiz quizzId={quizzId} />
      )}
    </>
  );
}
