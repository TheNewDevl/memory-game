import style from './Card.module.scss'
import {useEffect, useState} from "react";

interface CardProps {
  id: number
  color: string
}

export const Card = ({id, color}: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    if(isFlipped) {
      setTimeout(() => setIsFlipped(false), 1000)
    }
  }, [isFlipped])

  return (
    <button onClick={() => setIsFlipped(!isFlipped)}  className={style.Card}>
      <div style={{transform : isFlipped ? 'rotateY(180deg)' : "unset"}} className={style.inner}>
        <div className={style.back}></div>
        <div style={{backgroundColor: color}} className={style.front}></div>
      </div>
    </button>
  );
};

/** Created by carlos on 28/12/2022 */