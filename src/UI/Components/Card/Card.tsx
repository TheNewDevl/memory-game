import style from './Card.module.scss'
import {useEffect, useRef} from "react";
import {useGameContext} from "../../../GameContext/GameContext";

interface CardProps {
  color: string,
}

export const Card = ({color}: CardProps) => {
  const cardRef = useRef<HTMLButtonElement>(null)
  const {setSelectedCards, selectedCards, removedCards, setCardsDOM, setMoves} = useGameContext()


  useEffect(() => {
    setCardsDOM(prev => [...prev, cardRef.current!])
    return () => setCardsDOM([])
  }, [])

  const handleClick = () => {
    if(selectedCards.length < 2){
      setMoves(prev => prev - 1)
      setSelectedCards(prev => [...prev, cardRef.current!])
    }
  }

  return (
    <button
      ref={cardRef}
      disabled={selectedCards.length >= 2 || removedCards.includes(cardRef.current!) || selectedCards.includes(cardRef.current!)}
      data-color={color}
      onClick={handleClick}
      className={style.Card}
    >
      <div className={style.inner}>
        <div className={style.back}></div>
        <div style={{backgroundColor: color}} className={style.front}></div>
      </div>
    </button>
  );
};

/** Created by carlos on 28/12/2022 */