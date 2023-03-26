import React, { useContext } from 'react'
import CardView from '../../components/CardView'
import { GameContentSizeContext } from '../../components/PageView'
import { Card } from '../../model/Card'
import GridArea from '../../lib/react-common/grid/GridArea'
import GridCell from '../../lib/react-common/grid/GridCell'
import useHorseRaceGame from './useHorseRaceGame'
import useGridModel from '../../lib/react-common/grid/useGridModel'
import CardConfettiExplosion from '../../components/CardConfettiExplosion'

interface Props {
}


export default function HorseRace({}: Props) {

  const sideCardCount = 7
  const rows = sideCardCount + 2
  const cols = 5
  const size = useContext(GameContentSizeContext)

  const gridModel = useGridModel(size.width, size.height, cols, rows)
  const cardHeight = size.height / (sideCardCount + 2) - 8

  const {
    sideCards,
    next,
    progress,
    finished,
    isSideCardCovered
  } = useHorseRaceGame(sideCardCount)


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

  return (
    <div onClick={next}>

      <GridArea width={size.width} height={size.height}>
        {Card.getColors().map((color, index) => (

          <GridCell key={index} gridModel={gridModel}
                    col={index}
                    row={progress[color].actual}>
            <CardView card={new Card('A', color)} height={cardHeight} />
            {finished[color] && <CardConfettiExplosion />}
          </GridCell>
        ))}

        {getSideCards()}
      </GridArea>
    </div>
  )
}

