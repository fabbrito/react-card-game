import React, { useState } from "react";
import { Card, SUITS, VALUES, CARD_VALUE_MAP } from "../lib/Deck";
import Layout from "./Layout";
import CardComponent from "./CardComponent";
import "../styles/ConfigGame.scss";

export type GameConfigs = {
  allowedValues: string[];
  allowedSuits: string[];
  handSize: number;
};

interface Props {
  children?: React.ReactNode;
  startGame?: (gameConfigs: GameConfigs) => void;
}

const sortCardArrayByValues = (items: string[]): string[] => {
  return items.sort((a: string, b: string) => {
    return CARD_VALUE_MAP[a] - CARD_VALUE_MAP[b];
  });
};

const ConfigGame: React.FC<Props> = ({ children, startGame = () => {} }) => {
  const [gameConfigs, setGameConfigs] = useState<GameConfigs>({
    allowedValues: [...VALUES].splice(5, 13),
    allowedSuits: SUITS,
    handSize: 3,
  });

  const inputNumberHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setGameConfigs({ ...gameConfigs, handSize: Number(event.target.value) });
  };

  const startGameHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    startGame(gameConfigs);
  };

  // Handles the selection of allowed card values
  const cardValueSelectionHandler = (card: Card) => {
    let values: string[] = [];
    // If not present, appends the selected card VALUE to allowedValues array
    if (!gameConfigs.allowedValues.includes(card.value)) values = [...gameConfigs.allowedValues, card.value];
    // Prevents the user from removing the remaining non-disabled card VALUE
    else if (gameConfigs.allowedValues.length === 1) return;
    // Filter out the selected card VALUE from allowedValues
    else if (gameConfigs.allowedValues.includes(card.value))
      values = gameConfigs.allowedValues.filter((value: string) => value !== card.value);
    else return;

    setGameConfigs({ ...gameConfigs, allowedValues: sortCardArrayByValues(values) });
  };

  // Handles the selection of allowed card suits
  const cardSuitSelectionHandler = (card: Card) => {
    let suits: string[] = [];
    // If not present, appends the selected card SUIT to allowedSuits array
    if (!gameConfigs.allowedSuits.includes(card.suit)) suits = [...gameConfigs.allowedSuits, card.suit];
    // Prevents the user from removing the remaining non-disabled card suit
    else if (gameConfigs.allowedSuits.length === 1) return;
    // Filter out the selected card suit from allowedSuits
    else if (gameConfigs.allowedSuits.includes(card.suit))
      suits = gameConfigs.allowedSuits.filter((suit: string) => suit !== card.suit);
    else return;

    setGameConfigs({ ...gameConfigs, allowedSuits: suits });
  };

  // DEBUG ONLY
  /* useEffect(() => {
    console.log(gameConfigs.allowedValues, gameConfigs.allowedSuits, gameConfigs.handSize);
  }, [gameConfigs]); */

  return (
    <Layout className="game-config">
      <div className="game-config-header">
        <h2>Configuration</h2>
        <button className="btn" onClick={startGameHandler}>
          Start Game
        </button>
      </div>
      <div className="value-selection">
        <h3>Select/Deselect allowed Card Ranks</h3>
        <div className="map">
          {VALUES.map((value) => {
            const card = new Card("", value);
            return (
              <CardComponent
                key={card.compactNotation}
                id={card.compactNotation}
                card={card}
                size="small"
                clickable
                onClick={cardValueSelectionHandler}
                disabled={!gameConfigs.allowedValues.includes(value)}
              />
            );
          })}
        </div>
      </div>
      <div className="suit-selection">
        <h3>Select/Deselect allowed Card Suits:</h3>
        <div className="map">
          {SUITS.map((suit) => {
            const card = new Card(suit, "");
            return (
              <CardComponent
                key={card.compactNotation}
                id={card.compactNotation}
                card={card}
                size="small"
                clickable
                onClick={cardSuitSelectionHandler}
                disabled={!gameConfigs.allowedSuits.includes(suit)}
              />
            );
          })}
        </div>
      </div>
      <div className="hand-size-selection">
        <h3>Hand size:</h3>
        <input
          type="number"
          name="Hand size"
          defaultValue={3}
          min={2}
          max={5}
          className="input-number"
          onChange={inputNumberHandler}
        />
      </div>
      {/* <div className="start-game">
        <button className="btn" onClick={startGameHandler}>
          Start Game
        </button>
      </div> */}
    </Layout>
  );
};

export default ConfigGame;
