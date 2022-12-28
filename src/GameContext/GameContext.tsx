import {createContext, PropsWithChildren, useContext, useState} from "react";
import {GameStateEnum} from "../types";

interface GameContextProps {
  gameState: GameStateEnum
  setGameState: (gameState: GameStateEnum) => void
}

export const GameContext = createContext({} as GameContextProps)

export const GameProvider = ({children}: PropsWithChildren) => {
  const [gameState, setGameState] = useState<GameStateEnum>(GameStateEnum.GAME_OVER)

  return (
    <GameContext.Provider value={{gameState, setGameState}}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)
/** Created by carlos on 28/12/2022 */