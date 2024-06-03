import React from 'react';
import deletelogo from '../../../images/delete.png';
import style from './styles/OptionCard.module.css';

export default function OptionsCard({
  optionType,
  questionsData,
  selectedQuestion,
  removeOption,
  addOption,
  handleCorrectOptionChange,
  handleOptionValueChange,
  quizzType,
}) {
  // Render options for text type questions
  const renderTextOptions = () => (
    <div className={style.textContainer}>
      {/* Map through options */}
      {questionsData[selectedQuestion]?.options?.map((option, index) => (
        <div key={index} className={style.text}>
          {/* Render radio button for Q&A quizzes */}
          {quizzType === "Q&A" && (
            <div className={style.radioOuterDiv} onClick={(event) => { handleCorrectOptionChange(event, index) }}>
              <div className={`${style.radioInnerDiv} ${questionsData[selectedQuestion]?.correctOption === index && style.activeRadio}`}></div>
            </div>
          )}
          {/* Input field for text option */}
          <input
            type="text"
            placeholder="Text"
            className={`${style.inputText} ${questionsData[selectedQuestion]?.correctOption === index && style.activeSelectedOptions}`}
            name="text"
            onChange={(event) => handleOptionValueChange(event, index)}
            value={questionsData[selectedQuestion]?.options[index]?.text}
          />
          {/* Delete button for options */}
          {index >= 2 && (
            <img
              src={deletelogo}
              alt="deletebutton"
              onClick={() => removeOption(index)}
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>
      ))}
      {/* Button to add more options */}
      {questionsData[selectedQuestion]?.options?.length < 4 && (
        <button onClick={addOption} className={style.addsection} style={quizzType === "Poll" ? { marginLeft: "0rem" } : {}}>
          Add Section
        </button>
      )}
    </div>
  );

  // Render options for image type questions
  const renderImageOptions = () => (
    <div className={style.imageContainer}>
      {/* Map through options */}
      {questionsData[selectedQuestion]?.options?.map((_, index) => (
        <div key={index} className={style.image}>
          {/* Render radio button for Q&A quizzes */}
          {quizzType === "Q&A" && (
            <div className={style.radioOuterDiv} onClick={(event) => { handleCorrectOptionChange(event, index) }}>
              <div className={`${style.radioInnerDiv} ${questionsData[selectedQuestion]?.correctOption === index && style.activeRadio}`}></div>
            </div>
          )}
          {/* Input field for image URL */}
          <input
            type="text"
            placeholder="Image URL"
            className={`${style.inputImage} ${questionsData[selectedQuestion]?.correctOption === index && style.activeSelectedOptions}`}
            name="imageurl"
            value={questionsData[selectedQuestion]?.options[index]?.imageurl}
            onChange={(event) => { handleOptionValueChange(event, index) }}
          />
          {/* Delete button for options */}
          {index >= 2 && (
            <img
              src={deletelogo}
              alt="deletebutton"
              onClick={() => removeOption(index)}
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>
      ))}
      {/* Button to add more options */}
      {questionsData[selectedQuestion]?.options?.length < 4 && (
        <button onClick={addOption} className={style.addsection} style={quizzType === "Poll" ? { marginLeft: "0rem" } : {}}>
          Add Section
        </button>
      )}
    </div>
  );

  // Render options for text and image type questions
  const renderTextImageOptions = () => (
    <div className={style.textimageContainer}>
      {/* Map through options */}
      {questionsData[selectedQuestion]?.options?.map((_, index) => (
        <div key={index} className={style.textimage}>
          {/* Render radio button for Q&A quizzes */}
          {quizzType === "Q&A" && (
            <div className={style.radioOuterDiv} onClick={(event) => { handleCorrectOptionChange(event, index) }}>
              <div className={`${style.radioInnerDiv} ${questionsData[selectedQuestion]?.correctOption === index && style.activeRadio}`}></div>
            </div>
          )}
          {/* Input field for text option */}
          <input
            type="text"
            placeholder="Text"
            className={`${style.textImageText} ${questionsData[selectedQuestion]?.correctOption === index && style.activeSelectedOptions}`}
            name="text"
            onChange={(event) => handleOptionValueChange(event, index)}
            value={questionsData[selectedQuestion]?.options[index]?.text}
          />
          {/* Input field for image URL */}
          <input
            type='text'
            placeholder='image URL'
            className={`${style.textImageUrl} ${questionsData[selectedQuestion]?.correctOption === index && style.activeSelectedOptions}`}
            name='imageurl'
            value={questionsData[selectedQuestion]?.options[index]?.imageurl}
            onChange={(event) => { handleOptionValueChange(event, index) }}
          />
          {/* Delete button for options */}
          {index >= 2 && (
            <img
              src={deletelogo}
              alt="deletebutton"
              onClick={() => removeOption(index)}
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>
      ))}
      {/* Button to add more options */}
      {questionsData[selectedQuestion]?.options?.length < 4 && (
        <button onClick={addOption} className={style.addsection} style={quizzType === "Poll" ? { marginLeft: "0rem" } : {}}>
          Add Section
        </button>
      )}
    </div>
  );

  return (
    <div className={style.optionsContainer}>
      {/* Render options based on the option type */}
      {optionType === "textImage" && renderTextImageOptions()}
      {optionType === "text" && renderTextOptions()}
      {optionType === "image" && renderImageOptions()}
    </div>
  );
}
