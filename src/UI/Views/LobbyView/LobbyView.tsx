import style from './LobbyView.module.scss'
import React from "react";
import {Button} from "../../Components/Button/Button";
import {Title} from "../../Components/Title/Title";
import {useGameContext} from "../../../GameContext/GameContext";
import {GameStateEnum} from "../../../types";
import {setLocalStorage} from "../../../functions/localStorage";

interface LobbyProps {
}

export const LobbyView = ({}: LobbyProps) => {
  const {gameState, setGameActions} = useGameContext()
  const {setGameHistory, setPlayingState} = setGameActions()

  const resetGameHistory = () => {
    const gameHistory = {victories: 0, defeats: 0}
    setGameHistory(gameHistory)
    setLocalStorage('gameHistory', gameHistory)
  }

  return (
    <div className={style.Lobby}>
      <Title text={'Memory Game'} />
      <div className={style.buttons_container}>
        <p>Victories : <span className={style.history}>{gameState?.gameHistory?.victories && gameState?.gameHistory?.victories}</span></p>
        <p>Defeats : <span className={style.history}>{gameState?.gameHistory?.defeats && gameState?.gameHistory?.defeats}</span></p>
      </div>

      <div className={style.buttons_container}>
        <Button text={'Jouer'} onClick={()=>setPlayingState(GameStateEnum.PLAY)}/>
        <Button text={'Reset Stats'} onClick={resetGameHistory}/>
      </div>
    </div>
  );
};

/** Created by carlos on 28/12/2022 */