import { Card, Color } from '../../model/Card'
import { Deck } from '../../model/Deck'
import { range } from '../../lib/common/utils/arrays'
import { isPresent } from '../../lib/common/utils/types'


export class HorseRaceGame {
  public readonly progress = HorseRaceGame.getDefaultProgress()
  public readonly sideCards: Card[]
  public sideCardsOpenedCount = 0
  public readonly forwardCards: Card[]

  constructor(
    private readonly deck: Deck,
    sideCardCount: number
  ) {
    Card.getColors().forEach(color => deck.remove(new Card('A', color)))
    this.sideCards = range(0, sideCardCount).map(() => deck.draw())
    this.forwardCards = deck.cards
  }

  private _forwardCardsOpenedCount = 0

  get forwardCardsOpenedCount(): number {
    return this._forwardCardsOpenedCount
  }

  private static getDefaultProgress(): Progress {
    const defaultColorProgress: ColorProgress = {
      actual: 0,
      max: 0,
      finished: false
    }

    return Card.mapColorsToDefault(defaultColorProgress)
  }

  nextDeckCard() {
    if (this.deck.isEmpty()) {
      return
    }

    const color = this.deck.draw().color
    this._forwardCardsOpenedCount++
    this.progress[color] = this.getMovedForward(color)
  }

  nextSideCard() {
    if (!this.shallOpenNextSideCard()) {
      return
    }

    this.sideCardsOpenedCount++
    const backColor = this.getLastOpenedSideCardColor()
    if (isPresent(backColor)) {
      this.progress[backColor] = this.getMovedBackward(backColor)
    }
  }

  getFinished() {
    return Card.mapColors(color => this.progress[color].finished)
  }

  private getMovedForward(color: Color): ColorProgress {
    const prevColorProgress = this.progress[color]

    if (prevColorProgress.finished) {
      return prevColorProgress
    }

    const actual = prevColorProgress.actual + 1
    const prevMax = prevColorProgress.max
    const max = Math.max(actual, prevMax)
    const finished = actual >= this.sideCards.length + 1

    return { actual, max, finished }
  }

  private shallOpenNextSideCard() {
    const nextCount = Object.values(this.progress).reduce(
      (acc, current) => Math.min(acc, current.max), Infinity)

    return nextCount > this.sideCardsOpenedCount
  }

  private getLastOpenedSideCardColor() {
    const index = this.sideCardsOpenedCount - 1
    if (index >= this.sideCards.length) {
      return undefined
    }
    return this.sideCards[index].color
  }

  private getMovedBackward(color: Color): ColorProgress {
    const prevColorProgress = this.progress[color]

    if (prevColorProgress.finished) {
      return prevColorProgress
    }

    const actual = prevColorProgress.actual - 1
    return { ...prevColorProgress, actual }
  }
}

interface ColorProgress {
  actual: number,
  max: number,
  finished: boolean
}

type Progress = { [color in Color]: ColorProgress }
