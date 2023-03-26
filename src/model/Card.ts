export class Card {

  constructor(
    public readonly rank: Rank,
    public readonly color: Color
  ) {
  }

  static getRanks(): Rank[] {
    return [
      '2', '3', '4', '5', '6', '7', '8', '9', '10',
      'J', 'Q', 'K', 'A'
    ]
  }

  static getColors(): Color[] {
    return [
      'D', 'H', 'S', 'C'
    ]
  }

  equals(other: Card) {
    return this.rank === other.rank && this.color === other.color
  }

  getId() {
    return this.rank + this.color
  }
}

export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' |
  'J' | 'Q' | 'K' | 'A'

export type Color = 'D' | 'H' | 'S' | 'C'

export function get52Cards() {
  const cards: Card[] = []

  for (const rank of Card.getRanks()) {
    for (const color of Card.getColors()) {
      cards.push(new Card(rank, color))
    }
  }

  return cards
}
