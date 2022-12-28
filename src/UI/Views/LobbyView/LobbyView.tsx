import style from './LobbyView.module.scss'
import React from "react";
import {Button} from "../../Components/Button/Button";
import {Title} from "../../Components/Title/Title";
import {useGameContext} from "../../../GameContext/GameContext";
import {GameStateEnum} from "../../../types";

interface LobbyProps {
}

export const LobbyView = ({}: LobbyProps) => {
  const {setGameState} = useGameContext()
  return (
    <div className={style.Lobby}>
      <Title text={'Memory Game'} />
      <p>Victories : <span className={style.victories}></span></p>
      <Button text={'Jouer'} onClick={()=>setGameState(GameStateEnum.PLAY)}/>
    </div>
  );
};

/** Created by carlos on 28/12/2022 */