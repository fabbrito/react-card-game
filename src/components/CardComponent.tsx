import React, { Fragment } from "react";
import { Card } from "../lib/Deck";
import "../styles/CardComponent.scss";

interface Props {
  id?: string;
  player?: string;
  faceDown?: boolean;
  card?: Card;
  clickable?: boolean;
  onClick?: (card: Card) => void;
  size?: "small" | "normal" | "large";
  disabled?: boolean;
  children?: React.ReactNode;
}

const CardComponent: React.FC<Props> = ({
  id,
  player,
  card,
  faceDown = false,
  clickable = false,
  onClick = () => {},
  size,
  disabled = false,
  children,
}) => {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (card == null) return;
    onClick(card);
  };

  const commonClassName = `${clickable ? "clickable" : "not-clickable"} ${size != null && size} ${
    disabled ? "disabled" : ""
  }`;

  // When using scss modules:
  // [styles["deck"], styles[`${player}-deck`], styles[`${clickable ? "clickable" : "not-clickable"}`]].join(" ")
  // [styles["card"], styles[card.cardColor], styles[`${clickable ? "clickable" : "not-clickable"}`]].join(" ")
  return (
    <Fragment>
      {faceDown && (
        <div
          id={id}
          className={`deck ${player != null && [player, "-deck"].join("")} ${commonClassName}`}
          onClick={handleClick}
        >
          {children}
        </div>
      )}
      {!faceDown && card != null && (
        <div
          id={id}
          className={`card ${card.cardColor} ${commonClassName}`}
          data-card={`${card.suit !== "" ? card.suit : ""}${card.value !== "" ? card.value : ""}`}
          onClick={handleClick}
        >
          {card.suit !== "" ? card.suit : card.value}
        </div>
      )}
    </Fragment>
  );
};

export default CardComponent;
