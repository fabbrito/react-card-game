export const SUITS = ["♠", "♣", "♥", "♦"];
export const VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
export const CARD_VALUE_MAP: { [id: string]: number } = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

export class Card {
  suit: string;
  value: string;

  constructor(suit: string, value: string) {
    this.suit = suit;
    this.value = value;
  }

  get cardColor() {
    return (this.suit === "♥" || this.suit === "♦" ? "red" : "black") as string;
  }

  get asString() {
    return `${this.suit}${this.value}`;
  }
}

export default class Deck {
  cards: Card[];
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }

  get getCards() {
    return [...this.cards];
  }

  get size() {
    return this.cards.length;
  }

  get middlePoint() {
    return Math.ceil(this.size / 2);
  }

  get compactNotation() {
    return [...this.cards].map((card) => {
      return `${card.suit}${card.value}`;
    });
  }

  pop() {
    return this.cards.shift() as Card;
  }

  push(card: Card) {
    this.cards.push(card);
  }

  filter(allowedValues: string[] = VALUES, allowedSuits: string[] = SUITS) {
    this.cards = this.cards
      .filter((card) => allowedSuits.includes(card.suit))
      .filter((card) => allowedValues.includes(card.value));
  }

  shuffle(repeat = 5) {
    for (let r = 0; r < repeat; r++) {
      for (let i = this.size - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tempValue = this.cards[j];
        this.cards[j] = this.cards[i];
        this.cards[i] = tempValue;
      }
    }
  }
}

const freshDeck = (): Card[] => {
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return new Card(suit, value);
    });
  });
};
