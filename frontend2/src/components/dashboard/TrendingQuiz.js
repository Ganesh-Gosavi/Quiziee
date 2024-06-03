import React, { useEffect, useState } from 'react';
import style from './TrendingQuiz.module.css';
import QuizChip from './QuizChip';
import { getTrendingQuizzs } from "../../apis/quiz";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function TrendingQuiz() {
  // Redux state selectors
  const { token } = useSelector((state) => state.auth);
  const { createPopup } = useSelector((state) => state.popup);

  // Component state variables
  const [trendingQuiz, setTrendingQuiz] = useState({});
  const dispatch = useDispatch();
  const location = useLocation();

  // Function to fetch trending quizzes from the server
  const fetchTrendingQuiz = async () => {
    try {
      const result = await getTrendingQuizzs(token, dispatch);
      setTrendingQuiz(result?.data);
    } catch (error) {
      console.error('Error fetching trending quizzes:', error);
      // Handle error here (e.g., display error message)
    }
  };

  // Fetch trending quizzes when the component mounts or when createPopup changes
  useEffect(() => {
    if (!createPopup && location.pathname === '/dashboard') {
      fetchTrendingQuiz();
    }
  }, [createPopup]);

  return (
    <>
      {(
        <div className={style.container}>
          {/* Upper section displaying quiz statistics */}
          <section className={style.upperSection}>
            <div className={style.quizInfo}>
              <div className={`${style.quizBox1} ${style.Box1}`}>
                <p className={style.quizCreated}>{trendingQuiz?.totalQuizzes ? trendingQuiz?.totalQuizzes : 0}<span className={style.title}> Quiz</span></p>
                <p className={style.title}>Created</p>
              </div>
            </div>
            <div className={style.quizInfo}>
              <div className={`${style.quizBox1} ${style.Box2}`}>
                <p className={style.questionCreated}>{trendingQuiz?.totalQuestions ? (trendingQuiz?.totalQuestions) : 0}<span> questions</span></p>
                <p >Created</p>
              </div>
            </div>
            <div className={style.quizInfo}>
              <div className={`${style.quizBox1} ${style.Box3}`}>
                <p className={style.impression}>
                  {trendingQuiz?.totalImpressions ? (trendingQuiz?.totalImpressions < 1000 ? trendingQuiz?.totalImpressions : `${(trendingQuiz.totalImpressions / 1000).toFixed(1)}K`) : 0}
                  <span> Total</span>
                </p>
                <p>Impressions</p>
              </div>
            </div>
          </section>
  
          {/* Lower section displaying trending quizzes */}
          <section className={style.lowerSection}>
            <h3>Trending Quizs</h3>
            <div className={style.quizContainer}>
              {trendingQuiz?.trendingQuizzes?.map(quiz => (
                <QuizChip key={quiz._id} quiz={quiz} />
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
  
}
