import {LobbyView} from "./UI/Views/LobbyView/LobbyView";
import {useGameContext} from "./GameContext/GameContext";
import {GameStateEnum} from "./types";
import {GameBoardView} from "./UI/Views/GameBoardView/GameBoardView";
import {GameOverView} from "./UI/Views/GameOverView/GameOverView";
import {WinView} from "./UI/Views/WinView/WinView";

function App() {
  const {gameState} = useGameContext();

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
