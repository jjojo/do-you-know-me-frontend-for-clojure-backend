import React, {useContext} from 'react'
import PickQuestion from './pick-question/pickQuestion';
import AnswerQuestion from './answer-question/answerQuestion';
import CorrectAnswers from './correct-answers/correctAnswers';
import { GameState } from '../../contexts';
import usePlayer from '../../hooks/usePlayer';
import './playing.scss'

const Playing = () => {
  const { gameState } = useContext(GameState);
  const { player } = usePlayer();

  const focusableQuestions = () => {
    console.log(Object.keys(gameState.players)
    .filter(key => gameState.players[key].id !== player.id))

    return Object.keys(gameState.players)
    .filter(key => gameState.players[key].id !== player.id)
    .map(key => gameState.players[key].questions)
    .filter(q => !q.answered)[0]
  }

  return (<>{ gameState && player && 
    !gameState.activeQuestion
      ? <>{gameState.turn === player.id && focusableQuestions().length > 0
            ? <PickQuestion questions={focusableQuestions()} player={player}/>
            : <>
                <h1>⏳<br/>Waiting for <span>{gameState.players[gameState.turn].emoji} to pick a question</span></h1>
                <footer></footer>
              </>}
        </>
      : <>
      <p>no active question yet</p>
      {
            // gameState.activeQuestion.question.playerId === player.id
            //   ? <CorrectAnswers/>
            //   : <AnswerQuestion/>
          }
        </>}
  </>)
}

export default Playing;