import style from './E404.module.scss'
import {Title} from "../../Components/Title/Title";
import {Button} from "../../Components/Button/Button";
import {useGameContext} from "../../../GameContext/GameContext";
import {GameStateEnum} from "../../../types";
import {useNavigate} from "react-router-dom";

export const E404 = () => {
  const {setGameActions} = useGameContext()
  const navigate = useNavigate()

  const handleReturnGame = () => {
    const {setPlayingState} = setGameActions()
    setPlayingState(GameStateEnum.LOBBY)
    navigate('/', {replace: true})
  }

  return (
    <div className={style.E404}>
      <Title text={'You seem lost... This page does not exist.'}/>
      <Button text={'Come on, let\'s play'} onClick={handleReturnGame}/>
    </div>
  );
};

/** Created by carlos on 29/12/2022 */