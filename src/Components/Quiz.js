// import React, { useState } from 'react';
// import Questionlist from './Questionlist';
// import './Quiz.css'; // Ensure the correct path

// export default function Quiz() {
//   const question = [
//     {
//       question: "Which language is primarily used for Android app development?",
//       options: ["Python", "Java", "Swift", "Kotlin"],
//       answer: "Java"
//     },
//     {
//       question: "What is the default port number for HTTP?",
//       options: ["21", "80", "443", "8080"],
//       answer: "80"
//     },
//     {
//       question: "What is the primary purpose of CSS?",
//       options: ["To structure web pages", "To style web pages", "To add interactivity to web pages", "To manage databases"],
//       answer: "To style web pages"
//     }
//   ];

//   const [CurrentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [currentAnswer, setCurrentAnswer] = useState(null);
//   const [score , setScore] = useState(0);
//   const handleClick = (option) => {
//     setCurrentAnswer(option);
//     if(option === question[CurrentQuestionIndex].answer){
//         setScore(score+1)
//     }
//   };

//   const handleNextQuestion = () => {
//     setCurrentQuestionIndex(CurrentQuestionIndex + 1);
//     setCurrentAnswer(null);
//   };

//   return (
//     <div>
//         {CurrentQuestionIndex < question.length? <div>
//         <Questionlist 
//           question={question[CurrentQuestionIndex].question}
//           options={question[CurrentQuestionIndex].options}
//           handleClick={handleClick}
//           currentAnswer={currentAnswer}
//         />
//         <button
//           className={currentAnswer === null ? 'button-disable' : 'button'}
//           onClick={handleNextQuestion}
//           disabled={currentAnswer === null}
//         >
//           Next Question
//         </button>
//       </div>: <div>Your Score is {score}</div> }
     
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Questionlist from './Questionlist';
import './Quiz.css'; 

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [CurrentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.post('https://api.jsonserve.com/Uw5CrX')
      .then(response => {
       // console.log("hello");
        console.log(response.data); 

        if (Array.isArray(response.data)) {
          setQuestions(response.data); 
        } else if (Array.isArray(response.data.questions)) {
          setQuestions(response.data.questions);
        } else {
          setQuestions([]); 
        }

        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch questions:', err);
        setError('Failed to load quiz data');
        setLoading(false);
      });
  }, []);
    
  const handleClick = (option) => {
    setCurrentAnswer(option);
    if (option === questions[CurrentQuestionIndex].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(CurrentQuestionIndex + 1);
    setCurrentAnswer(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {CurrentQuestionIndex < questions.length ? (
        <div>
          <Questionlist 
            question={questions[CurrentQuestionIndex].question}
            options={questions[CurrentQuestionIndex].options}
            handleClick={handleClick}
            currentAnswer={currentAnswer}
          />
          <button
            className={currentAnswer === null ? 'button-disable' : 'button'}
            onClick={handleNextQuestion}
            disabled={currentAnswer === null}
          >
            Next Question
          </button>
        </div>
      ) : (
        <div>Your Score is {score} out of {questions.length}</div>
      )}
    </div>
  );
}

