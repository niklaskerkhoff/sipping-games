import React, { ReactNode, useState } from 'react'
import Home from './modules/home/Home'
import HorseRace from './modules/horse-race/HorseRace'
import PageView from './components/PageView'

export type Page = 'home' | 'horse-race' | 'bus-driver' | 'fuck-the-dealer'

export default function App() {

  const [currentGame, setCurrentGame] = useState<Page>('horse-race')

  const pages: { [key in Page]: ReactNode } = {
    'home': <Home navigate={setCurrentGame} />,
    'horse-race': <HorseRace />,
    'bus-driver': <></>,
    'fuck-the-dealer': <></>
  }

  return (
    <PageView>
      {pages[currentGame]}
    </PageView>
  )
}

