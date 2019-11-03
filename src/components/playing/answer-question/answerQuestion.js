import React, {useContext, useState} from 'react'
import { GameState, Socket } from '../../../contexts';
import usePlayer from '../../../hooks/usePlayer';
import './answerQuestion.scss'

const AnswerQuestion = () => {
  const { gameState } = useContext(GameState);
  const { socket } = useContext(Socket)
  const { player } = usePlayer();
  const [answer, setAnswer] = useState(null)

  const submitAnswer = (event) => {
    event.preventDefault()
    socket.send(JSON.stringify({
      action: "ANSWER",
      id: gameState.id,
      playerId: player.id,
      answer,
    }))
  }

  return (<>
    <main>
      <h1>Time to answer, good luck!</h1>
      <form onSubmit={submitAnswer} id="answerForm">
        <textarea placeholder={'Type your answer here'} onChange={(e) => setAnswer(e.target.value)} />
      </form>
    </main>
    <footer>
      <button type="submit" form="answerForm" value="Submit">Submit Answer</button>
    </footer>
  </>)
}

export default AnswerQuestion;