import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
  MouseEvent
} from "react";
import {Card, GameHistory, GameState, GameStateActions, GameStateEnum} from "../types";
import {createCardList, shuffleCards} from "../functions/cards";
import {setLocalStorage} from "../functions/localStorage";
interface GameContextProps {
  gameState: GameState
  setGameActions: () => GameStateActions
}

export const GameContext = createContext({} as GameContextProps)

const initialState: GameState = {
  state: GameStateEnum.LOBBY,
  cards: [],
  moves: 0,
  cardsDOM: [],
  selectedCards: [],
  removedCards: [],
  gameHistory: {victories: 0, defeats: 0}
}

export const GameProvider = ({children}: PropsWithChildren) => {
  // Game state
  const [gameState, setGameState] = useState(initialState)
  // Game actions
  const resetGame = () => (setCards([]), resetCardsDom(), setRemovedCards([]), resetSelectedCards(), setMoves(0))
  const setGameHistory = (gameHistory: GameHistory) => setGameState(prev => ({...prev, gameHistory}))
  const setMoves = (moves: number) => setGameState(prev => ({...prev, moves}))
  const setSelectedCards = (target: HTMLButtonElement) => setGameState(prev => ({...prev, selectedCards: [...prev.selectedCards, target]}))
  const setRemovedCards = (el: HTMLButtonElement[]) => setGameState(prev => ({...prev, removedCards: [...prev.removedCards, ...el]}))
  const setPlayingState = (gameState: GameStateEnum) => setGameState(prev => ({...prev, state: gameState}))
  const setCards = (cards: Card[]) => setGameState(prev => ({...prev, cards}))
  const setCardsDOM = (cardDOM: HTMLButtonElement) => setGameState(prev => ({...prev, cardsDOM: [...prev.cardsDOM, cardDOM]}))
  const resetCardsDom = () => setGameState(prev => ({...prev, cardsDOM: []}))
  const resetSelectedCards = () => setGameState(prev => ({...prev, selectedCards: []}))
  const onSelectCard = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLButtonElement
    if(gameState.selectedCards.length < 2){
      setSelectedCards(target)
      setMoves(gameState.moves - 1)
    }
  }
  // Return game actions functions to be used in the components
  const setGameActions = () => ({resetGame, resetCardsDom, setGameHistory, setMoves, setSelectedCards, setRemovedCards, setPlayingState, setCards, setCardsDOM, onSelectCard })

  useEffect(() => {
    switch (gameState.state) {
      case GameStateEnum.PLAY:
        //When the game is set to PLAY state, we create the cards list, shuffle them and set the amount of moves
        const cards = createCardList(4)
        shuffleCards(cards)
        setCards(cards)
        setMoves(cards.length * 3)
        break
      case GameStateEnum.GAME_OVER:
        // When the game is set to GAME_OVER state, we save the game history to local storage and reset cards and moves
        setLocalStorage('gameHistory', {...gameState.gameHistory, defeats: gameState.gameHistory.defeats + 1})
        setGameHistory({ ...gameState.gameHistory, defeats: gameState.gameHistory.defeats + 1})
        resetGame()
        break
      case GameStateEnum.WIN:
        // When the game is set to WIN state, we save the game history to local storage and reset cards and moves
        setLocalStorage('gameHistory', {...gameState.gameHistory, victories: gameState.gameHistory.victories + 1})
        setGameHistory({ ...gameState.gameHistory, victories: gameState.gameHistory.victories + 1})
        resetGame()
        break
    }
  }, [gameState.state])

  useEffect(() => {
    gameState.selectedCards[0] && (gameState.selectedCards[0].querySelector('div')!.style.transform = 'rotateY(180deg)')
    gameState.selectedCards[1] && (gameState.selectedCards[1].querySelector('div')!.style.transform = 'rotateY(180deg)')
    if(gameState.selectedCards.length === 2){
      setTimeout(() => {
        if(gameState?.selectedCards[0].dataset.color === gameState?.selectedCards[1].dataset.color){
          setRemovedCards(gameState.selectedCards)
            gameState.selectedCards.map(card => card.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out')
            gameState.selectedCards.map(card => card.style.transform = 'scale(0)')
            gameState.selectedCards.map(card => card.style.opacity = '0')
        }
        resetSelectedCards()
        gameState.selectedCards.map(card => card.querySelector('div')!.style.transform = 'unset')
      }, 1000)
    }
  }, [gameState.selectedCards])

  useEffect(() => {
    if(gameState.state === GameStateEnum.PLAY && gameState.moves === 0) setPlayingState(GameStateEnum.GAME_OVER)
  }, [gameState.moves])

  useEffect(() => {
    if(gameState.state === GameStateEnum.PLAY && gameState.removedCards.length === gameState.cards.length) setPlayingState(GameStateEnum.WIN)
  }, [gameState.removedCards])

  return (
    <GameContext.Provider value={{gameState, setGameActions }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)
/** Created by carlos on 28/12/2022 */