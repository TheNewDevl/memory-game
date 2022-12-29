import style from './LobbyView.module.scss'
import React, {ChangeEvent, useState} from "react";
import {Button} from "../../Components/Button/Button";
import {Title} from "../../Components/Title/Title";
import {useGameContext} from "../../../GameContext/GameContext";
import {DifficultyEnum, GameStateEnum} from "../../../types";
import {setLocalStorage} from "../../../functions/localStorage";

interface LobbyProps {
}

export const LobbyView = ({}: LobbyProps) => {
  const {gameState, setGameActions} = useGameContext()
  const {setGameHistory, setPlayingState} = setGameActions()
  const [nbOfCardsInputValue, setNbOfCardsInputValue] = useState(gameState.numberOfCards)
  const [difficultyInputValue, setDifficultyInputValue] = useState(gameState.difficulty)
  const nnOfCardsOptions = Array.from({length: 30}, (_, i) => i>1 ? i * 2:null).filter(n => n!==null) as number[]

  const resetGameHistory = () => {
    const gameHistory = {victories: 0, defeats: 0}
    setGameHistory(gameHistory)
    setLocalStorage('gameHistory', gameHistory)
  }

  const handleBoardChange = (e: ChangeEvent) => {
    const target = e.target as HTMLSelectElement
    setNbOfCardsInputValue(+target.value);
    setGameActions().setNumberOfCards(+target.value)
  }

  const handleDifficultyChange = (e: ChangeEvent) => {
    const target = e.target as HTMLSelectElement
    setDifficultyInputValue(target.value as DifficultyEnum);
    setGameActions().setGameDifficulty(target.value as DifficultyEnum)
  }

  return (
    <div className={style.Lobby}>
      <Title text={'Memory Game'} />
      <form action="">
        <label htmlFor="board-size">
          <span>Board size</span> : (cards)
          <select value={nbOfCardsInputValue} onChange={handleBoardChange}  name="board-size" id="board-size">
            {nnOfCardsOptions.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label htmlFor="difficulty">
          <span>Difficulty</span> : (moves)
          <select value={difficultyInputValue} onChange={handleDifficultyChange}  name="difficulty" id="difficulty">
            <option value={DifficultyEnum.EASY}>{DifficultyEnum.EASY}</option>
            <option value={DifficultyEnum.MEDIUM}>{DifficultyEnum.MEDIUM}</option>
            <option value={DifficultyEnum.HARD}>{DifficultyEnum.HARD}</option>
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