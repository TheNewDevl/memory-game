import style from './GameOverView.module.scss'
import {Title} from "../../Components/Title/Title";
import {Button} from "../../Components/Button/Button";
import {useGameContext} from "../../../GameContext/GameContext";
import {GameStateEnum} from "../../../types";

interface GameOverViewProps {
}

export const GameOverView = ({}: GameOverViewProps) => {
  const {setGameActions} = useGameContext()
  const {setPlayingState} = setGameActions()
  return (
    <div className={style.GameOverView}>
      <Title text={'GAME OVER'}/>
      <div className={style.buttons_container}>
        <Button text={'Play again'} onClick={() => setPlayingState(GameStateEnum.PLAY)} />
        <Button text={'Lobby'} onClick={() => setPlayingState(GameStateEnum.LOBBY)} />
      </div>
    </div>
  );
};

/** Created by carlos on 28/12/2022 */