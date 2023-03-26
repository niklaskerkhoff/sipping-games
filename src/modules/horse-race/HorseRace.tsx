import React, { useContext } from 'react'
import CardView from '../../components/CardView'
import { GameContentSizeContext } from '../../components/PageView'
import { Card } from '../../model/Card'
import GridArea from '../../lib/react-common/grid/GridArea'
import GridCell from '../../lib/react-common/grid/GridCell'
import useHorseRaceGame from './useHorseRaceGame'
import useGridModel from '../../lib/react-common/grid/useGridModel'

interface Props {
}


export default function HorseRace({}: Props) {

  const sideCardNumber = 7
  const rows = sideCardNumber + 2
  const cols = 5
  const size = useContext(GameContentSizeContext)

  const gridModel = useGridModel(size.width, size.height, cols, rows)

  const cardHeight = size.height / (sideCardNumber + 2) - 8

  const {
    sideCards,
    next,
    progress,
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

  return (
    <div onClick={next}>
      <GridArea width={size.width} height={size.height}>
        {Card.getColors().map((color, index) => (

          <GridCell key={index} gridModel={gridModel}
                    col={index}
                    row={progress[color].actual}>
            <CardView card={new Card('A', color)} height={cardHeight} />
          </GridCell>
        ))}

        {getSideCards()}
      </GridArea>
    </div>
  )
}
