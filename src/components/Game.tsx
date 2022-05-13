import React, { useEffect, useState } from "react";
import Deck, { Card } from "../lib/Deck";
import { v4 as uuidv4 } from "uuid";
import CardComponent from "./CardComponent";
import "../styles/Game.scss";

interface Props {
  children?: React.ReactNode;
  gameData: { deck: Deck; handSize: number };
}

type GameState = {
  macroState: string;
  microState?: string;
};

const Game: React.FC<Props> = ({ children, gameData }) => {
  const { deck, handSize } = gameData;

  const [gameState, setGamestate] = useState<GameState>({ macroState: "preGame" });
  const [playerDeck, setPlayerDeck] = useState<Deck>();
  const [computerDeck, setComputerDeck] = useState<Deck>();
  const [playerCards, setPlayerCards] = useState<Card[]>();
  const [computerCard, setComputerCard] = useState<Card>();
  const [inRound, setInRound] = useState<boolean>(false);
  const [inGame, setInGame] = useState<boolean>(false);

  const handleGameState = (state: GameState) => {
    if (state == null) return;
    if (state.macroState === "preGame") {
      setInGame(true);

      // Start the game with the createGame state
      setGamestate({ macroState: "inGame", microState: "createGame" });
    } else if (state.macroState === "inGame" && state.microState === "createGame") {
      // Create new fresh deck the shuffle it
      const gameDeck = deck;

      // Half of the shuffled deck to each player
      setPlayerDeck(new Deck(gameDeck.cards.slice(0, gameDeck.middlePoint)));
      setComputerDeck(new Deck(gameDeck.cards.slice(gameDeck.middlePoint, gameDeck.size)));

      // Advance game state
      setGamestate({ ...gameState, microState: "dealCards" });
    } else if (state.macroState === "inGame" && state.microState === "dealCards") {
      if (playerDeck == null) return;
      if (computerDeck == null) return;

      setPlayerCards([playerDeck.pop(), playerDeck.pop(), playerDeck.pop()]);
      setPlayerDeck(playerDeck);

      setComputerCard(computerDeck.pop());
      setComputerDeck(computerDeck);
    } else if (state.macroState === "inGame" && state.microState === "flipCards") {
    } else if (state.macroState === "inGame" && state.microState === "checkWinner") {
    } else if (state.macroState === "postGame") {
      // show score
    } else {
      //wait
    }
  };

  useEffect(() => {
    handleGameState(gameState);
  }, [gameState]);

  /*   useEffect(() => {
    console.log("each change:", playerDeck);
  }, [playerDeck]); */

  return (
    <div className="game">
      <div className="deck-slots">
        <CardComponent player="computer" faceDown>
          {computerDeck?.size}
        </CardComponent>
        <CardComponent player="player" faceDown>
          {playerDeck?.size}
        </CardComponent>
      </div>

      <div className="card-slots">
        <div className="computer">
          <CardComponent player="computer" card={computerCard} />
        </div>
        <div className="player">
          {playerCards?.map((card) => (
            <CardComponent
              player="player"
              key={uuidv4()}
              card={card}
              clickable
              onClick={(card) => console.log(card)}
            ></CardComponent>
          ))}
        </div>
      </div>

      {/* <div className={styles["score"]} />
      <div className={styles["opponent"]}>
        <div className={`${styles["deck"]} ${styles["opponent-deck"]}`} />
        <div className={`${styles["card-slot"]} ${styles["opponent-card-slot"]}`} />
      </div> */}
      {/* {gameDeck.compactNotation.map((card) => {
        return <div key={uuidv4()}>{card}</div>;
      })} */}
      {children}
    </div>
  );
};

export default Game;
