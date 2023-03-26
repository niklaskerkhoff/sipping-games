import { Card, get52Cards } from './Card'
import { randomInt } from '../lib/common/utils/random'

export class Deck {

  private cards: Card[]

  constructor() {
    this.cards = this.get52ShuffledCards()
  }

  public draw() {
    const card = this.cards[0]
    this.cards = this.cards.slice(1)
    return card
  }

  public remove(card: Card) {
    this.cards = this.cards.filter(c => !c.equals(card))
  }

  public isEmpty() {
    return this.cards.length === 0
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
