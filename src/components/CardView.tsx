import React from 'react'
import { Card } from '../model/Card'
import { styled } from '@mui/material'
import { isNotPresent } from '../lib/common/utils/types'
import classNames from 'classnames'

type Orientation = 0 | 90 | 180 | 270

interface Props {
  card: Card,
  width?: number,
  height?: number,
  orientation?: Orientation,
  covered?: boolean
}

const Wrapper = styled('div')`
  perspective: 1000px;

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    border-radius: 8px;
  }

  &.covered .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .flip-card-front {
  }

  .flip-card-back {
    transform: rotateY(180deg);
  }
`


const CardContainer = styled('div')`
`

export default function CardView({
                                   card,
                                   width,
                                   height,
                                   orientation,
                                   covered
                                 }: Props) {
  if (isNotPresent(orientation)) {
    orientation = 0
  }

  if (isNotPresent(width)) {
    if (isNotPresent(height)) {
      height = 0
    }
    width = height * 240 / 336
  }

  if (isNotPresent(height)) {
    if (isNotPresent(width)) {
      width = 0
    }
    height = width * 336 / 240
  }

  const classes = classNames({
    covered
  })

  return (
    <Wrapper className={classes}
             style={{ width: `${width}px`, height: `${height}px` }}>
      <div className='flip-card-inner'>
        <div className='flip-card-front'>
          <img src={`/res/cards/${card.rank}${card.color}.svg`} alt='' />
        </div>
        <div className='flip-card-back'>
          <img src='/res/cards/back.png' alt='' />
        </div>
      </div>
    </Wrapper>
  )
}
