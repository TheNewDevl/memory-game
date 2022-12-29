import style from './LobbyView.module.scss'
import React, {ChangeEvent, useState} from "react";
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
  const [nbOfCardsInputValue, setNbOfCardsInputValue] = useState(gameState.numberOfCards)
  const nnOfCardsOptions = Array.from({length: 30}, (_, i) => i * 2)

  const resetGameHistory = () => {
    const gameHistory = {victories: 0, defeats: 0}
    setGameHistory(gameHistory)
    setLocalStorage('gameHistory', gameHistory)
  }

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLSelectElement
    setNbOfCardsInputValue(+target.value);
    setGameActions().setNumberOfCards(+target.value)
  }

  return (
    <div className={style.Lobby}>
      <Title text={'Memory Game'} />
      <form action="">
        <label htmlFor="board-size">
          Board size :
          <select value={nbOfCardsInputValue} onChange={handleChange}  name="board-size" id="board-size">
            {nnOfCardsOptions.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
      </form>
      <div className={style.buttons_container}>
        <Button text={'Jouer'} onClick={()=>setPlayingState(GameStateEnum.PLAY)}/>
        <Button text={'Reset Stats'} onClick={resetGameHistory}/>
      </div>
      <div className={style.buttons_container}>
        <p>Victories : <span className={style.history}>{gameState?.gameHistory?.victories && gameState?.gameHistory?.victories}</span></p>
        <p>Defeats : <span className={style.history}>{gameState?.gameHistory?.defeats && gameState?.gameHistory?.defeats}</span></p>
      </div>
    </div>
  );
};

/** Created by carlos on 28/12/2022 */