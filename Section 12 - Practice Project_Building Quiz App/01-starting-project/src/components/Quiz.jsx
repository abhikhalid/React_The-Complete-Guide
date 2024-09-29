import React, {  useCallback, useRef, useState } from 'react'
import QUESTIONS from '../../questions';
import quizIsCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer';
import Answers from './Answers';
import Question from './Question';

function Quiz() {
 const [answerState, setAnswerState] = useState('');
 const [userAnswers, setUserAnswers] = useState([]);
 
 const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
 

 const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

 const handleSelectAnswer = useCallback( function handleSelectAnswer(selectedAnswer) {
    setAnswerState('answered');

    setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
    });

    setTimeout(() => {
        if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
           setAnswerState('correct');
        }else{
            setAnswerState('wrong');
        }
    
      setTimeout(() => {
        setAnswerState('');
      }, 2000);
    }, 1000);

 },[activeQuestionIndex]);

//  const handleSkipAnswer = useCallback(()=>handleSelectAnswer(null),[]);
 const handleSkipAnswer = useCallback(()=>handleSelectAnswer(null),[handleSelectAnswer]);

 if(quizIsComplete){
  return (
    <div id='summary'>
        <img src={quizIsCompleteImg} alt="Trophy Icon" />
        <h2>Quiz Completed!</h2>
    </div>
  )
 }


  return (
    <div id="quiz">
       <Question
            key={activeQuestionIndex} //create new instance of QuestionTimer when activeQuestionIndex changes
            questionText={QUESTIONS[activeQuestionIndex].text}
            answers={QUESTIONS[activeQuestionIndex].answers}
            answerState={answerState}
            selectedAnswer={userAnswers[userAnswers.length - 1]}
            onSelectAnswer={handleSelectAnswer}
            onSkipAnswer={handleSkipAnswer} 
       />
    </div>
  )
}

export default Quiz