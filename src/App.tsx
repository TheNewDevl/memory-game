import {LobbyView} from "./UI/Views/LobbyView/LobbyView";
import {useGameContext} from "./GameContext/GameContext";
import {GameStateEnum} from "./types";
import {GameBoardView} from "./UI/Views/GameBoardView/GameBoardView";
import {GameOverView} from "./UI/Views/GameOverView/GameOverView";
import {WinView} from "./UI/Views/WinView/WinView";
import {useEffect} from "react";
import {getLocalStorage} from "./functions/localStorage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {E404} from "./UI/Views/E404/E404";

function App() {
  const {gameState, setGameActions} = useGameContext();
  const {setGameHistory} = setGameActions();
  // Get game history from local storage and set it to the context
  useEffect(() => setGameHistory(getLocalStorage('gameHistory')), []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<main className="Game">
          {gameState.state === GameStateEnum.LOBBY && <LobbyView/>}
          {gameState.state === GameStateEnum.PLAY && <GameBoardView/>}
          {gameState.state === GameStateEnum.GAME_OVER && <GameOverView/>}
          {gameState.state === GameStateEnum.WIN && <WinView/>}
        </main>}/>
        <Route path='*' element={<E404/>}/>
      </Routes>

    </BrowserRouter>
  )
}

export default App
