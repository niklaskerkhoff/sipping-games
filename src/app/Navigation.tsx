import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState
} from 'react'
import MainWrapper from '../components/MainWrapper'
import { isPresent } from '../lib/common/utils/types'


export type PageName =
  'camera'
  | 'home'
  | 'horse-race'
  | 'bus-driver'
  | 'fuck-the-dealer'


type Navigator = {
  current: PageName,
  navigate: (pageName: PageName) => void,
  navigateBack: () => void
}

const startPage: PageName = 'home'

const NavigatorContext = createContext<Navigator>({
  current: startPage,
  navigate: () => null,
  navigateBack: () => null
})


interface Props {
  startPage: PageName,
  pages: { [pageName in PageName]: ReactNode }
}

export function Navigation({ pages }: Props) {
  const [current, setCurrent] = useState<PageName>(startPage)
  const history = useRef<PageName[]>([startPage])

  function navigate(pageName: PageName) {
    history.current.push(pageName)
    setCurrent(pageName)
  }

  function navigateBack() {
    const self = history.current.pop()
    if (!isPresent(self)) {
      return
    }
    const next = history.current.pop()
    if (isPresent(next)) {
      navigate(next)
    }
  }

  return (
    <NavigatorContext.Provider value={{ current, navigate, navigateBack }}>
      <MainWrapper>
        {pages[current]}
      </MainWrapper>
    </NavigatorContext.Provider>
  )
}

export default function useNavigation(): Navigator {
  return useContext(NavigatorContext)
}
