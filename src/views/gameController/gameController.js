import React,{ useContext, useEffect, useState } from 'react';
import { GameState, Socket } from '../../contexts';
import LeaveGame from '../../components/leaveGame/leaveGame';
import './gameController.scss';
import ChoosingQuestions from '../../components/chosingQuestions/choosingQuestions';
import Playing from '../../components/playing/playing';
import usePlayer from '../../hooks/usePlayer';

function PlayerScreen(props) {
  const { gameState } = useContext(GameState);
  const { socket, setSocket } = useContext(Socket)
  const { player } = usePlayer();

  // useEffect(() => {
  //   if (!socket) {
  //     const s = new WebSocket("ws://localhost:9000")
  //     s.onopen = () => {
  //       setSocket(s)
  //       s.send(JSON.stringify({action: "GET_GAME_STATE", id: props.match.params.id}))
  //     }
  //   }
  // }, [socket, setSocket, props.match.params.id])


  const sendUsername = (username) => {
    socket.send(JSON.stringify({
      action: "SET_USERNAME", 
      id: gameState.id,
      playerId: player.id,
      username,
    }))
  }

  return (<>{
    player && sessionStorage.getItem('playerId') 
      ? <div className="game-controller">
          <header style={{backgroundColor: player.color || '#fff'}}>
            <h2>
              <span>{gameState.name}</span>
              <LeaveGame />
              <span>
                Game Id: {gameState.id}
              </span>
            </h2>
              <span>
                {player.emoji}
                <input 
                  type="text" 
                  onChange={(e) => sendUsername(e.target.value)} 
                  placeholder={player.username || 'Username'}
                  maxLength="20"
                  autoFocus/>
              </span>
          </header>
          {!gameState.gameStarted
            ? <ChoosingQuestions/>
            : <Playing/>
          }
        </div>
      : <p>Loading or you are not a player in this game...</p>}
    <pre>{ JSON.stringify(gameState, null, "  ") }</pre>
  </>);
}

export default PlayerScreen;
