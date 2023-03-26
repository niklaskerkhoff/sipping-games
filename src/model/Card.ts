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

  static mapColorsToDefault<T>(defaultValue: T) {
    return Card.mapColors(() => defaultValue)
  }

  static mapColors<T>(mapper: (color: Color) => T) {
    return {
      'D': mapper('D'),
      'H': mapper('H'),
      'S': mapper('S'),
      'C': mapper('C'),
    }
  }


  equals(other: Card) {
    return this.rank === other.rank && this.color === other.color
  }

  getId(): string {
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
