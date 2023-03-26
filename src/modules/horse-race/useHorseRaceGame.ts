import { useRef, useState } from 'react'
import { HorseRaceGame } from './HorseRaceGame'
import { Deck } from '../../model/Deck'

export default function useHorseRaceGame() {
  const game = useRef(new HorseRaceGame(new Deck(), 7)).current

  const [progress, setProgress] = useState(game.progress)
  const [sideCardsOpenCount, setSideCardsOpenCount] = useState(game.sideCardsOpenCount)


  function next() {
    game.nextDeckCard()
    setProgress({ ...game.progress })

    setTimeout(() => {
      game.nextSideCard()
      if (game.sideCardsOpenCount !== sideCardsOpenCount) {
        setSideCardsOpenCount(game.sideCardsOpenCount)
        setProgress({ ...game.progress })
      }
    }, 1000)
  }

  function isSideCardCovered(index: number) {
    return !(index < sideCardsOpenCount)
  }

  return {
    sideCards: game.sideCards,
    progress,
    sideCardsOpenCount,
    next,
    isSideCardCovered
  }
}
