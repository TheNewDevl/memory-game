import style from './GameBoardView.module.scss'
import {Card} from "../../Components/Card/Card";
import {Button} from "../../Components/Button/Button";
import {useGameContext} from "../../../GameContext/GameContext";
import {GameStateEnum} from "../../../types";

interface GameBoardProps {
}

export const GameBoardView = ({}: GameBoardProps) => {
  const {setGameState, cards} = useGameContext()

  return (
    <div className={style.GameBoard}>
      <div className={style.card_container}>
        {cards && cards.map(({color, id}, i) => <Card key={id} id={id} color={color}/>)}
      </div>
      <div className={style.controls}>
        <Button text={'Lobby'} onClick={() => setGameState(GameStateEnum.LOBBY)}/>
      </div>
    </div>
  );
};

/** Created by carlos on 28/12/2022 */