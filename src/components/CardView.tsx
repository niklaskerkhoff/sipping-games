import React, { CSSProperties, useContext } from 'react'
import { Card } from '../model/Card'
import { styled } from '@mui/material'
import { isNotPresent } from '../lib/common/utils/types'
import classNames from 'classnames'
import { BackgroundImageDataContext } from '../App'

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
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 500ms;
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

    div.background-image {
      position: absolute;
      top: 4px;
      left: 4px;
      width: calc(100% - 8px);
      height: calc(100% - 8px);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 4px;
    }
  }
`

export default function CardView({
                                   card,
                                   width,
                                   height,
                                   orientation,
                                   covered
                                 }: Props) {

  const backgroundImageData = useContext(BackgroundImageDataContext)

  const backgroundImageStyle: CSSProperties = {
    backgroundImage: `url(${backgroundImageData})`
  }

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
          <img src={`/res/cards/${card.getId()}.svg`} alt='' />
        </div>
        <div className='flip-card-back'>
          <img src='/res/cards/back.png' alt='' />

          <div className='background-image camera'
               style={backgroundImageStyle} />
        </div>
      </div>
    </Wrapper>
  )
}
