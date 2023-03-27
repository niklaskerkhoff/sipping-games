import React, { createContext, ReactNode, useState } from 'react'
import Home from './modules/home/Home'
import HorseRace from './modules/horse-race/HorseRace'
import MainWrapper from './components/MainWrapper'
import useCallOnce from './lib/react-common/hooks/useCallOnce'
import { get52Cards } from './model/Card'
import Camera from './modules/camera/Camera'

export type PageName =
  'camera'
  | 'home'
  | 'horse-race'
  | 'bus-driver'
  | 'fuck-the-dealer'

const defaultBackgroundImage = '/res/background.jpg'

export const BackgroundImageDataContext = createContext<string>(defaultBackgroundImage)

export const NavigatorContext =
  createContext<(pageName: PageName) => void>(() => null)

export default function App() {

  const [currentPage, setCurrentPage] = useState<PageName>('camera')
  const [backgroundImageData, setBackgroundImageData] = useState<string>(defaultBackgroundImage)

  const pageNames: { [key in PageName]: ReactNode } = {
    'camera': <Camera setBackgroundImageData={setBackgroundImageData} />,
    'home': <Home navigate={setCurrentPage} />,
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

  function navigate(pageName: PageName) {
    setCurrentPage(pageName)
  }

  return (
    <BackgroundImageDataContext.Provider value={backgroundImageData}>
      <NavigatorContext.Provider value={navigate}>
        <MainWrapper>
          {pageNames[currentPage]}
        </MainWrapper>
      </NavigatorContext.Provider>
    </BackgroundImageDataContext.Provider>
  )
}

