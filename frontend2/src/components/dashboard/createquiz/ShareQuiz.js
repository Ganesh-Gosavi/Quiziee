import React from 'react'
import style from './styles/ShareQuiz.module.css'
import cross from '../../../images/cross.png'
import copy from 'copy-to-clipboard'
import toast from 'react-hot-toast'
import { setCreatePopup } from '../../../slices/popupSlice'; 
import { useDispatch } from 'react-redux'
const frontendURL="http://localhost:3000";
export default function ShareQuiz({quizzId}) {
  const dispatch=useDispatch();
  const shareQuizHandler=()=>{
    toast.success("Link is copied successfully");
    copy(`${frontendURL}/quizTest/${quizzId}`)
  }
  return (
    <div className={style.popupContainer}>
        <img src={cross} alt='close' className={style.closeButton} onClick={()=>{dispatch(setCreatePopup(false))}}></img>
        <div className={style.title}>
            <p>Congrats your Quiz is</p>
            <p>Published!</p>
        </div>
        <input value={`${frontendURL}/quizTest/${quizzId}`} readonly/>
        <button className={style.shareButton} onClick={shareQuizHandler}>Share</button>
    </div>
  )
}
