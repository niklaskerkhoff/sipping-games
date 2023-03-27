import React, { createContext, useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { Size } from '../lib/common/geometry/Size'
import { ChildrenProps } from '../lib/react-common/utils/types'


const defaultGameContentDimension: Size = {
  width: 0,
  height: 0
}

export const GameContentSizeContext = createContext<Size>(defaultGameContentDimension)

// noinspection CssReplaceWithShorthandSafely
const Main = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  & > div {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
`

export default function MainWrapper({ children }: ChildrenProps) {

  const [gameContentSize, setGameContentSize] = useState<Size>(defaultGameContentDimension)

  useEffect(() => {

    const width = window.innerWidth - 32
    const height = window.innerHeight - 32
    setGameContentSize({ width, height })
  }, [])


  return (
    <GameContentSizeContext.Provider value={gameContentSize}>
      <Main style={{
        width: `${gameContentSize.width + 32}px`,
        height: `${gameContentSize.height + 32}px`
      }}>
        <div>
          {children}
        </div>
      </Main>
    </GameContentSizeContext.Provider>
  )
}
