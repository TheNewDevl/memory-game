import {LobbyView} from "./UI/Views/LobbyView/LobbyView";
import {useGameContext} from "./GameContext/GameContext";
import {GameStateEnum} from "./types";
import {GameBoardView} from "./UI/Views/GameBoardView/GameBoardView";
import {GameOverView} from "./UI/Views/GameOverView/GameOverView";
import {WinView} from "./UI/Views/WinView/WinView";
import {useEffect} from "react";
import {getLocalStorage} from "./functions/localStorage";

function App() {
  const {gameState, setGameActions} = useGameContext();
  const {setGameHistory} = setGameActions();
  // Get game history from local storage and set it to the context
  useEffect(() => setGameHistory(getLocalStorage('gameHistory')), []);

  return (
    <main className="Game">
      {gameState.state === GameStateEnum.LOBBY && <LobbyView/>}
      {gameState.state === GameStateEnum.PLAY && <GameBoardView/>}
      {gameState.state === GameStateEnum.GAME_OVER && <GameOverView/>}
      {gameState.state === GameStateEnum.WIN && <WinView/>}
    </main>
  )
}

export default App
