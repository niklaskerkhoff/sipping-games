import React, { createContext, ReactNode, useState } from 'react'
import Home from '../modules/home/Home'
import HorseRace from '../modules/horse-race/HorseRace'
import useCallOnce from '../lib/react-common/hooks/useCallOnce'
import { get52Cards } from '../model/Card'
import Camera from '../modules/camera/Camera'
import { Navigation, PageName } from './Navigation'
import { Paper } from '@mui/material'


export const BackgroundImageDataContext =
  createContext<string | undefined>(undefined)


export default function App() {
  const [backgroundImageData, setBackgroundImageData] = useState<string>()

  const pages: { [key in PageName]: ReactNode } = {
    'camera': <Camera setBackgroundImageData={setBackgroundImageData} />,
    'home': <Home />,
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
    <BackgroundImageDataContext.Provider value={backgroundImageData}>
      <Paper elevation={0}>
        <Navigation startPage='home' pages={pages} />
      </Paper>
    </BackgroundImageDataContext.Provider>
  )
}

