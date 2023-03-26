import { useRef, useState } from 'react'
import { HorseRaceGame } from './HorseRaceGame'
import { Deck } from '../../model/Deck'
import { Card } from '../../model/Card'

export default function useHorseRaceGame(sideCardCount: number) {
  const game = useRef(new HorseRaceGame(new Deck(), sideCardCount)).current

  const [progress, setProgress] = useState(game.progress)
  const [sideCardsOpenCount, setSideCardsOpenCount] = useState(game.sideCardsOpenCount)
  const [finished, setFinished] = useState(Card.mapColorsToDefault(false))


  function next() {
    game.nextDeckCard()
    setProgress({ ...game.progress })

    setTimeout(() => {
      setFinished(game.getFinished())
    }, 300)

    setTimeout(() => {
      game.nextSideCard()
      if (game.sideCardsOpenCount !== sideCardsOpenCount) {
        setSideCardsOpenCount(game.sideCardsOpenCount)

        setTimeout(() => {
          setProgress({ ...game.progress })
        }, 700)
      }
    }, 700)
  }

  function isSideCardCovered(index: number) {
    return !(index < sideCardsOpenCount)
  }

  return {
    sideCards: game.sideCards,
    progress,
    sideCardsOpenCount,
    finished,
    next,
    isSideCardCovered
  }
}
