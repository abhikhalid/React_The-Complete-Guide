import React, { act, useState } from 'react'
import QUESTIONS from '../../questions';
import quizIsCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer';

function Quiz() {
 const [userAnswers, setUserAnswers] = useState([]);
 
 const activeQuestionIndex = userAnswers.length;
 

 const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

 function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
    })
 }

 if(quizIsComplete){
  return (
    <div id='summary'>
        <img src={quizIsCompleteImg} alt="Trophy Icon" />
        <h2>Quiz Completed!</h2>
    </div>
  )
 }

 const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
 shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
        <div id="question">
        <QuestionTimer timeout={100000} onTimeout={()=> handleSelectAnswer(null)}/>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
            {shuffledAnswers.map((answer)=>(
                <li key={answer} className='answer'>
                    <button onClick={()=>handleSelectAnswer(answer)}>
                        {answer}
                    </button>
                </li>
            ))}
        </ul>
        </div>
    </div>
  )
}

export default Quiz