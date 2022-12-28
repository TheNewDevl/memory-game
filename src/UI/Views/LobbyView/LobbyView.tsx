import style from './LobbyView.module.scss'
import React from "react";
import {Button} from "../../Components/Button/Button";
import {Title} from "../../Components/Title/Title";
import {useGameContext} from "../../../GameContext/GameContext";
import {GameStateEnum} from "../../../types";

interface LobbyProps {
}

export const LobbyView = ({}: LobbyProps) => {
  const {setGameState, gameHistory} = useGameContext()
  return (
    <div className={style.Lobby}>
      <Title text={'Memory Game'} />
      <div>
        <p>Victories : <span className={style.victories}>{gameHistory?.victories && gameHistory?.victories}</span></p>
        <p>Defeats : <span className={style.victories}>{gameHistory?.defeats && gameHistory?.defeats}</span></p>
      </div>
      <Button text={'Jouer'} onClick={()=>setGameState(GameStateEnum.PLAY)}/>
    </div>
  );
};

/** Created by carlos on 28/12/2022 */