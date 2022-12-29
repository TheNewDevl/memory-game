import {MouseEvent} from "react";

export enum GameStateEnum {
  LOBBY = 'WAITING_FOR_PLAYERS',
  PLAY = 'PLAY',
  GAME_OVER = 'GAME_OVER',
  WIN = 'WIN',
}

export interface Card {
  color: string;
  id: number;
}

export interface GameHistory {
  victories: number;
  defeats: number;
}

export interface GameState {
  state: GameStateEnum
  cards: Card[],
  moves: number,
  cardsDOM: HTMLButtonElement[],
  selectedCards: HTMLButtonElement[],
  removedCards:HTMLButtonElement[],
  gameHistory: GameHistory,
  numberOfCards: number,
}

export interface GameStateActions {
  setRemovedCards: (el: HTMLButtonElement[]) => void,
  setSelectedCards: (target: HTMLButtonElement) => void,
  setCardsDOM: (cardDOM: HTMLButtonElement) => void,
  setGameHistory: (gameHistory: GameHistory) => void,
  setPlayingState: (gameState: GameStateEnum) => void,
  onSelectCard: (e: MouseEvent) => void,
  resetGame: () => void,
  setCards: (cards: Card[]) => void,
  resetCardsDom: () => void,
  setMoves: (moves: number) => void
  setNumberOfCards: (numberOfCards: number) => void
}