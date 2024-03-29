import React, { CSSProperties } from 'react'
import { GridModel } from './useGridModel'
import { styled } from '@mui/material'
import { ChildrenProps } from '../utils/types'

interface Props extends ChildrenProps {
  gridModel: GridModel,
  col: number,
  row: number,
  zIndex?: number,
  itemsX?: 'start' | 'center' | 'end',
  itemsY?: 'start' | 'center' | 'end'
}

const Wrapper = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
  transition: transform 500ms;
`

export default function GridCell({
                                   gridModel,
                                   col,
                                   row,
                                   zIndex,
                                   children,
                                   itemsX,
                                   itemsY
                                 }: Props) {

  function buildStyle(): CSSProperties {
    const cellSize = gridModel.getCellSize()
    const width = cellSize.width
    const height = cellSize.height

    const position = gridModel.getPosition(col, row)
    const x = position.x
    const y = position.y

    return ({
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(${x}px, ${y}px)`,
      justifyContent: itemsX,
      alignItems: itemsY,
      zIndex
    })
  }

  return (
    <Wrapper style={buildStyle()}>
      {children}
    </Wrapper>
  )
}
