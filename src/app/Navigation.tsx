import React, { createContext, ReactNode, useContext, useState } from 'react'
import MainWrapper from '../components/MainWrapper'


export type PageName =
  'camera'
  | 'home'
  | 'horse-race'
  | 'bus-driver'
  | 'fuck-the-dealer'


type Navigator = {
  current: PageName,
  navigate: (pageName: PageName) => void
}

const startPage: PageName = 'home'

const NavigatorContext = createContext<Navigator>({
  current: startPage,
  navigate: () => null
})


interface Props {
  startPage: PageName,
  pages: { [pageName in PageName]: ReactNode }
}

export function Navigation({ pages }: Props) {
  const [current, setCurrent] = useState<PageName>(startPage)


  function navigate(pageName: PageName) {
    setCurrent(pageName)
  }

  return (
    <NavigatorContext.Provider value={{ current, navigate }}>
      <MainWrapper>
        {pages[current]}
      </MainWrapper>
    </NavigatorContext.Provider>
  )
}

export default function useNavigation(): Navigator {
  return useContext(NavigatorContext)
}
