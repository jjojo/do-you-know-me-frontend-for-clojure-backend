import React, {useContext, useState, useEffect} from 'react'
import { GameState } from '../../../contexts';
import './pickQuestion.scss'
import Question from '../../question/question';
import { SocketContext } from '../../../sockets/socketProvider';

const PickQuestion = (props) => {
  const { player } = props;
  const { gameState } = useContext(GameState);
  const { socket } = useContext(SocketContext)
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
      action: "SET_ACTIVE_QUESTION",
      id: gameState.id,
      question: props.questions[qIndex],
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