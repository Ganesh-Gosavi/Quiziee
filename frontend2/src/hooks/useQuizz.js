// Importing useState hook from React
import { useState } from "react"
// Importing useDispatch hook from react-redux to dispatch actions
import { useDispatch } from 'react-redux';
// Importing action creator setCreatePopup from '../slices/popupSlice'
import { setCreatePopup } from '../slices/popupSlice'; 
// Importing toast notification library
import toast from 'react-hot-toast';

// Custom hook named useQuizz
export const useQuizz=()=>{
   // Initializing useDispatch hook
   const dispatch=useDispatch();
    // Initializing state variables for quizz data and page
    const [quizzData,setQuizzData]=useState({
        "id":"",
        "quizzName":"",
        "quizzType":""
    });
    const [nextpage,setNextpage]=useState(0);
  

    // Function to handle changes in quizz data
    const quizzDataChangeHandler = (event) => {
        const { name, value } = event.target;
        // Updating quizz data based on user input
        setQuizzData({
          ...quizzData,
          [name]: value
        });
      };

      // Function to handle form submission
      const onSubmitHandler=(event)=>{
        // Validating quizz data
        if(!quizzData.quizzName){
          // Showing error toast if quizz name is not entered
          toast.error("Enter Quizz Name..")
        }else if(!quizzData.quizzType){
          // Showing error toast if quizz type is not selected
          toast.error("Select Quiz Type..")
        }
        else{
            // Hiding quizz page if data is valid
            setNextpage(nextpage+1);
        }
      }

      // Function to handle cancellation of quizz creation
      const onCancelHandler=()=>{
        // Dispatching action to set create popup state to false
        dispatch(setCreatePopup(false));
      }

    // Returning state variables and functions to be used in components
    return {quizzData,quizzDataChangeHandler,onSubmitHandler,onCancelHandler,nextpage,setNextpage};
}
