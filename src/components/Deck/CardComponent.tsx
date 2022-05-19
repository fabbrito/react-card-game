import React, { Fragment } from "react";
import classNames from "classnames/bind";
import deckStyles from "./Deck.module.scss";
import { Card } from "../../lib/Deck";
import { v4 as uuidv4 } from "uuid";

interface Props {
  id?: string;
  active?: boolean;
  card?: Card;
  // Type checking with type variables <P, R>(...params: P[]) => R;
  // onClick?: (card: Card) => void;
  // onFaceDownClick?: (player: string, id: string) => void;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
  removeShadow?: boolean;
  faceDown?: boolean;
  player?: "player" | "opponent";
  info?: string;
  animation?: "rotation" | "take-one";
  className?: string;
}

const CardComponent: React.FC<Props> = ({
  id,
  active = false,
  card,
  onClick,
  disabled,
  removeShadow = false,
  faceDown,
  player,
  info,
  animation,
  className,
}) => {
  // It binds the modular scss description to a function that returns a "TSX className" compatible string
  const styles = classNames.bind(deckStyles);

  // const clickHandler: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement> = (event) => {
  //   if (card != null && onClick != null) onClick(card);
  //   if (player != null && id != null && onFaceDownClick != null) onFaceDownClick(player, id);
  // };

  return (
    <Fragment>
      <div
        id={id ?? card?.asString ?? uuidv4()}
        // If the argument of styles() is an Object, controls if the class is allowed or not.
        // The key of this object is the name of the class and the value is the control variable (boolean)
        className={styles(
          "card",
          // Keeps animation state by applying the active class
          { active: active },
          // Cleans up ::before and ::after
          { "face-down": faceDown },
          // Adds the "player" or "opponent" class. Must be utilized
          { [`${player}`]: faceDown && player != null },
          // Default color behavior: black. The "red" class overwrite the color property
          { [card?.cardColor ?? "none"]: card != null },
          // Changes the cursor to pointer or back to normal cursor
          { clickable: onClick != null },
          { "non-clickable": onClick == null },
          // Changes the behavior of ::before and ::after to show info
          { "show-info": card == null && info != null },
          // Controls the box-shadow
          { shadow: !removeShadow },
          // Default behavior: not disabled
          { disabled: disabled ?? false },
          // Set animation class
          { [`${animation}`]: animation != null },
          // classNames set by parent component (from props)
          className
        )}
        // data-card sets the data of ::before and/or ::after
        data-card={card != null ? card.asString : info != null ? info : ""}
        onClick={onClick}
      >
        {card != null && <p>{card.suit}</p>}
      </div>
    </Fragment>
  );
};

export default CardComponent;
