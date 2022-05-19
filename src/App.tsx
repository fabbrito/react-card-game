import React, { useEffect, useState, Suspense, lazy } from "react";
import Deck, { Card, SUITS, VALUES, CARD_VALUE_MAP } from "./lib/Deck";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Loader from "./components/Loader/Loader";
import Splash from "./components/Splash/Splash";
import HandComponent from "./components/Deck/HandComponent";
import CardComponent from "./components/Deck/CardComponent";
import DeckComponent from "./components/Deck/DeckComponent";
import "./styles/App.scss";

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
  const [splash, setSplash] = useState(true);
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

  /* useEffect(() => {
    setSplash(true);
    setTimeout(() => {
      setSplash(false);
    }, 3000);
  }, []); */

  const sampleHand = [new Card("♦", "J"), new Card("♥", "Q"), new Card("♣", "K"), new Card("♠", "A")];

  return (
    <div className="app">
      <Header />
      <main className="main">
        {/* loading && <Loader /> */}
        {/* {splash && <Loader />} */}
        {/* splash && <Splash spread /> */}

        <div className="inline">
          <DeckComponent player="opponent" deckSize={4} animation="take-one" />
          <HandComponent player="opponent" obfuscate />
        </div>

        <div className="inline">
          <DeckComponent player="player" deckSize={10} animation="take-one" />
          <HandComponent player="player" cards={sampleHand} />
        </div>

        {!splash && !isGameStarted && !isGameCompleted && (
          <Suspense fallback={<Loader />}>
            <ConfigGame startGame={startGame} />
          </Suspense>
        )}
        {!splash && isGameStarted && (
          <Suspense fallback={<Loader />}>
            <Game gameData={gameData ?? { deck: new Deck([]), handSize: 3 }} />
          </Suspense>
        )}
        {!splash && isGameCompleted && <div>Game Completed</div>}
      </main>
    </div>
  );
};

export default App;
