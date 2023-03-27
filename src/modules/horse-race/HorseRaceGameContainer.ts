import { HorseRaceGame } from './HorseRaceGame'
import { isNotPresent } from '../../lib/common/utils/types'
import { Deck } from '../../model/Deck'

export class HorseRaceGameContainer {
  private static horseRaceGame: HorseRaceGame | undefined = undefined

  static get(): HorseRaceGame {
    if (isNotPresent(this.horseRaceGame)) {
      this.horseRaceGame = new HorseRaceGame(new Deck(), 7)
    }
    return this.horseRaceGame
  }
}
