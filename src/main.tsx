import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/GlobalStyles.scss'
import {GameProvider} from "./GameContext/GameContext";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>,
)
