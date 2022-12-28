import style from './WinView.module.scss'
import {Title} from "../../Components/Title/Title";
import {Button} from "../../Components/Button/Button";
import {useGameContext} from "../../../GameContext/GameContext";
import {GameStateEnum} from "../../../types";

interface WinProps {
}

export const WinView = ({}: WinProps) => {
  const {setGameState} = useGameContext()

  return (
    <div className={style.Win}>
      <Title text={'Congrats ! You won that game !'}/>
      <div className={style.buttons_container}>
        <Button text={'Play again'} onClick={()=>setGameState(GameStateEnum.PLAY)}/>
        <Button text={'Lobby'} onClick={()=>setGameState(GameStateEnum.LOBBY)}/>
      </div>
    </div>
  );
};

/** Created by carlos on 28/12/2022 */