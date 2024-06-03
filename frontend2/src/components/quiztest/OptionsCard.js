import React from 'react';
import style from './styles/OptionsCard.module.css';

export default function OptionsCard({ id, options, selectedOptions, setSelectedOptions, optionType }) {
  // Function to handle option click event
  const onClickHandler = (event) => {
    // Extract the selected option ID from the clicked element's dataset
    const selectedOption = event.currentTarget.dataset.id;

    // Update the selected options state with the new selection
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [id]: Number(selectedOption),
    }));
  };

  // Function to render text options
  const renderTextOptions = () => (
    <div className={style.textcontainer}>
      {/* Map through text options */}
      {options?.map((option, index) => (
        <div
          key={index}
          className={`${style.text} ${selectedOptions[id] === index && style.active}`}
          onClick={onClickHandler}
          data-id={index}
        >
          <span>{option?.text}</span>
        </div>
      ))}
    </div>
  );

  // Function to render image options
  const renderImageOptions = () => (
    <div className={style.imgcontainer}>
      {/* Map through image options */}
      {options?.map((option, index) => (
        <div key={index} className={`${style.image} ${selectedOptions[id] === index && style.active}`} onClick={onClickHandler} data-id={index}>
          <img src={option?.imageurl} alt={`img${index + 1}`} />
        </div>
      ))}
    </div>
  );

  // Function to render text and image options
  const renderTextImageOptions = () => (
    <div className={style.textimagecontainer}>
      {/* Map through text and image options */}
      {options?.map((option, index) => (
        <div key={index} className={`${style.textimage} ${selectedOptions[id] === index && style.active}`} onClick={onClickHandler} data-id={index}>
          <span>{option?.text}</span>
          <img src={option?.imageurl} alt={`img${index + 1}`} />
        </div>
      ))}
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
