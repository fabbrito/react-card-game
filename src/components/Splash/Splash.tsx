import React from "react";
import classNames from "classnames";
import styles from "./Splash.module.scss";
import CardComponent from "../CardComponent";
import { Card } from "../../lib/Deck";

interface Props {}

const Splash: React.FC<Props> = () => {
  const cards = [new Card("♦", "A"), new Card("♥", "A"), new Card("♣", "A"), new Card("♠", "A")];
  return (
    <div className={classNames(styles["hand"], styles["animate"], styles["forward"])}>
      {cards.map((card) => {
        return (
          <div
            key={card.compactNotation}
            id={card.compactNotation}
            className={classNames(styles["card"], styles[`${card.cardColor}`])}
            data-card={card.compactNotation}
          >
            <p>{card.suit}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Splash;
