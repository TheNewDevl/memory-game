import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {Card, GameStateEnum} from "../types";
import {createCardList, shuffleCards} from "../functions/cards";

interface GameContextProps {
  gameState: GameStateEnum
  setGameState: (gameState: GameStateEnum) => void
  cards: Card[]
}

export const GameContext = createContext({} as GameContextProps)

export const GameProvider = ({children}: PropsWithChildren) => {
  const [gameState, setGameState] = useState<GameStateEnum>(GameStateEnum.LOBBY)
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    switch (gameState) {
      case GameStateEnum.PLAY:
        console.log('gameState', gameState)
        const cards = createCardList(12)
        shuffleCards(cards)
        setCards(cards)
        break
      case GameStateEnum.GAME_OVER:
        console.log('gameState', gameState)
        setCards([])
        break
    }
  }, [gameState])

  return (
    <GameContext.Provider value={{gameState, setGameState, cards}}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)
/** Created by carlos on 28/12/2022 */