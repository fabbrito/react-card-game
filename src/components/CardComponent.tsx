import React, { Fragment } from "react";
import { Card } from "../lib/Deck";
import classNames from "classnames";
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
  middleFlare?: "value" | "suit" | "both" | "none";
  children?: React.ReactNode;
  className?: string;
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
  middleFlare = "suit",
  children,
  className = "",
}) => {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (card == null) return;
    onClick(card);
  };

  // When using scss modules:
  // [styles["deck"], styles[`${player}-deck`], styles[`${clickable ? "clickable" : "not-clickable"}`]].join(" ")
  // [styles["card"], styles[card.cardColor], styles[`${clickable ? "clickable" : "not-clickable"}`]].join(" ")
  return (
    <Fragment>
      {faceDown && (
        <div
          id={id}
          className={classNames(
            "deck",
            { [`${player}-deck`]: player != null },
            { clickable: clickable, "not-clickable": !clickable },
            { [`${size}`]: size != null },
            { disabled: disabled },
            className
          )}
          onClick={handleClick}
        >
          {children}
        </div>
      )}
      {!faceDown && card != null && (
        <div
          id={id}
          className={classNames(
            "card",
            { [`${card.cardColor}`]: card.cardColor != null },
            { clickable: clickable, "not-clickable": !clickable },
            { [`${size}`]: size != null },
            { disabled: disabled },
            className
          )}
          data-card={`${card.suit !== "" ? card.suit : ""}${card.value !== "" ? card.value : ""}`}
          onClick={handleClick}
        >
          {middleFlare === "none" && ""}
          {middleFlare === "suit" && (card.suit !== "" ? card.suit : card.value)}
          {middleFlare === "value" && (card.value !== "" ? card.value : card.suit)}
          {middleFlare === "both" && `${card.value !== "" && card.value}${card.suit !== "" && card.suit}`}
        </div>
      )}
    </Fragment>
  );
};

export default CardComponent;
