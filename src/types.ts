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