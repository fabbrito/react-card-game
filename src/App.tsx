import React, { useEffect, useState, Suspense, lazy } from "react";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Deck, { Card, SUITS, VALUES, CARD_VALUE_MAP } from "./lib/Deck";
import "./styles/App.scss";
import Loader from "./components/Loader/Loader";

// Lazy import of components (code splitting)
const ConfigGame = lazy(() => import("./components/ConfigGame"));
const Game = lazy(() => import("./components/Game"));

type GameConfigs = {
  allowedValues: string[];
  allowedSuits: string[];
  handSize: number;
};
type GameData = { deck: Deck; handSize: number };

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState<Boolean>(false);
  const [isGameCompleted, setIsGameCompleted] = useState<Boolean>(false);
  const [gameData, setGameData] = useState<GameData>();

  const startGame = (gameConfigs: GameConfigs) => {
    // Creates a fresh deck of cards
    const deck = new Deck();
    // Filter out the non allowed card values and suits
    deck.filter(gameConfigs.allowedValues, gameConfigs.allowedSuits);
    // Default shuffle, which performs 5 repetitions of the shuffle algorithm
    deck.shuffle();

    setGameData({ deck, handSize: gameConfigs.handSize });
    setIsGameStarted(true);

    /* setTimeout(() => {
      setLoading(false);
    }, 1000); */
  };

  useEffect(() => {
    console.log(gameData);
  }, [gameData]);

  return (
    <div className="app">
      <Header />
      <main className="main">
        {/* loading && <Loader /> */}
        {!isGameStarted && !isGameCompleted && (
          <Suspense fallback={<Loader />}>
            <ConfigGame startGame={startGame} />
          </Suspense>
        )}
        {isGameStarted && (
          <Suspense fallback={<Loader />}>
            <Game gameData={gameData ?? { deck: new Deck([]), handSize: 3 }} />
          </Suspense>
        )}
        {isGameCompleted && <div>Game Completed</div>}
      </main>
    </div>
  );
};

export default App;
