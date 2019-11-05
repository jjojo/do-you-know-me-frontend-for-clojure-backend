import React,{ useContext, useEffect, useState } from 'react';
import { GameState, Socket } from '../../contexts';
import LeaveGame from '../../components/leaveGame/leaveGame';
import PlayerEmojiUsername from '../../components/playerEmojiUsername/playerEmojiUsername';
import Question from '../../components/question/question';
import './gameScreen.scss';
import GameStarted from '../../components/gameStarted/gameStarted';
import QuestionPopUp from '../../components/questionPopUp/questionPopUp';
//import { SocketContext } from '../../sockets/socketProvider';

function GameScreen(props) {
  console.log(props);
  const { gameState } = useContext(GameState);
  //const { socket } = useContext(SocketContext)


  useEffect(() => {
    if (gameState) sessionStorage.setItem('gameId', gameState.id)
  }, [gameState])

  const fullScreen = () => {
    document.getElementsByClassName("game-screen")[0].requestFullscreen();
  }

  return (<>{ gameState 
    ? <div className={"game-screen"}>
        <header>
          <h1> 
            <LeaveGame/>
          </h1>
          <h3>Game code: {gameState.id}</h3>
          <button onClick={fullScreen}>fullscreen</button>
        </header>

        <main>
          { gameState.activeQuestion && <QuestionPopUp/>}
          {Object.keys(gameState.players).map((key) => {
            const player = gameState.players[key];
            return (
              <section style={{backgroundColor: player.color}} key={player.color}>
                <div>
                  {Object.keys(player.questions).map((key) => {
                    return <Question question={player.questions[key]} player={player} key={player.questions[key].question}></Question>
                  })}
                </div>
                <PlayerEmojiUsername player={player}/>
                <span>{player.points}</span>
              </section>
            )
          })}
          {gameState.gameStarted && <GameStarted/>}
        </main>

        <pre>{ JSON.stringify(gameState, null, "  ") }</pre>
      </div>
      : <p>Loading game...</p>
  }</>);
}

export default GameScreen;
