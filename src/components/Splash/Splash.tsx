import React from "react";
import classNames from "classnames/bind";
import styles from "./Splash.module.scss";
import { Card } from "../../lib/Deck";

let cx = classNames.bind(styles);

interface Props {
  spread?: boolean;
  animate?: string;
}

const Splash: React.FC<Props> = ({ spread = false, animate }) => {
  const cards = [new Card("♦", "A"), new Card("♥", "A"), new Card("♣", "A"), new Card("♠", "A")];
  return (
    <div
      className={cx(
        "hand",
        { spread: spread },
        { animate: !spread && animate != null },
        { forward: !spread && animate === "forward" },
        { infinite: !spread && animate === "infinite" }
      )}
    >
      {cards.map((card) => {
        return (
          <div
            key={card.asString}
            id={card.asString}
            className={cx("card", { [`${card.cardColor}`]: card.cardColor != null })}
            data-card={card.asString}
          >
            <p>{card.suit}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Splash;
