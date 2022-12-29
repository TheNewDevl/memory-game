import style from './Card.module.scss'
import { useEffect, useRef} from "react";
import {useGameContext} from "../../../GameContext/GameContext";

interface CardProps {
  color: string,
}

export const Card = ({color}: CardProps) => {
  const cardRef = useRef<HTMLButtonElement>(null)
  const {gameState, setGameActions} = useGameContext()
  const {onSelectCard, setCardsDOM, resetCardsDom} = setGameActions()
  const {selectedCards, removedCards} = gameState

  useEffect(() => {
    setCardsDOM(cardRef.current!)
    return () => resetCardsDom()
  }, [])

  return (
    <button
      ref={cardRef}
      disabled={selectedCards.length >= 2 || removedCards.includes(cardRef.current!) || selectedCards.includes(cardRef.current!)}
      data-color={color}
      onClick={onSelectCard}
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