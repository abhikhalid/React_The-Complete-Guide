import React, { useState } from 'react'

function Quiz() {
 const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
 const [userAnswers, setUserAnswers] = useState([]);

  return (
    <div>Quiz</div>
  )
}

export default Quiz