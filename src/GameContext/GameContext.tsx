import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
  MouseEvent
} from "react";
import {Card, DifficultyEnum, GameHistory, GameState, GameStateActions, GameStateEnum} from "../types";
import {createCardList, shuffleCards} from "../functions/cards";
import {setLocalStorage} from "../functions/localStorage";
import {flipSelectedCards, hideWinningCards, unFlipSelectedCards} from "../functions/classes";
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
  gameHistory: {victories: 0, defeats: 0},
  numberOfCards:30,
  difficulty: DifficultyEnum.EASY
}

export const GameProvider = ({children}: PropsWithChildren) => {
  // Game state
  const [gameState, setGameState] = useState(initialState)
  // Game actions
  const resetGame = () => (setCards([]), resetCardsDom(), resetRemovedCards(), resetSelectedCards(), setMoves(0))
  const setGameHistory = (gameHistory: GameHistory) => setGameState(prev => ({...prev, gameHistory}))
  const setMoves = (moves: number) => setGameState(prev => ({...prev, moves}))
  const setSelectedCards = (target: HTMLButtonElement) => setGameState(prev => ({...prev, selectedCards: [...prev.selectedCards, target]}))
  const setRemovedCards = (el: HTMLButtonElement[]) => setGameState(prev => ({...prev, removedCards: [...prev.removedCards, ...el]}))
  const resetRemovedCards = () => setGameState(prev => ({...prev, removedCards: []}))
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
  const setNumberOfCards = (numberOfCards: number) => setGameState(prev => ({...prev, numberOfCards}))
  const setGameDifficulty = (difficulty: DifficultyEnum) => setGameState(prev => ({...prev, difficulty}))
  // Return game actions functions to be used in the components
  const setGameActions = () => ({setNumberOfCards, resetGame, setGameDifficulty, resetCardsDom, setGameHistory, setMoves, setSelectedCards, setRemovedCards, setPlayingState, setCards, setCardsDOM, onSelectCard })

  useEffect(() => {
    switch (gameState.state) {
      case GameStateEnum.PLAY:
        //When the game is set to PLAY state, we create the cards list, shuffle them and set the amount of moves
        const cards = createCardList(gameState.numberOfCards)
        shuffleCards(cards)
        setCards(cards)
        // Set the amount of moves depending on the difficulty. easy, medium, hard
        const movesFactor = gameState.difficulty === DifficultyEnum.EASY ? 3 : gameState.difficulty === DifficultyEnum.MEDIUM ? 2 : 1.5
        setMoves(cards.length * movesFactor)
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
    const {selectedCards} = gameState
    // Every time a card is selected, we flip it
    flipSelectedCards(selectedCards)
    // When 2 cards are selected, we check if color is the same
    if(selectedCards.length === 2){
      // Prevent the user from clicking too fast
      setTimeout(() => {
        if(selectedCards[0].dataset.color === selectedCards[1].dataset.color){
          // If the color is the same, we hide the cards
          setRemovedCards(selectedCards)
          hideWinningCards(selectedCards)
        }
        // If the color is not the same, we unflip the cards and reset the selected cards
        resetSelectedCards()
        unFlipSelectedCards(selectedCards)
      }, 800)
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