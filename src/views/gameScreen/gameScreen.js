import React,{ useContext, useEffect, useState } from 'react';
import { GameState, Socket } from '../../contexts';
import LeaveGame from '../../components/leaveGame/leaveGame';
import PlayerEmojiUsername from '../../components/playerEmojiUsername/playerEmojiUsername';
import Question from '../../components/question/question';
import './gameScreen.scss';
import GameStarted from '../../components/gameStarted/gameStarted';

function GameScreen(props) {
  console.log(props);
  const { gameState } = useContext(GameState);
  const { socket, setSocket } = useContext(Socket)


  useEffect(() => {
    if (socket) {
      socket.send(JSON.stringify({action: "GET_GAME_STATE", id: props.match.params.id}))
    }
  }, [socket, setSocket, props.match.params.id])

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
          {Object.keys(gameState.players).map((key) => {
            const player = gameState.players[key];
            return (
              <section style={{backgroundColor: player.color}} key={player.color}>
                <div>
                  {player.questions.map((question) => {
                    return <Question question={question} player={player} key={question.question}></Question>
                  })}
                </div>
                <PlayerEmojiUsername player={player}/>
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
