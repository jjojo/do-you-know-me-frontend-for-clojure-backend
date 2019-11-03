import React, {useContext, useState, useEffect} from 'react'
import './correctAnswers.scss'
import { GameState, Socket } from '../../../contexts';
import usePlayer from '../../../hooks/usePlayer';

const CorrectAnswers = () => {
  const { gameState } = useContext(GameState);
  const { socket } = useContext(Socket)
  const { player } = usePlayer();
  const [answer, setAnswer] = useState(null)

  useEffect(() => {
    setAnswer(gameState.activeQuestion.answers.filter(a => !a.hasOwnProperty('correct'))[0])
  }, [gameState.activeQuestion.answers])

  const correctAnswer = (event, bool) => {
    event.preventDefault()
    console.log("CORRECTED A QUESTION", bool)
    // socket.emit('CorrectedAnswer', state.gameState.room, answer.playerId, bool)
  }

  return (<React.Fragment>
    <main>
      <h1>This is your question! Answers will come in soon, stay ready!</h1>
      <p>
        {answer && answer.answer}
      </p>
    </main>
    <footer>
      <button onClick={(e) => correctAnswer(e, false)}>
        <span role="img" aria-label="reject">❌</span>
      </button>
      <button onClick={(e) => correctAnswer(e, true)}>
        <span role="img" aria-label="accept">✅</span>
      </button>
    </footer>
    
  </React.Fragment>)
}

export default CorrectAnswers;