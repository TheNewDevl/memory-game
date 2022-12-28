import {Card} from "../types";

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const colors: string[] = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'black', 'white'];

export const createCardList = (numberOfCards: number): Card[] => {
  if(numberOfCards % 2 !== 0) {
    throw new Error('Number of cards must be even');
  }
  const cardList = []
  for (let i = 0; i < numberOfCards; i += 2) {
    const color = colors[getRandomInt(0, colors.length - 1)]
    cardList.push({ color, id: i })
    cardList.push({ color, id: i + 1 })
  }
  return cardList
}

export const shuffleCards = (cards: Card[]): void => {
  if(!cards.length || cards.length <= 1) return
  for (let i = cards.length - 1; i > 0; i--) {
    const j: number = getRandomInt(0, i);
    [cards[i], cards[j]] = [cards[j], cards[i]]
  }
}