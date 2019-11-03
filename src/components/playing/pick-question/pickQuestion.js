import React, {useContext, useState, useEffect, useCallback} from 'react'
import { Socket, GameState } from '../../../contexts';
import usePlayer from '../../../hooks/usePlayer';
import './pickQuestion.scss'
import Question from '../../question/question';

const PickQuestion = (props) => {
  const { player } = props;
  const { gameState } = useContext(GameState);
  const { socket } = useContext(Socket)
  const [ qIndex, setQIndex ] = useState(0)

  const setFocus = (qIndex) => {
    socket.send(JSON.stringify({
      action: "SET_FOCUS", 
      id: gameState.id,
      playerId: props.questions[qIndex].playerId,
      questionId: props.questions[qIndex].id
    }))
  }

  useEffect(() => {
    setFocus(qIndex)
  }, [qIndex])

  const getPlayerFromQuestion = (question) => question && gameState.players[question.playerId]

  const pickQuestion = () => {
    socket.send(JSON.stringify({
      action: "PICK_QUESTION",
      id: gameState.id,
      questionId: props.questions[qIndex].id
    }))
  }

  return (<>{gameState && player && <>
    <main>
      <h1>Your turn to pick a question!</h1>
      <button onClick={() => setQIndex((qIndex - 1) < 0 ? ((qIndex - 1) % props.questions.length) + props.questions.length : ((qIndex - 1) % props.questions.length))}>{'<'}</button>
      {getPlayerFromQuestion(props.questions[qIndex]).emoji}
      <Question question={props.questions[qIndex]} player={getPlayerFromQuestion(props.questions[qIndex])}/>
      <button onClick={() => setQIndex((qIndex + 1) % props.questions.length)}>{'>'}</button>
    </main>
    <footer>
      <button onClick={pickQuestion}>
        <span role="img" aria-label="reject">✅</span>
      </button>
    </footer>
 </>}</>)
}

export default PickQuestion;