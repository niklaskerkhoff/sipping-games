import { Card, Color } from '../../model/Card'
import { Deck } from '../../model/Deck'
import { range } from '../../lib/common/utils/arrays'


export class HorseRaceGame {
  public readonly progress = HorseRaceGame.getDefaultProgress()
  public readonly sideCards: Card[]
  public sideCardsOpenCount = 0

  constructor(
    private readonly deck: Deck,
    sideCardCount: number
  ) {
    this.sideCards = range(0, sideCardCount).map(() => deck.draw())
  }

  private static getDefaultProgress(): Progress {
    const defaultColorProgress: ColorProgress = {
      actual: 0,
      max: 0
    }

    return {
      D: defaultColorProgress,
      H: defaultColorProgress,
      S: defaultColorProgress,
      C: defaultColorProgress
    }
  }

  nextDeckCard() {
    if (this.deck.isEmpty()) {
      return
    }

    const color = this.deck.draw().color
    this.progress[color] = this.getMovedForward(color)
  }

  nextSideCard() {
    if (!this.shallOpenNextSideCard()) {
      return
    }

    this.sideCardsOpenCount++
    const backColor = this.getLastOpenedSideCardColor()
    this.progress[backColor] = this.getMovedBackward(backColor)
  }

  private getMovedForward(color: Color): ColorProgress {
    const prevColorProgress = this.progress[color]

    const actual = prevColorProgress.actual + 1
    const prevMax = prevColorProgress.max
    const max = Math.max(actual, prevMax)

    return { actual, max }
  }

  private shallOpenNextSideCard() {
    const nextCount = Object.values(this.progress).reduce(
      (acc, current) => Math.min(acc, current.max), Infinity)

    return nextCount > this.sideCardsOpenCount
  }

  private getLastOpenedSideCardColor() {
    return this.sideCards[this.sideCardsOpenCount - 1].color
  }

  private getMovedBackward(color: Color): ColorProgress {
    const prevColorProgress = this.progress[color]
    const actual = prevColorProgress.actual - 1
    const max = prevColorProgress.max
    return { actual, max }
  }
}

interface ColorProgress {
  actual: number,
  max: number
}

type Progress = { [color in Color]: ColorProgress }
