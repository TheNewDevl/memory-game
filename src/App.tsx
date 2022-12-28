import {LobbyView} from "./UI/Views/LobbyView/LobbyView";
import {useGameContext} from "./GameContext/GameContext";
import {GameStateEnum} from "./types";
import {GameBoardView} from "./UI/Views/GameBoardView/GameBoardView";
import {GameOverView} from "./UI/Views/GameOverView/GameOverView";
import {WinView} from "./UI/Views/WinView/WinView";
import {useEffect} from "react";
import {getLocalStorage} from "./functions/localStorage";

function App() {
  const {gameState, setGameHistory} = useGameContext();

  // Get game history from local storage and set it to the context
  useEffect(() => setGameHistory(getLocalStorage('gameHistory')), []);

  return (
    <main className="Game">
      {gameState === GameStateEnum.LOBBY && <LobbyView/>}
      {gameState === GameStateEnum.PLAY && <GameBoardView/>}
      {gameState === GameStateEnum.GAME_OVER && <GameOverView/>}
      {gameState === GameStateEnum.WIN && <WinView/>}
    </main>
  )
}

export default App
