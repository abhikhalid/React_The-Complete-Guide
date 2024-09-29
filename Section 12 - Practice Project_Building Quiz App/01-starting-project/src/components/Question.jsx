import React from 'react'
import QuestionTimer from './QuestionTimer'
import Answers from './Answers'

export default function Question({
    questionText,
    answers,
    answerState,
    selectedAnswer,
    onSelectAnswer,
    onSkipAnswer
}) {
  return (
    <div id="quiz">
    <div id="question">
        <QuestionTimer
        timeout={10000}
        onTimeout={onSkipAnswer}
        />
       <h2>{questionText}</h2>
    
        <Answers
            answers={answers}
            selectedAnswer={selectedAnswer}
            answerState={answerState}
            onSelect={onSelectAnswer}
        />
    </div>
</div>
  )
}
