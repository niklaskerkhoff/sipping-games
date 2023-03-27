import React from 'react'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material'
import { ChildrenProps } from '../lib/react-common/utils/types'


const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#005a00',
      light: '#32b400',
      dark: '#004600',
    },
    secondary: {
      main: '#ff8200',
      light: '#90a4ae',
      dark: '#455a64',
    },
    info: {
      main: '#000000',
      light: '#000000',
      dark: '#000000',
    },
    background: {
      default: '#005a00',
      paper: '#2a2a2a'
    },
  },
}

const Theme = ({ children }: ChildrenProps) => {

  const theme = createTheme(themeOptions)

  const bgColor = theme.palette.background.default
  document.querySelector('meta[name=theme-color]')?.setAttribute('content', bgColor)

  const body = document.querySelector('body')
  if (body) {
    body.style.background = bgColor
  }

  const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
  }
  window.addEventListener('resize', appHeight)
  appHeight()

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>

  )
}

export default Theme
