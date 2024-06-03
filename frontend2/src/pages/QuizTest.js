import React from 'react'; // Import React library
import style from './QuizTest.module.css'; // Import CSS module for styling
import Questions from '../components/quiztest/Questions'; // Import Questions component

// Functional component representing the quiz test page
export default function QuizTest() {
    return (
        <div className={style.container}>
            {/* Render the Questions component */}
            <Questions />
        </div>
    );
}
