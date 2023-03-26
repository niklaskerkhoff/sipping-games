import React, { createContext, useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { Size } from '../lib/common/geometry/Size'
import { ChildrenProps } from '../lib/react-common/utils/types'


const defaultGameContentDimension: Size = {
  width: 0,
  height: 0
}

export const GameContentSizeContext = createContext<Size>(defaultGameContentDimension)

const Main = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3a3a3a;
`

export default function PageView({ children }: ChildrenProps) {

  const [gameContentSize, setGameContentSize] = useState<Size>(defaultGameContentDimension)

  useEffect(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    setGameContentSize({ width, height })
  }, [])


  return (
    <GameContentSizeContext.Provider value={gameContentSize}>
      <Main>
        <div style={{
          width: `${gameContentSize.width}px`,
          height: `${gameContentSize.height}px`,
          position: 'relative',
          background: 'green'
        }}>
          {children}
        </div>
      </Main>
    </GameContentSizeContext.Provider>
  )
}
