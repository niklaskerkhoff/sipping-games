import { useRef, useState } from 'react'
import { HorseRaceGame } from './HorseRaceGame'
import { Deck } from '../../model/Deck'
import { Card } from '../../model/Card'

export default function useHorseRaceGame(sideCardCount: number) {
  const game = useRef(new HorseRaceGame(new Deck(), sideCardCount)).current

  const [progress, setProgress] = useState(game.progress)
  const [forwardCardsOpenedCount, setForwardCardsOpenedCount] = useState(game.forwardCardsOpenedCount)
  const [sideCardsOpenedCount, setSideCardsOpenedCount] = useState(game.sideCardsOpenedCount)
  const [finished, setFinished] = useState(Card.mapColorsToDefault(false))


  function next() {
    game.nextDeckCard()
    setForwardCardsOpenedCount(game.forwardCardsOpenedCount)

    setTimeout(() => {
      setProgress({ ...game.progress })
      handleFinished()
      handleNextSideCard()
    }, 700)
  }

  function handleFinished() {
    setTimeout(() => {
      setFinished(game.getFinished())
    }, 300)
  }

  function handleNextSideCard() {
    setTimeout(() => {
      game.nextSideCard()
      if (game.sideCardsOpenedCount !== sideCardsOpenedCount) {
        setSideCardsOpenedCount(game.sideCardsOpenedCount)

        setTimeout(() => {
          setProgress({ ...game.progress })
        }, 700)
      }
    }, 700)
  }

  function isSideCardCovered(index: number) {
    return !(index < sideCardsOpenedCount)
  }

  return {
    sideCards: game.sideCards,
    forwardCards: game.forwardCards,
    forwardCardsOpenedCount: forwardCardsOpenedCount,
    progress,
    sideCardsOpenCount: sideCardsOpenedCount,
    finished,
    next,
    isSideCardCovered
  }
}
