import { Card, get52Cards } from './Card'
import { randomInt } from '../lib/common/utils/random'

export class Deck {
  constructor() {
    this._cards = this.get52ShuffledCards()
  }

  private _cards: Card[]

  get cards(): Card[] {
    return [...this._cards]
  }

  public draw() {
    const card = this._cards[0]
    this._cards = this._cards.slice(1)
    return card
  }

  public remove(card: Card) {
    this._cards = this._cards.filter(c => !c.equals(card))
  }

  public isEmpty() {
    return this._cards.length === 0
  }

  private get52ShuffledCards() {
    let sortedCards = get52Cards()
    const shuffledCards: Card[] = []

    const deckSize = sortedCards.length

    for (let i = 0; i < deckSize; i++) {
      const randomIndex = randomInt(sortedCards.length)
      shuffledCards.push(sortedCards[randomIndex])
      sortedCards = sortedCards.filter(
        (_, index) => index !== randomIndex)
    }

    return shuffledCards
  }
}
