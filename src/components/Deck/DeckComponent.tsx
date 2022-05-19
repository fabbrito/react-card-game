import React, { Fragment } from "react";
import classNames from "classnames/bind";
import CardComponent from "./CardComponent";
import deckStyles from "./Deck.module.scss";

interface Props {
  player?: "player" | "opponent";
  deckSize?: number;
  animation?: "rotation" | "take-one";
}

const DeckComponent: React.FC<Props> = ({ player = "player", deckSize = 4, animation }) => {
  const styles = classNames.bind(deckStyles);
  const cardsToRender = deckSize >= 4 ? 4 : deckSize;
  const info: string = deckSize?.toString() ?? "";

  return (
    <Fragment>
      <div className={styles("deck", { "show-info": deckSize != null })} data-info={info}>
        {[...Array(cardsToRender).keys()].map((number) => {
          const cardId = `${player}-deck-${cardsToRender - 1 - number}-card`;
          return (
            <CardComponent
              key={cardId}
              id={cardId}
              faceDown
              player={player}
              animation={animation}
              onClick={() => console.log(player, deckSize)}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default DeckComponent;
