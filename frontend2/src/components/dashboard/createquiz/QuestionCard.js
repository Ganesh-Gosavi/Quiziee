import React from 'react';
import style from './styles/QuestionCard.module.css';
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useQuestion } from '../../../hooks/useQuestion';
import OptionsCard from './OptionsCard';

export default function CreateQuestion({quizzData,nextpageHandle}) {
const {timer,questionsData,createQuiz,selectedQuestion,addOption,removeOption,handleTimerChange,addQuestionHandler,removeQuestionHandler,changeQuestionHandler,handleOptionTypeChange,handleCorrectOptionChange,handleOptionValueChange,onChangeDescription,onCancelHandler,editQuiz} = useQuestion(quizzData)

const createQuizHandler=()=>{
    createQuiz(quizzData,nextpageHandle);
}
const editQuizHandler=()=>{
  editQuiz(quizzData)
}

  return (
    <div className={style.popupContainer}>
      <section className={style.questionInfo}>
        <div className={style.questionInfoContainer}>
          <div className={style.questionsContainer}>
            {
              questionsData?.map((question,index)=>{
              return  <div className={style.questionContainer} onClick={(event)=>changeQuestionHandler(index,event)}>
                {
                  index+1
                }
                {
                  index!==0&&<RxCross2
                  className={style.crosslogo}
                  onClick={(event) => {
                    event.stopPropagation();
                    removeQuestionHandler(index);
                  }}
                />
                }
              </div>
              })
            }
            <div className={style.addContainer}>
             {
              questionsData?.length!==5&& <AiOutlinePlus className={style.addlogo} onClick={addQuestionHandler} />
             }
            </div>
          </div>
          <span className={style.maxquestion}>Max 5 questions</span>
        </div>
        <input type="text" placeholder={quizzData?.quizzType==="Q&A"?"Q&A Question":"Poll Question"} className={style.questionInput} name='description' value={questionsData[selectedQuestion]?.description} onChange={onChangeDescription} />
        <div className={style.optionTypeContainer}>
          <span>Option Type</span>
          <div className={style.optiontype}>
            <div className={style.radioOuterDiv} data-name="optionType" data-value="text" onClick={handleOptionTypeChange}>
               <div className={`${style.radioInnerDiv} ${questionsData[selectedQuestion]?.optionType === 'text'&&style.activeRadio}`}></div> 
            </div>
            <span>Text</span>
          </div>
          <div className={style.optiontype}>
            <div className={style.radioOuterDiv} data-name="optionType" data-value="image" onClick={handleOptionTypeChange}>
                <div className={`${style.radioInnerDiv} ${questionsData[selectedQuestion]?.optionType === 'image'&&style.activeRadio}`}></div>
            </div>
            <span>Image URL</span>
          </div>
          <div className={style.optiontype}>
            <div className={style.radioOuterDiv} data-name="optionType" data-value="textImage" onClick={handleOptionTypeChange}>
             <div className={`${style.radioInnerDiv} ${questionsData[selectedQuestion]?.optionType === 'textImage'&&style.activeRadio}`}></div>
            </div>
            <span>Text & Image URL</span>
          </div>
        </div>
      </section>
      <section className={style.selectOption} style={quizzData.quizzType === "Poll" ? {width: "calc(100% - 10rem)"} : {}}>
        <div className={style.optionContainer}>
          <OptionsCard optionType={questionsData[selectedQuestion]?.optionType} questionsData={questionsData} selectedQuestion={selectedQuestion} removeOption={removeOption} addOption={addOption} handleCorrectOptionChange={handleCorrectOptionChange} handleOptionValueChange={handleOptionValueChange} quizzType={quizzData?.quizzType}/>
        </div>
        {
          quizzData?.quizzType==="Q&A"&&<div className={style.timerContainer}>
          <span>Timer</span>
          <button className={timer === "OFF"&& style.activeTimer} onClick={() => handleTimerChange("OFF")}>OFF</button>
          <button className={timer === "5"&& style.activeTimer } onClick={() => handleTimerChange("5")}>5 sec</button>
          <button className={timer === "10" && style.activeTimer } onClick={() => handleTimerChange("10")}>10 sec</button>
        </div>
        }
      </section>
      <section className={style.buttonContainer}>
          <button className={style.cancelbutton} onClick={onCancelHandler}>Cancel</button>
          {
            quizzData?._id?(<button className={style.createbutton} onClick={editQuizHandler}>Edit Quiz</button>):(<button className={style.createbutton} onClick={createQuizHandler}>Create Quiz</button>)
          }
      </section>
    </div>
  );
}
