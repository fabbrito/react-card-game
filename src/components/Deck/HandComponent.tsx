import React, { Fragment, useState } from "react";
import classNames from "classnames/bind";
import CardComponent from "./CardComponent";
import { Card } from "../../lib/Deck";
import deckStyles from "./Deck.module.scss";

interface HandProps {
  cards?: Card[];
  player?: "player" | "opponent";
  obfuscate?: boolean;
  numberOfObfuscatedCards?: number;
}

const HandComponent: React.FC<HandProps> = ({ cards, player, obfuscate = false, numberOfObfuscatedCards = 4 }) => {
  const styles = classNames.bind(deckStyles);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  return (
    <Fragment>
      {cards != null && !obfuscate && (
        <div className={styles("hand")}>
          {cards.map((card) => (
            <CardComponent
              id={card.asString}
              key={card.asString}
              card={card}
              player={player}
              onClick={() => {
                if (card == null) return;
                console.log(card);
                if (activeCardId == null || activeCardId !== card.asString) {
                  setActiveCardId(card.asString);
                } else if (activeCardId === card.asString) {
                  setActiveCardId(null);
                }
              }}
              active={activeCardId === card.asString}
            />
          ))}
        </div>
      )}
      {cards == null && obfuscate && (
        <div className={styles("hand")}>
          {/* Sample: [...Array(4).keys()] returns [0, 1, 2, 3] */}
          {[...Array(numberOfObfuscatedCards).keys()].map((number) => {
            const id = `card-${number.toString()}`;
            return (
              <CardComponent
                key={id}
                id={id}
                faceDown
                player={player}
                onClick={() => {
                  console.log(player, id);
                  if (activeCardId == null || activeCardId !== id) {
                    setActiveCardId(id);
                  } else if (activeCardId === id) {
                    setActiveCardId(null);
                  }
                }}
                active={activeCardId === id}
              />
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default HandComponent;
