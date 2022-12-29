import style from './GameBoardView.module.scss'
import {Card} from "../../Components/Card/Card";
import {Button} from "../../Components/Button/Button";
import {useGameContext} from "../../../GameContext/GameContext";
import {GameStateEnum} from "../../../types";

interface GameBoardProps {
}

export const GameBoardView = ({}: GameBoardProps) => {
  const {gameState, setGameActions} = useGameContext()
  const {moves, cards} = gameState
  const {setPlayingState} = setGameActions()

  return (
    <div className={style.GameBoard}>
      <div className={style.card_container}>
        {cards && cards.map(({color, id}) => <Card key={id} color={color}/>)}
      </div>
      <div className={style.controls}>
        <p>Available moves: <span className={style.moves}>{moves && moves}</span></p>
        <Button text={'End game'} onClick={() => setPlayingState(GameStateEnum.GAME_OVER)}/>
      </div>
    </div>
  );
};

/** Created by carlos on 28/12/2022 */