import React, {useContext} from 'react'
import { useHistory } from "react-router-dom";
import './leaveGame.scss'
import { Socket, GameState } from '../../contexts'

const LeaveGame = () => {
  const { socket } = useContext(Socket)
  const { setGameState } = useContext(GameState)
  const history = useHistory();

  const onLeave = () => {
    setGameState(null);
    socket.close();
    history.push('/');
  }

  return (
    <div className="leave-game">
      <button onClick={onLeave}>Leave game</button>
    </div>
  )
}

export default LeaveGame;