import React, { useContext } from 'react'
import CardView from '../../components/CardView'
import { Card } from '../../model/Card'
import GridCell from '../../lib/react-common/grid/GridCell'
import useHorseRaceGame from './useHorseRaceGame'
import useGridModel from '../../lib/react-common/grid/useGridModel'
import CardConfettiExplosion from '../../components/CardConfettiExplosion'
import { GameContentSizeContext } from '../../components/MainWrapper'
import { Page } from '../../components/Page'
import GridArea from '../../lib/react-common/grid/GridArea'

interface Props {
}


export default function HorseRace({}: Props) {

  const sideCardCount = 7
  const rows = sideCardCount + 2
  const cols = 6
  const size = useContext(GameContentSizeContext)

  const gridModel = useGridModel(size.width, size.height, cols, rows)
  const cardHeight = size.height / (sideCardCount + 2) - 8

  const {
    sideCards,
    forwardCards,
    forwardCardsOpenedCount,
    next,
    progress,
    finished,
    isSideCardCovered
  } = useHorseRaceGame()


  function getSideCards() {
    return sideCards.map((sideCard, index) => {

      return (
        <GridCell key={index}
                  gridModel={gridModel}
                  col={cols - 1}
                  row={index + 1}>
          <CardView card={sideCard} height={cardHeight}
                    covered={isSideCardCovered(index)} />
        </GridCell>
      )
    })
  }

  function getForwardCards() {

    function isOpen(index: number) {
      return forwardCards.length - index <= forwardCardsOpenedCount
    }

    function getRow(index: number) {
      return isOpen(index) ? rows / 2 : (rows - 2) / 2
    }

    function getZIndex(index: number) {
      return isOpen(index) ? forwardCards.length - index : 0
    }

    return forwardCards.map((card, index) => (
      <GridCell key={index} gridModel={gridModel}
                col={0}
                row={getRow(index)}
                zIndex={getZIndex(index)}>
        <CardView card={card} height={cardHeight} covered={!isOpen(index)} />
      </GridCell>
    ))
  }

  return (
    <Page style={{ background: 'var(--primary)' }} onClick={next}>
      <GridArea width={size.width} height={size.height}>
        {Card.getColors().map((color, index) => (

          <GridCell key={index} gridModel={gridModel}
                    col={index + 1}
                    row={progress[color].actual}>
            <CardView card={new Card('A', color)} height={cardHeight} />
            {finished[color] && <CardConfettiExplosion />}
          </GridCell>
        ))}

        {getSideCards()}
        {getForwardCards()}
      </GridArea>
    </Page>
  )
}

