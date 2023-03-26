import React from 'react'
import { styled } from '@mui/material'
import { ChildrenProps } from '../utils/types'


interface Props extends ChildrenProps {
  width: number,
  height: number
}


const Wrapper = styled('div')`
`

export default function GridArea({ width, height, children }: Props) {

  return (
    <Wrapper style={{ width: `${width}px`, height: `${height}px` }}>
      {children}
    </Wrapper>
  )
}
