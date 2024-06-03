import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createQuizApi } from "../apis/quiz";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCreatePopup, setEditPopup } from "../slices/popupSlice";
import { updateQuizDetails } from "../apis/quiz";
export const useQuestion = (quizzData) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [questionsData, setQuestionsData] = useState([
    {
      description: "",
      optionType: "text",
      options: [
        { text: "", imageurl: "" },
        { text: "", imageurl: "" },
      ],
      correctOption: "",
    },
  ]);

  const [timer, setTimer] = useState("OFF");

  const [selectedQuestion, setselectedQuestion] = useState(0);

  const addOption = () => {
    setQuestionsData((prevQuestionsData) => {
      const updatedQuestionsData = [...prevQuestionsData];
      updatedQuestionsData[selectedQuestion].options.push({
        text: "",
        imageurl: "",
      });
      return updatedQuestionsData;
    });
  };
  const removeOption = (index) => {
    setQuestionsData((prevQuestionsData) => {
      const updatedQuestionsData = [...prevQuestionsData];
      updatedQuestionsData[selectedQuestion].options.splice(index, 1);

      if (index === updatedQuestionsData[selectedQuestion].correctOption) {
        updatedQuestionsData[selectedQuestion].correctOption = "";
      }

      return updatedQuestionsData;
    });
  };

  const handleTimerChange = (time) => {
    setTimer(time);
  };

  const addQuestionHandler = () => {
    setQuestionsData([
      ...questionsData,
      {
        description: "",
        optionType: "text",
        options: [
          { text: "", imageurl: "" },
          { text: "", imageUrl: "" },
        ],
        correctOption: "",
      },
    ]);
    setselectedQuestion(0);
  };

  const removeQuestionHandler = (index) => {
    const updatedQuestions = questionsData.filter((_, ind) => ind !== index);
    setQuestionsData(updatedQuestions);
    setselectedQuestion(0);
  };

  const changeQuestionHandler = (index) => {
    setselectedQuestion(index);
  };
  const handleOptionTypeChange = (event) => {
    const { dataset } = event.currentTarget;
    const { name, value } = dataset;
    setQuestionsData((prevQuestionsData) => {
      const updatedQuestionsData = [...prevQuestionsData];
      updatedQuestionsData[selectedQuestion][name] = value;
      return updatedQuestionsData;
    });
  };

  //for Q&A correct option change
  const handleCorrectOptionChange = (event, index) => {
    setQuestionsData((prevQuestionsData) => {
      const updatedQuestionsData = [...prevQuestionsData];
      updatedQuestionsData[selectedQuestion].correctOption = Number(index);
      return updatedQuestionsData;
    });
  };

  //for selected optionType options value change
  const handleOptionValueChange = (event, index) => {
    const { value, name } = event.target;

    setQuestionsData((prevQuestionsData) => {
      const updatedQuestionsData = [...prevQuestionsData];
      updatedQuestionsData[selectedQuestion].options[index][name] = value;
      return updatedQuestionsData;
    });
  };

  //for question description value change

  const onChangeDescription = (event) => {
    const { value, name } = event.target;
    setQuestionsData((prevQuestionsData) => {
      const updatedQuestionsData = [...prevQuestionsData];
      updatedQuestionsData[selectedQuestion].description = value;
      return updatedQuestionsData;
    });
  };
  const checkAllFields = (quizzType) => {
    for (let i = 0; i < questionsData.length; i++) {
      const question = questionsData[i];
      if (!question.description) {
        toast.error(`Enter Description of question Q.${i + 1}`);
        return false;
      }

      if (quizzType !== "Poll" && question.correctOption === "") {
        toast.error(`Choose CorrectOption of question Q.${i + 1}`);
        return false;
      }

      if (!question.optionType) {
        toast.error(`Select OptionType of question Q.${i + 1}`);
        return false;
      }

      for (let j = 0; j < question.options.length; j++) {
        const option = question.options[j];

        if (question.optionType === "text" && !option.text) {
          toast.error(`Enter Text of question Q.${i + 1} at Option:${j + 1}`);
          return false;
        }

        if (question.optionType === "image" && !option.imageurl) {
          toast.error(
            `Enter ImageURL of question Q.${i + 1} at Option:${j + 1}`
          );
          return false;
        }

        if (question.optionType === "textImage") {
          if (!option.text) {
            toast.error(`Enter Text of question Q.${i + 1} at Option:${j + 1}`);
            return false;
          }

          if (!option.imageurl) {
            toast.error(
              `Enter ImageURL of question Q.${i + 1} at Option:${j + 1}`
            );
            return false;
          }
        }
      }
    }
    return true;
  };
  const createQuiz = async (quizzData, nextpageHandle) => {
    const isValid = checkAllFields(quizzData?.quizzType);
    if (isValid) {
      const result = await createQuizApi(
        quizzData.quizzName,
        quizzData.quizzType,
        questionsData,
        timer,
        token,
        dispatch
      );
      if (result) {
        nextpageHandle(result?.data?.quizzId);
      }
    }
  };
  const editQuiz = async (quizzData) => {
    const isValid = checkAllFields(quizzData?.quizzType);
    if (isValid) {
      const result = await updateQuizDetails(
        quizzData?._id,
        questionsData,
        timer,
        token,
        dispatch
      );
    }
  };
  // Function to handle cancellation of quizz creation
  const onCancelHandler = () => {
    // Dispatching action to set create popup state to false
    dispatch(setCreatePopup(false));
    dispatch(setEditPopup(false));
  };
  useEffect(() => {
    if (quizzData) {
      setQuestionsData(
        quizzData?.questions || [
          {
            description: "",
            optionType: "text",
            options: [
              { text: "", imageurl: "" },
              { text: "", imageurl: "" },
            ],
            correctOption: "",
          },
        ]
      );
      setTimer(quizzData?.timer || "OFF");
    }
  }, [quizzData]);
  return {
    timer,
    setTimer,
    questionsData,
    createQuiz,
    selectedQuestion,
    addOption,
    removeOption,
    handleTimerChange,
    addQuestionHandler,
    removeQuestionHandler,
    changeQuestionHandler,
    handleOptionTypeChange,
    handleCorrectOptionChange,
    handleOptionValueChange,
    onChangeDescription,
    onCancelHandler,
    editQuiz,
  };
};
