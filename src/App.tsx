import React, { ReactNode, useState } from 'react'
import Home from './modules/home/Home'
import HorseRace from './modules/horse-race/HorseRace'
import MainWrapper from './components/MainWrapper'
import useCallOnce from './lib/react-common/hooks/useCallOnce'
import { get52Cards } from './model/Card'

export type PageName = 'home' | 'horse-race' | 'bus-driver' | 'fuck-the-dealer'

export default function App() {

  const [currentGame, setCurrentGame] = useState<PageName>('horse-race')

  const pageNames: { [key in PageName]: ReactNode } = {
    'home': <Home navigate={setCurrentGame} />,
    'horse-race': <HorseRace />,
    'bus-driver': <></>,
    'fuck-the-dealer': <></>
  }

  useCallOnce(() => {
    get52Cards().forEach((card) => {
      const img = new Image()
      img.src = `/res/cards/${card.getId()}.svg`
    })
  })

  return (
    <MainWrapper>
      {pageNames[currentGame]}
    </MainWrapper>
  )
}

