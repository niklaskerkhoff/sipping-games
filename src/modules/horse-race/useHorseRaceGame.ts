import { useRef, useState } from 'react'
import { Card } from '../../model/Card'
import useCallOnce from '../../lib/react-common/hooks/useCallOnce'
import { HorseRaceGameContainer } from './HorseRaceGameContainer'

export default function useHorseRaceGame(sideCardCount: number) {
  const game = useRef(HorseRaceGameContainer.get()).current
  console.log(game.random)

  const [progress, setProgress] = useState(game.progress)
  const [forwardCardsOpenedCount, setForwardCardsOpenedCount] = useState(game.forwardCardsOpenedCount)
  const [sideCardsOpenedCount, setSideCardsOpenedCount] = useState(game.sideCardsOpenedCount)
  const [finished, setFinished] = useState(Card.mapColorsToDefault(false))
  const canDoNext = useRef(true)

  useCallOnce(() => {
    // console.log(game.forwardCards)
  })

  function next() {
    if (!canDoNext.current) {
      return
    }
    canDoNext.current = false
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
          canDoNext.current = true
        }, 700)
      } else {
        canDoNext.current = true
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
