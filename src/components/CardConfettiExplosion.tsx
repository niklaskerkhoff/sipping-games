import React, { useRef } from 'react'
import ConfettiExplosion from 'react-confetti-explosion'
import { styled } from '@mui/material'

interface Props {

}

const ConfettiExplosionWrapper = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
`

export default function CardConfettiExplosion({}: Props) {
  const exploded = useRef(false)
  const duration = 2200

  if (exploded.current) {
    return <></>
  }

  setTimeout(() => {
    exploded.current = true
  }, duration)

  return (
    <ConfettiExplosionWrapper>
      <ConfettiExplosion duration={duration}
                         colors={['#fca103', '#00cf60', '#0096ff']} />
    </ConfettiExplosionWrapper>
  )
}
