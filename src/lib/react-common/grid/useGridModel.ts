import { Position } from '../../common/geometry/Position'
import { Size } from '../../common/geometry/Size'

export interface GridModel {
  getPosition: (col: number, row: number) => Position,
  getCellSize: () => Size
}

export default function useGridModel(
  width: number, height: number, cols: number, rows: number): GridModel {

  function getPosition(col: number, row: number): Position {
    const x = width / cols * col
    const y = height - height / rows * (row + 1)
    return { x, y }
  }

  function getCellSize(): Size {
    const cellWidth = width / cols
    const cellHeight = height / rows
    return { width: cellWidth, height: cellHeight }
  }

  return {
    getPosition,
    getCellSize
  }
}
