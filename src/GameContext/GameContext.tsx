import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  MouseEvent
} from "react";
import {Card, GameHistory, GameStateEnum} from "../types";
import {createCardList, shuffleCards} from "../functions/cards";
import {getLocalStorage, setLocalStorage} from "../functions/localStorage";

interface GameContextProps {
  gameState: GameStateEnum
  setGameState: (gameState: GameStateEnum) => void
  cards: Card[]
  setSelectedCards: Dispatch<SetStateAction<HTMLButtonElement[]>>
  moves: number
  setMoves: Dispatch<SetStateAction<number>>
  selectedCards: HTMLButtonElement[]
  removedCards: HTMLButtonElement[]
  setCardsDOM: Dispatch<SetStateAction<HTMLButtonElement[]>>
  gameHistory: GameHistory
  setGameHistory: Dispatch<SetStateAction<GameHistory>>
  onSelectCard: (e: MouseEvent) => void
}

export const GameContext = createContext({} as GameContextProps)

export const GameProvider = ({children}: PropsWithChildren) => {
  const [gameState, setGameState] = useState<GameStateEnum>(GameStateEnum.LOBBY)
  const [cards, setCards] = useState<Card[]>([])
  const [cardsDOM, setCardsDOM] = useState<HTMLButtonElement[]>([])
  const [removedCards, setRemovedCards] = useState<HTMLButtonElement[]>([])
  const [selectedCards, setSelectedCards] = useState<HTMLButtonElement[]>([])
  const [moves, setMoves] = useState(0)
  const [gameHistory, setGameHistory] = useState({victories: 0, defeats: 0})


  useEffect(() => {
    const localStorageHistory = getLocalStorage('gameHistory')
    switch (gameState) {
      case GameStateEnum.PLAY:
        const cards = createCardList(4)
        shuffleCards(cards)
        setCards(cards)
        setMoves(cards?.length * 3)
        break
      case GameStateEnum.GAME_OVER:
        setGameHistory(prev => ({...prev, defeats: prev.defeats + 1}))
        setLocalStorage('gameHistory', {...localStorageHistory, defeats: localStorageHistory.defeats + 1})
        resetGame()
        break
      case GameStateEnum.WIN:
        setGameHistory(prev => ({...prev, victories: prev.victories + 1}))
        setLocalStorage('gameHistory', {...localStorageHistory, victories: localStorageHistory.victories + 1})
        resetGame()
        break
    }
  }, [gameState])

  const resetGame = () => {
    setCards([])
    setCardsDOM([])
    setRemovedCards([])
    setSelectedCards([])
    setMoves(0)
  }

  const onSelectCard = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLButtonElement
    if(selectedCards.length < 2){
      setMoves(prev => prev - 1)
      setSelectedCards(prev => [...prev, target])
    }
  }

  useEffect(() => {
    selectedCards[0] && (selectedCards[0].querySelector('div')!.style.transform = 'rotateY(180deg)')
    selectedCards[1] && (selectedCards[1].querySelector('div')!.style.transform = 'rotateY(180deg)')
    if(selectedCards.length === 2){
      setTimeout(() => {
        if(selectedCards[0].dataset.color === selectedCards[1].dataset.color){
            setRemovedCards(prev => [...prev, ...selectedCards])
            selectedCards.map(card => card.style.opacity = '0')
        }
        setSelectedCards([])
        selectedCards.map(card => card.querySelector('div')!.style.transform = 'unset')
      }, 1000)
    }
  }, [selectedCards])

  useEffect(() => {
    if(gameState === GameStateEnum.PLAY && moves === 0) setGameState(GameStateEnum.GAME_OVER)
  }, [moves])

  useEffect(() => {
    if(gameState === GameStateEnum.PLAY && removedCards.length === cards.length) setGameState(GameStateEnum.WIN)
  }, [removedCards])

  return (
    <GameContext.Provider value={{onSelectCard, gameState, setGameState, cards, setSelectedCards, moves, setMoves, selectedCards, removedCards, setCardsDOM, gameHistory, setGameHistory }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)
/** Created by carlos on 28/12/2022 */